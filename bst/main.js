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
console.log("Breath-first traversal");
console.log({ "Level-Order Traversal (recursive)": levelOrderRecursiveArr });
console.log("Depth-first traversal");
const inOrderArr = [];
const preOrderArr = [];
const postOrderArr = [];
tree.inOrder((value) => inOrderArr.push(value));
tree.preOrder((value) => preOrderArr.push(value));
tree.postOrder((value) => postOrderArr.push(value));
tree.prettyPrint();
console.log({
  "in-order traversal": inOrderArr,
  "pre-order traversal": preOrderArr,
  "post-order traversal": postOrderArr,
});
let node = tree.find(4);
console.log({
  "height of node with a value of 4": tree.height(node),
  "depth of node with a value of 4": tree.depth(node),
});
tree.prettyPrint();
console.log({ "check if the tree is balanced": tree.isBalanced() });
tree.insert(90);
tree.insert(2);
tree.insert(0);
tree.insert(18);
tree.insert(55);
tree.insert(89);
tree.insert(52);
tree.prettyPrint();
console.log({
  "check if the tree is balanced after adding a bunch of nodes":
    tree.isBalanced(),
});
tree.rebalance();
tree.prettyPrint();
console.log({
  "check if the tree is balance after rebalancing": tree.isBalanced(),
});
