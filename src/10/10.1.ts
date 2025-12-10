import * as fs from 'node:fs';
import { init } from 'z3-solver';

type Machine = {
    indicators: boolean[];
    buttons: number[][];
    joltage: number[];
};

const data = fs.readFileSync('./src/10/input.txt', 'utf8');
const cleanData: Machine[] = data
    .trim()
    .split(/\n/g)
    .map((row) => {
        const wires = row.split(/\s/g);
        const indicatorStr = wires.shift();
        if (!indicatorStr) throw new Error('Invalid input');
        const indicators = indicatorStr
            .replaceAll(/[[\]]/g, '')
            .split('')
            .map((i) => i === '#');
        const joltageStr = wires.pop();
        if (!joltageStr) throw new Error('Invalid input');
        const joltage = joltageStr
            .replaceAll(/[{}]/g, '')
            .split(/,/g)
            .map(Number);
        const buttonsStr = wires.map((btn) =>
            btn
                .replaceAll(/[()]/g, '')
                .split(/,/g)
                .map(Number)
                .sort((a, b) => a - b),
        );

        const buttons: number[][] = [];
        for (const b of buttonsStr) {
            const sb: number[] = [];
            for (let i = 0; i < joltage.length; i++) {
                sb.push(b.includes(i) ? 1 : 0);
            }
            buttons.push(sb);
        }

        return {
            indicators,
            buttons,
            joltage,
        };
    });

const counts: number[] = [];
const alphabet = 'qwertyuiopasdfghjklzxcvbnm';

const { Context } = await init();

for (const [_i, mac] of cleanData.entries()) {
    // biome-ignore lint: any
    const { Optimize, Int } = new (Context as any)('main');
    // biome-ignore lint: any
    const vars: any[] = [];
    const solver = new Optimize();

    for (let ind = 0; ind < mac.buttons.length; ind++) {
        const v = Int.const(`${alphabet[ind]}`);
        solver.add(v.ge(0));
        vars.push(v);
    }

    for (let x = 0; x < mac.joltage.length; x++) {
        let condition = Int.val(0);
        for (const [y, btn] of mac.buttons.entries()) {
            if (btn[x] === 1) {
                condition = condition.add(vars[y]);
            }
        }
        condition = condition.eq(Int.val(mac.joltage[x]));
        solver.add(condition);
    }

    const sumVars = vars.reduce((a, v) => a.add(v), Int.val(0));
    solver.minimize(sumVars);

    const result = await solver.check();
    if (result === 'sat') {
        counts.push(+solver.model().eval(sumVars).toString());
    }
}

console.log(counts.reduce((a, c) => a + c, 0));
