import Hashmap from "./HashMap.js";

const test = new Hashmap(16);

test.set("apple", "red");
console.log({ "Add item {'apple': 'red'}": test.buckets });
test.set("apple", "green");
console.log({
  "Replace exisiting key's value {'apple': 'red'}":
    test.buckets[test.hash("apple")],
});
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
console.log({ "add a bunch of items": test.buckets });

test.set("hat", "black");

const LS = test.buckets[test.hash("hat")];
console.log({
  "Handle collision using linked list": LS,
  "linked list root.data": LS.head().value,
  "linked list root.next.data": LS.head().next,
  Buckets: test.buckets,
});
console.log({
  "get the value of key 'dog', should be 'brown'": test.get("dog"),
});
console.log({
  "has(frog), should be true": test.has("frog"),
  "has('eggplant), should be false": test.has("eggplant"),
  "has('hat') which is colliding with 'grape', should return true":
    test.has("hat"),
});
console.log({
  "get('dog'), should return 'brown'": test.get("dog"),
  "get('frog), should return 'green'": test.get("frog"),
  "get('hat'), on a linked-list, should return 'black'": test.get("hat"),
  "get('grape'), on a linked-list should return 'purple'": test.get("grape"),
});
test.remove("dog");
test.remove("hat");
console.log(
  { "remove('dog')": test.buckets },
  {
    "remove('hat'), collisioning item, should remove from linked-list":
      test.buckets[test.hash("grape")].head(),
  },
);
