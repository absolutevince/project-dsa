import Tree from "./Tree.js";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(arr);

tree.prettyPrint();

tree.insert(25);
console.log("insert(25)");
tree.prettyPrint();
tree.delete(3);
console.log("delete leaf node (3)");
tree.prettyPrint();
tree.delete(23);
console.log("detete node with single branch child (23)");
tree.prettyPrint();
tree.delete(67);
console.log("delete node with two branch child (67)");
tree.prettyPrint();
tree.insert(88);
tree.insert(12);
tree.insert(3);
tree.insert(6);
console.log("Add more values");
tree.prettyPrint();
console.log({ "find(12)": tree.find(12) });
const levelOrderArr = [];
tree.levelOrder((value) => levelOrderArr.push(value));
console.log({ "Level-Order Traversal (iterative)": levelOrderArr });
const levelOrderRecursiveArr = [];
tree.levelOrderRecursive((value) => levelOrderRecursiveArr.push(value));
console.log({ "Level-Order Traversal (recursive)": levelOrderRecursiveArr });
