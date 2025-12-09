import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let lines = rawInput.split(",");
  let sum = 0;
  for (const line of lines) {
    const [min, max] = line.split("-");

    for (let num = parseInt(min); num <= parseInt(max); num++) {
      let stringNum = num.toString();
      if (stringNum.length % 2) continue;

      let firstHalf = stringNum.substring(0, stringNum.length / 2);
      let secondHalf = stringNum.substring(stringNum.length / 2);

      if (firstHalf === secondHalf) {
        sum += num;
      }
    }
  }

  return sum;
};

function doesRepeatNTimes(num, n) {
  let stringNum = num.toString();
  if (stringNum.length % n) return false;
  let groupLength = stringNum.length / n;

  let matcher = new RegExp(`.{1,${groupLength}}`, "g");
  const splits = stringNum.match(matcher);

  if (splits.every((val) => val === splits[0])) {
    return true;
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let lines = input.split(",");
  let sum = 0;

  for (const line of lines) {
    const [min, max] = line.split("-");

    for (let num = parseInt(min); num <= parseInt(max); num++) {
      let stringNum = num.toString();
      for (let n = 2; n <= stringNum.length; n++) {
        if (doesRepeatNTimes(stringNum, n)) {
          sum += num;
          break;
        }
      }
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
