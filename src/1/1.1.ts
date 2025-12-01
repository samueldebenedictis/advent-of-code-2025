import * as fs from 'node:fs';

const file = fs.readFileSync('src/1/input.txt', 'utf8');
const lines = file.split('\n');

let count = 0;
let dial = 50;

function move(direction: string, moveValue: number) {
    let zerosHitThisMove = 0;
    const startDial = dial;

    if (direction === 'R') {
        const endLinear = startDial + moveValue;
        zerosHitThisMove =
            Math.floor(endLinear / 100) - Math.floor(startDial / 100);
        dial = endLinear % 100;
    } else if (direction === 'L') {
        zerosHitThisMove =
            Math.floor((startDial - 1) / 100) -
            Math.floor((startDial - moveValue - 1) / 100);
        dial = (startDial - (moveValue % 100) + 100) % 100;
    } else {
        throw new Error('Direction not valid');
    }
    count += zerosHitThisMove;
}

for (const line of lines) {
    const trimmedLine = line.trim();
    const direction = trimmedLine.slice(0, 1);
    const value = parseInt(trimmedLine.slice(1), 10);
    move(direction, value);
}

console.log(count);
