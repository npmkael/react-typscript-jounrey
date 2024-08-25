//
let hobbies: string[];
let dates: number[];

// Tuple
let role: [number, string];

// Objects
// ! NOT RECOMMENDED
let person: Object;

type Person = {
  name: string;
  age?: number;
};

let idol: Person = {
  name: "An Yujin",
  age: 21,
};

// Array of objects
let lotsOfPeople: Person[] = [
  {
    name: "Liz",
  },
];

// ! NOT RECOMMENDED
// let printName: Function;

// Functions
let printName: (name: string) => void;

function getFirstElement<T>(array: T[]) {
  return array[0];
}

const numbers = ["dsadas", "dsadsa", 1];
const firstElement = getFirstElement(numbers);

getFirstElement([1, 2, 3]);

getFirstElement(["dsad", "dsadsa"]);
