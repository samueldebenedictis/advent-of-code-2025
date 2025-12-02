import * as fs from 'node:fs';

let sum = 0;
const file = fs.readFileSync('src/2/input.txt', 'utf8');
const ranges: number[][] = file
    .split(',')
    .map((el) => el.split('-').map((x) => parseInt(x, 10)));

for (const [first, last] of ranges) {
    for (let i = first as number; i <= (last as number); i++) {
        const len = `${i}`.length;
        const part1 = `${i}`.slice(0, len / 2);
        const part2 = `${i}`.slice(-(len / 2));
        if (len % 2 === 0 && part1 === part2) {
            sum += i;
        }
    }
}

console.log(sum);
