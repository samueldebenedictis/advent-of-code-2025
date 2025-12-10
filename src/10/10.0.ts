import * as fs from 'node:fs';

const file = fs.readFileSync('src/10/input.txt', 'utf8');
const lines = file.split('\n');

type Button = number[];

type Machine = {
    target: boolean[];
    buttons: Button[];
    solve: number;
};

const machines: Machine[] = [];

for (const l of lines) {
    const sections = l.split(' ');
    const target = (sections[0] as string)
        .replace('[', '')
        .replace(']', '')
        .split('')
        .map((el) => el === '#');
    const buttons = sections.slice(1, -1).map((el) =>
        el
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map((x) => parseInt(x, 10)),
    );
    machines.push({ target, buttons, solve: -1 });
}

function arraysEqual(a: boolean[], b: boolean[]) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function solve(machine: Machine): number {
    const { target, buttons } = machine;
    const initialState = target.map(() => false);

    const queue: { state: boolean[]; presses: number }[] = [
        { state: initialState, presses: 0 },
    ];
    const visited = new Set<string>([JSON.stringify(initialState)]);

    while (queue.length > 0) {
        const { state, presses } = queue.shift() as {
            state: boolean[];
            presses: number;
        };

        if (arraysEqual(state, target)) {
            return presses;
        }

        for (const button of buttons) {
            const newState = [...state];
            for (const light of button) {
                newState[light] = !newState[light];
            }

            const newStateString = JSON.stringify(newState);
            if (!visited.has(newStateString)) {
                visited.add(newStateString);
                queue.push({ state: newState, presses: presses + 1 });
            }
        }
    }

    return -1;
}

let totalPresses = 0;
for (const m of machines) {
    m.solve = solve(m);
    totalPresses += m.solve;
}

console.log(totalPresses);
