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

// Extending using type

type KaelProps = {
    name: string;
    age: number;
};

type KielProps = KaelProps & {
    hasDisability: boolean;
};

function moala({ name, age, hasDisability }: KielProps) {
    return "sample";
}

// Using omit

type UserProps = {
    name: string;
    age: number;
    createdAt: Date;
};

type GuestProps = Omit<UserProps, "name" | "age">;

// Generics Type

function getIndexOfArrayItem<T>(array: T[], arrayItem: T) {
    return array.findIndex((item) => item === arrayItem);
}

const arr = [55, 99, 77];

getIndexOfArrayItem(arr, 77);

// Multi-type parameters
// function createArrayPair<T, U>(input1: T, input2: U): [T, U] {
//     return [input1, input2];
// }

// arrow function implementation
const createArrayPair = <T, U>(input1: T, input2: U): [T, U] => {
    return [input1, input2];
};

createArrayPair("hello", 10);
