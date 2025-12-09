import * as fs from 'node:fs';

type Tile = { id: number; x: number; y: number };
const tiles: Tile[] = [];

const file = fs.readFileSync('src/9/input.txt', 'utf8');
const lines = file.split('\n');

lines.forEach((value, index) => {
    const [x, y] = value.split(',').map((el) => parseInt(el, 10));
    tiles.push({ id: index, x: x as number, y: y as number });
});

let maxArea = 0;

for (const tile1 of tiles) {
    for (const tile2 of tiles) {
        const area =
            (Math.abs(tile1.x - tile2.x) + 1) *
            (Math.abs(tile1.y - tile2.y) + 1);
        if (area > maxArea) {
            maxArea = area;
        }
    }
}

console.log(maxArea);
