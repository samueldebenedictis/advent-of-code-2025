import * as fs from 'node:fs';

type Juction = { id: number; x: number; y: number; z: number };
const juctions: Juction[] = [];

class Circuits {
    circuits: number[][];
    constructor(ns: number[]) {
        this.circuits = [];
        for (const n of ns) {
            this.circuits.push([n]);
        }
    }
    find(n: number) {
        return this.circuits.filter((s) => s.includes(n))[0];
    }
    merge(a: number, b: number) {
        const sA = this.find(a) as number[];
        const sB = this.find(b) as number[];
        if (sA !== sB) {
            const sOther = this.circuits.filter(
                (s) => !s.includes(a) && !s.includes(b),
            );
            console.log('merge', sA, sB);
            this.circuits = [...sOther, [...sA, ...sB]];
        }
    }
}

function dist(a: Juction, b: Juction) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

const file = fs.readFileSync('src/8/input.txt', 'utf8');

const lines = file.split('\n');
for (const { index, line } of lines.map((line, index) => ({ index, line }))) {
    const [x, y, z] = (line.split(',') as string[]).map((el) =>
        parseInt(el, 10),
    );
    juctions.push({
        id: index,
        x: x as number,
        y: y as number,
        z: z as number,
    });
}
console.log(juctions);

const set = new Circuits(juctions.map((el) => el.id));
const distances = [];

for (let i = 0; i < juctions.length; i++) {
    for (let j = i + 1; j < juctions.length; j++) {
        const a = juctions[i];
        const b = juctions[j];
        distances.push({ a, b, dist: dist(a, b) });
    }
}

distances.sort((a, b) => a.dist - b.dist);

for (let i = 0; i < 1000; i++) {
    set.merge(distances[i]?.a.id, distances[i]?.b.id);
}
// console.log(distances);
// console.log(set.circuits.map((el) => el.length).sort((a, b) => b - a));
const sorted = set.circuits.map((el) => el.length).sort((a, b) => b - a);

const res = sorted[0] * sorted[1] * sorted[2];
console.log(res);

console.log(set);
