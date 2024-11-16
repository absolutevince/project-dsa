import { fibs, fibsRecursive } from "./fibonacci.js";
import { mergeSort } from "./mergeSort.js";

//FIBONACCI SEQUENCE
console.log(fibs(8)); // [0, 1, 1,  2, 3, 5, 8, 13]
console.log(fibsRecursive(8)); // [0, 1, 1,  2, 3, 5, 8, 13]
// Merge Sort
console.log(mergeSort([0, 3, 4, 1, 9, 12, 24, 5, 124, 53]));
