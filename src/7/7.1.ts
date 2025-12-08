import * as fs from 'node:fs';

const file = fs.readFileSync('src/7/input.txt', 'utf8');
const lines = file.split('\n');

const counts = lines[0]?.split('').map(() => 0) as number[];
lines.map((line) =>
    line.split('').forEach((c, i) => {
        if (c === 'S') counts[i] = 1;
        if (c === '^' && (counts[i] as number) > 0) {
            (counts[i - 1] as number) += counts[i] as number;
            (counts[i + 1] as number) += counts[i] as number;
            counts[i] = 0;
        }
    }),
);

console.log(counts?.reduce((a, b) => a + b));
