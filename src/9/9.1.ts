import * as fs from 'node:fs';

const intersects = (
    a: number,
    b: number,
    c: number,
    d: number,
    p: number,
    q: number,
    r: number,
    s: number,
) => {
    const det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
};

type Tile = { id: number; x: number; y: number };
const redTiles: Tile[] = [];

type Line = { a: Tile; b: Tile };
const lines: Line[] = [];

const file = fs.readFileSync('src/9/input.txt', 'utf8');
const ls = file.split('\n');

ls.forEach((value, index) => {
    const [x, y] = value.split(',').map((el) => parseInt(el, 10));
    redTiles.push({ id: index, x: x as number, y: y as number });
});

for (let i = 1; i < redTiles.length; i++) {
    lines.push({ a: redTiles[i - 1] as Tile, b: redTiles[i] as Tile });
}
lines.push({
    a: redTiles[redTiles.length - 1] as Tile,
    b: redTiles[0] as Tile,
});

let maxArea = 0;
for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
        const tileI = redTiles[i] as Tile;
        const tileJ = redTiles[j] as Tile;
        if (tileI.x === tileJ.x || tileI.y === tileJ.y) continue;
        const rectLines = [
            [
                [tileI.x, tileI.y],
                [tileJ.x, tileJ.y],
            ],
            [
                [tileI.x, tileJ.y],
                [tileJ.x, tileI.y],
            ],
        ];

        if (
            rectLines.some((rline) => {
                const [iX, iY, jX, jY] = rline.flat();
                return lines.some((line) =>
                    intersects(
                        iX as number,
                        iY as number,
                        jX as number,
                        jY as number,
                        line.a.x,
                        line.a.y,
                        line.b.x,
                        line.b.y,
                    ),
                );
            })
        ) {
            continue;
        }

        const area =
            (Math.abs(tileI.x - tileJ.x) + 1) *
            (Math.abs(tileI.y - tileJ.y) + 1);
        if (area > maxArea) {
            maxArea = area;
        }
    }
}

console.log(maxArea);
