import * as fs from "node:fs";

type Junction = { id: number; x: number; y: number; z: number };
const junctions: Junction[] = [];

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
        (s) => !s.includes(a) && !s.includes(b)
      );
      this.circuits = [...sOther, [...sA, ...sB]];
    }
  }
}

function dist(a: Junction, b: Junction) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

const file = fs.readFileSync("src/8/input.txt", "utf8");

const lines = file.split("\n");
for (const { index, line } of lines.map((line, index) => ({ index, line }))) {
  const [x, y, z] = (line.split(",") as string[]).map((el) => parseInt(el, 10));
  junctions.push({
    id: index,
    x: x as number,
    y: y as number,
    z: z as number,
  });
}

const set = new Circuits(junctions.map((el) => el.id));
const distances = [];

for (let i = 0; i < junctions.length; i++) {
  for (let j = i + 1; j < junctions.length; j++) {
    const a = junctions[i];
    const b = junctions[j];
    distances.push({ a, b, dist: dist(a as Junction, b as Junction) });
  }
}

distances.sort((a, b) => a.dist - b.dist);
var lastA = (distances[0] as { a: Junction }).a;
var lastB = (distances[0] as { b: Junction }).b;

while (set.circuits.length !== 1) {
  const d = distances.shift() as { a: Junction; b: Junction };
  lastA = d.a;
  lastB = d.b;
  set.merge(d.a.id, d.b.id);
}

console.log(lastA.x * lastB.x);
