import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  let sum = 50;
  let zeros = 0;
  for (const line of lines) {
    const [direction, amount] = [line.charAt(0), parseInt(line.substring(1))];
    sum = (sum + amount * (direction == "L" ? -1 : 1)) % 100;

    if (sum == 0) {
      zeros++;
    }
  }
  return zeros.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  let sum = 50;
  let zeros = 0;
  for (const line of lines) {
    const [direction, amount] = [line.charAt(0), parseInt(line.substring(1))];
    const modifier = direction == "L" ? -1 : 1;
    const fullTurns = Math.floor(amount / 100);
    zeros += fullTurns;

    const extraTurns = amount % 100;
    const relativeSum = sum + modifier * extraTurns;
    if (sum != 0 && (relativeSum <= 0 || relativeSum >= 100)) {
      zeros++;
    }

    sum = (100 + relativeSum) % 100;
  }
  return zeros.toString();
};

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: "3",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: "6",
      },
      {
        input: `L68
L30
R148
L5
R60
L55
L1
L99
R14
L82`,
        expected: "7",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
