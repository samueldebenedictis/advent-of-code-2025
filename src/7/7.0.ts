import * as fs from 'node:fs';

const file = fs.readFileSync('src/7/input.txt', 'utf8');

const lines = file.split('\n');
const chars = lines.map((el) => el.split(''));

let split = 0;

for (let i = 1; i < lines.length; i++) {
    for (let j = 0; j < (lines[i] as string).length; j++) {
        if (
            (chars[i - 1] as string[])[j] === 'S' ||
            (chars[i - 1] as string[])[j] === '|'
        ) {
            if ((chars[i] as string[])[j] === '^') {
                (chars[i] as string[])[j - 1] = '|';
                (chars[i] as string[])[j + 1] = '|';
                split++;
            } else {
                (chars[i] as string[])[j] = '|';
            }
        }
    }
}

console.log(split);
