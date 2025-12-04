import * as fs from 'node:fs';

const file = fs.readFileSync('src/4/input.txt', 'utf8');
let cells: boolean[][] = file
    .split('\n')
    .map((lines) => lines.split('').map((x) => x === '@'));

const limitY = cells.length;
const limitX = (cells[0] as boolean[]).length;

function checkCell(y: number, x: number) {
    if (cells[y]?.[x]) {
        return cells[y][x];
    } else return false;
}

let res = 0;
let resTemp = 0;
let found = true;

const nextCells = JSON.parse(JSON.stringify(cells));

while (found) {
    cells = JSON.parse(JSON.stringify(nextCells));
    for (let y = 0; y < limitY; y++) {
        for (let x = 0; x < limitX; x++) {
            const self = checkCell(y, x);
            const nw = checkCell(y - 1, x - 1);
            const n = checkCell(y - 1, x);
            const ne = checkCell(y - 1, x + 1);
            const w = checkCell(y, x - 1);
            const e = checkCell(y, x + 1);
            const sw = checkCell(y + 1, x - 1);
            const s = checkCell(y + 1, x);
            const se = checkCell(y + 1, x + 1);

            const adiacents = [nw, n, ne, w, e, sw, s, se].map(
                (el) => (el ? 1 : 0) as number,
            );

            const sum = adiacents.reduce((a, b) => a + b);
            if (self && sum < 4) {
                nextCells[y][x] = false;
                resTemp++;
            }
        }
    }
    if (resTemp === 0) {
        found = false;
    }
    res += resTemp;
    resTemp = 0;
}

console.log(res);
