import * as fs from 'node:fs';

const file = fs.readFileSync('src/1/input.txt', 'utf8');
const lines = file.split('\n');

let count = 0;
let dial = 50;

function move(direction: string, moveValue: number) {
    const value = moveValue % 100;
    if (direction === 'R') {
        if (dial + value < 100) {
            dial = dial + value;
        } else {
            dial = dial + value - 100;
        }
    } else if (direction === 'L') {
        if (dial - value >= 0) {
            dial = dial - value;
        } else {
            dial = dial - value + 100;
        }
    } else {
        throw new Error('Direction not valid');
    }
    if (dial === 0) {
        count++;
    }
}

for (const line of lines) {
    const direction = line.slice(0, 1);
    const value = parseInt(line.slice(1), 10);
    move(direction, value);
}

console.log(count);
