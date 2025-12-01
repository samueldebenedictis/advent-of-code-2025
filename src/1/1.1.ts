import * as fs from "fs";

const file = fs.readFileSync("src/1/input.txt", "utf8");
const lines = file.split("\n");

let count = 0;
let dial = 50;

function move(direction: string, moveValue: number) {
  const value = moveValue % 100;
  const times = Math.floor(moveValue / 100);
  const actualDial = dial;
  count += times;
  if (direction === "R") {
    if (dial + value < 100) {
      dial = dial + value;
    } else {
      dial = dial + value - 100;
      count++;
    }
  } else if (direction === "L") {
    if (dial - value >= 0) {
      dial = dial - value;
    } else {
      dial = dial - value + 100;
      if (actualDial !== 0) count++;
    }
  } else {
    throw new Error("Direction not valid");
  }
}

for (const line of lines) {
  const direction = line.slice(0, 1);
  const value = parseInt(line.slice(1));
  console.log("dial before", dial);
  move(direction, value);
  console.log(direction, value);
  console.log("dial after", dial);
  console.log("count", count);
  console.log();
}

console.log(count);
