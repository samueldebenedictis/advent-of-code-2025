import * as fs from 'node:fs';

const file = fs.readFileSync('src/6/input.txt', 'utf8');

const lines = file.split('\n');
const values = lines.map((l) => l.split(' ').filter((el) => el !== ''));

const numbers = values.slice(0, -1);
const ops = values.slice(-1)[0];

const res: number[] = numbers.map((_el) => 0);

ops?.forEach((op, index) => {
    if (op === '+') {
        let sum = 0;
        for (const line of numbers) {
            sum += parseInt(line[index] as string, 10);
        }
        res[index] = sum;
    }
    if (op === '*') {
        let mul = 1;
        for (const line of numbers) {
            mul *= parseInt(line[index] as string, 10);
        }
        res[index] = mul;
    }
});

console.log(res.reduce((a, b) => a + b));
