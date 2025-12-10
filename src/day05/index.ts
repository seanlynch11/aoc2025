import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [rawRanges, rawIds] = input.split("\n\n");

  const ranges = rawRanges
    .split("\n")
    .map((range) => range.match(/\d+/g)!.map(Number));

  const ids = rawIds.split("\n").map(Number);

  const count = ids.reduce((count, id) => {
    if (ranges.some(([min, max]) => id >= min && id <= max)) {
      count++;
    }

    return count;
  }, 0);
  return count;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const [rawRanges, rawIds] = input.split("\n\n");

  const ranges = rawRanges
    .split("\n")
    .map((range) => range.match(/\d+/g)!.map(Number))
    .sort((a, b) => a[0] - b[0]);

  // Combine and simplify ranges
  const combinedRanges: number[][] = [];

  for (const range of ranges) {
    if (!combinedRanges.length) {
      combinedRanges.push(range);

      continue;
    }

    let isExtend = false;
    let isContained = false;
    for (let i = 0; i < combinedRanges.length; i++) {
      const [cMin, cMax] = combinedRanges[i];
      if (range[1] < cMax) {
        isContained = true;
        break;
      }
      if (range[0] <= cMax && range[1] >= cMax) {
        combinedRanges[i][1] = range[1];
        isExtend = true;
        break;
      }
    }
    if (isExtend || isContained) {
      // TODO: handle case where top of extend could extend into other combined ranges
      continue;
    }
    combinedRanges.push(range);
  }

  // Count ranges
  let count = combinedRanges.reduce((count, range, rangeNum) => {
    count += range[1] - range[0] + 1;
    return count;
  }, 0);

  return count;
};

const sample = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
