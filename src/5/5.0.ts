import * as fs from 'node:fs';

const file = fs.readFileSync('src/5/input.txt', 'utf8');
const [rangesString, availablesString] = file.split('\n\n');
const ranges = rangesString
    ?.split('\n')
    .map((el) => el.split('-').map((x) => parseInt(x, 10)));
const availables = availablesString?.split('\n').map((x) => parseInt(x, 10));

let fresh = 0;

for (const available of availables as number[]) {
    for (const [min, max] of ranges as number[][]) {
        if (available >= (min as number) && available <= (max as number)) {
            fresh++;
            break;
        }
    }
}

console.log(fresh);
