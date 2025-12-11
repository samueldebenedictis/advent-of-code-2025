import * as fs from 'node:fs';

const file = fs.readFileSync('src/11/input.txt', 'utf8');
const rows = file.split('\n');

const dict: { [key: string]: string[] } = {};

for (const r of rows) {
    const temp = r.split(': ');
    if (temp.length === 2) {
        const id = temp[0];
        const connectionsString = temp[1];
        if (id && connectionsString) {
            const connections = connectionsString.split(' ');
            dict[id] = connections;
        }
    }
}

const memo: { [key: string]: number } = {};

function countPaths(start: string, end: string): number {
    const key = `${start}:${end}`;
    if (memo[key] !== undefined) {
        return memo[key];
    }

    if (start === end) {
        return 1;
    }

    let count = 0;
    const neighbors = dict[start] || [];
    for (const neighbor of neighbors) {
        count += countPaths(neighbor, end);
    }

    memo[key] = count;
    return count;
}

const pathsSvrToDac = countPaths('svr', 'dac');
const pathsDacToFft = countPaths('dac', 'fft');
const pathsFftToOut = countPaths('fft', 'out');

const pathsSvrToFft = countPaths('svr', 'fft');
const pathsFftToDac = countPaths('fft', 'dac');
const pathsDacToOut = countPaths('dac', 'out');

const totalPaths =
    pathsSvrToDac * pathsDacToFft * pathsFftToOut +
    pathsSvrToFft * pathsFftToDac * pathsDacToOut;

console.log(totalPaths);
