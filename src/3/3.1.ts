import * as fs from 'node:fs';

const file = fs.readFileSync('src/3/input.txt', 'utf8');
const nums: number[][] = file
    .split('\n')
    .map((lines) => lines.split('').map((x) => parseInt(x, 10)));

const leftBounds: number[] = nums.map((_) => 0);
const rightBounds: number[] = nums.map((_) => 12);
const temps: number[] = nums.map((_) => 0);

nums.forEach((line, index) => {
    while (rightBounds[index]) {
        const sliceRight = -rightBounds[index] + 1;
        const sliced = line.slice(
            leftBounds[index],
            sliceRight !== 0 ? sliceRight : undefined,
        );
        const max = sliced.reduce((pV, aV) => (pV > aV ? pV : aV));
        const pos = sliced.indexOf(max);
        leftBounds[index] = (leftBounds[index] as number) + pos + 1;
        temps[index] =
            (temps[index] as number) + max * 10 ** (rightBounds[index] - 1);
        rightBounds[index]--;
    }
});

console.log(temps.reduce((a, b) => a + b));
