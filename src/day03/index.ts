import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    let maxes = [0, 0];

    for (let i = 0; i < line.length; i++) {
      let nextNum = parseInt(line[i]);
      if (nextNum > maxes[0] && i < line.length - 1) {
        maxes[0] = nextNum;
        maxes[1] = parseInt(line[i + 1]);
        continue;
      }
      if (nextNum > maxes[1]) {
        maxes[1] = nextNum;
      }
    }
    sum += 10 * maxes[0] + maxes[1];
  }

  return sum;
};

function handleNumForInx(
  line: string,
  i: number,
  maxes: number[],
  maxIdx: number,
) {
  let nextNum = parseInt(line[i]);

  // Check the current Max
  if (
    nextNum > maxes[maxIdx] &&
    i < line.length - (maxes.length - maxIdx - 1)
  ) {
    maxes[maxIdx] = nextNum;
    for (let x = maxIdx + 1; x < maxes.length; x++) {
      maxes[x] = 0;
    }
  } else if (maxIdx < maxes.length - 1) {
    // Check the next Max
    handleNumForInx(line, i, maxes, maxIdx + 1);
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lines = input.split("\n");
  let sum = 0;

  for (const line of lines) {
    let maxes = new Array(12).fill(0);

    for (let i = 0; i < line.length; i++) {
      handleNumForInx(line, i, maxes, 0);
    }

    const value = parseInt(maxes.map(String).join(""));
    sum += value;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
