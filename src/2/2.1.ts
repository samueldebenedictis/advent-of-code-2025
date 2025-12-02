import * as fs from 'node:fs';

const file = fs.readFileSync('src/2/input.txt', 'utf8');
const ranges: number[][] = file
    .split(',')
    .map((el) => el.split('-').map((x) => parseInt(x, 10)));

const valids: number[] = [];

for (const [first, last] of ranges) {
    for (let i = first as number; i <= (last as number); i++) {
        const len = `${i}`.length;
        for (let j = 1; j <= len / 2; j++) {
            const part = `${i}`.slice(0, j);
            const reps = len / j;
            const temp = part.repeat(reps);
            if (`${i}` === temp && !valids.includes(i)) {
                valids.push(i);
            }
        }
    }
}

const sum = valids.reduce((pV, cV) => pV + cV);
console.log(sum);
