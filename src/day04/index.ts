import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Point = {
  row: number;
  col: number;
};

function isRoll(lines: string[][], { row, col }: Point): boolean {
  return lines[row][col] === "@";
}

function checkPoint(lines: string[][], point: Point): Boolean {
  // Invalid Point
  const { row, col } = point;
  if (row < 0 || row >= lines.length || col < 0 || col >= lines[0].length) {
    return false;
  }

  return isRoll(lines, point);
}

function countSurroundingRolls(lines: string[][], point: Point): number {
  let count = 0;
  const { row, col } = point;
  if (checkPoint(lines, { row: row - 1, col: col - 1 })) {
    count++;
  }
  if (checkPoint(lines, { row: row - 1, col })) {
    count++;
  }
  if (checkPoint(lines, { row: row - 1, col: col + 1 })) {
    count++;
  }
  if (checkPoint(lines, { row: row, col: col - 1 })) {
    count++;
  }
  // Dont need to check point itself
  if (checkPoint(lines, { row: row, col: col + 1 })) {
    count++;
  }
  if (checkPoint(lines, { row: row + 1, col: col - 1 })) {
    count++;
  }
  if (checkPoint(lines, { row: row + 1, col })) {
    count++;
  }
  if (checkPoint(lines, { row: row + 1, col: col + 1 })) {
    count++;
  }

  return count;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((row) => row.split(""));

  let count = 0;
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      const point = { row, col };
      if (isRoll(lines, point)) {
        if (countSurroundingRolls(lines, point) < 4) {
          count++;
        }
      }
    }
  }

  return count;
};

function removeRolls(lines: string[][]): number {
  let count = 0;
  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[row].length; col++) {
      const point = { row, col };
      if (isRoll(lines, point)) {
        if (countSurroundingRolls(lines, point) < 4) {
          count++;
          lines[row][col] = ".";
        }
      }
    }
  }

  return count;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((row) => row.split(""));

  let count = 0;
  let removedRolls = 0;
  do {
    removedRolls = removeRolls(lines);
    count += removedRolls;
  } while (removedRolls);

  return count;
};

const sample = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
