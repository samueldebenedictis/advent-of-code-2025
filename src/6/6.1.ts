import * as fs from 'node:fs';

const transpose = (matrix: string[][]) =>
    matrix[0]?.map((_col, i) => matrix.map((row) => row[i]));

const file = fs.readFileSync('src/6/input.txt', 'utf8');
const tempMatrix = file.split('\n').map((el) => el.split(''));
const matrix = transpose(tempMatrix);

const ops = matrix
    ?.map((line) => line.slice(-1).join(''))
    .filter((el) => el !== ' ');

const tempNumbers = matrix
    ?.map((line) => line.slice(0, -1).join(''))
    .map((el) => el.trim());
const splitIndex = tempNumbers
    ?.map((el, index) => {
        if (el === '') return index;
        return undefined;
    })
    .filter((el) => el !== undefined);
const numbers: string[][] = [];
let i = 0;
for (const j of splitIndex as number[]) {
    numbers.push((tempNumbers as string[]).slice(i, j));
    i = j + 1;
}
numbers.push((tempNumbers as string[]).slice(i));

const res: number[] = numbers.map((_el) => 0);

ops?.forEach((op, index) => {
    if (op === '+') {
        let sum = 0;
        for (const el of numbers[index] as string[]) {
            sum += parseInt(el, 10);
        }
        res[index] = sum;
    }
    if (op === '*') {
        let mul = 1;
        for (const el of numbers[index] as string[]) {
            mul *= parseInt(el, 10);
        }
        res[index] = mul;
    }
});

console.log(res.reduce((a, b) => a + b));
