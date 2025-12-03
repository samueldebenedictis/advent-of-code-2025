import * as fs from "node:fs";

const file = fs.readFileSync("src/3/input.txt", "utf8");
const nums: number[][] = file
  .split("\n")
  .map((lines) => lines.split("").map((x) => parseInt(x, 10)));

const maxs = nums.map((line) =>
  line.slice(0, -1).reduce((pV, aV) => (pV > aV ? pV : aV))
);

const maxsPos = nums.map((line, index) => line.indexOf(maxs[index] as number));

const numsRemaing = nums.map((line, index) =>
  line.slice((maxsPos[index] as number) + 1)
);

const maxs2 = numsRemaing.map((line) =>
  line.reduce((pV, aV) => (pV > aV ? pV : aV))
);
console.log(nums);
console.log(maxs);
console.log(maxsPos);
console.log(numsRemaing);
console.log(maxs2);

const res = maxs.map((el, i) => el * 10 + (maxs2[i] as number));
console.log(res.reduce((pV, cV) => cV + pV));
