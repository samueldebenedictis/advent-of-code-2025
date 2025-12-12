import * as fs from 'node:fs';

const input = fs.readFileSync('src/12/input.txt', 'utf8');

class Present {
    values: string[];
    tileCount: number;
    constructor(values: string[]) {
        this.values = values;
        this.tileCount = values.reduce(
            (acc, val) => acc + val.replaceAll('.', '').length,
            0,
        );
    }
}

class Grid {
    width: number;
    height: number;
    size: number;
    requiredPresents: number[];
    constructor(width: number, height: number, requiredPresents: number[]) {
        this.width = width;
        this.height = height;
        this.requiredPresents = requiredPresents;
        this.size = width * height;
    }
}

const blocks = input.split('\n\n');
const dimensionsRaw = blocks.pop();
const presentsRaw = blocks;

const dimensions = dimensionsRaw
    ?.split('\n')
    .filter((x) => x)
    .map((x) => {
        const [dims, pres] = x.split(': ');
        const [width, height] = dims?.split('x') as string[];
        return new Grid(
            Number(width),
            Number(height),
            pres?.split(' ').map(Number) as number[],
        );
    });

const presents = presentsRaw?.map((p) => {
    const lines = p.split('\n');
    return new Present(lines.slice(1));
});

let ok = 0;

for (const grid of dimensions as Grid[]) {
    const amountOfPresentTiles = grid.requiredPresents.reduce((acc, val, i) => {
        return acc + (presents[i] as Present).tileCount * val;
    }, 0);

    if (amountOfPresentTiles <= grid.size) {
        ok++;
    }
}

console.log(ok);
