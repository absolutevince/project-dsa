import Hashmap from "./HashMap.js";

const test = new Hashmap(16);
function fill(hashmap) {
  hashmap.set("apple", "red");
  hashmap.set("banana", "yellow");
  hashmap.set("carrot", "orange");
  hashmap.set("dog", "brown");
  hashmap.set("elephant", "gray");
  hashmap.set("frog", "green");
  hashmap.set("grape", "purple");
  hashmap.set("hat", "black");
  hashmap.set("ice cream", "white");
  hashmap.set("jacket", "blue");
  hashmap.set("kite", "pink");
  hashmap.set("lion", "golden");
}
fill(test);
console.log({ "set()": test.buckets, "length()": test.length() });
console.log({
  "get('frog')": test.get("frog"),
  "has('diamond')": test.has("diamond"),
  "has('hat')": test.has("hat"),
});
console.log({ "entries()": test.entries() });
test.remove("ice cream");
console.log({ "remove('ice cream')": test.entries() });
const newMap = new Hashmap(16);
fill(newMap);
console.log({
  "new HashMap": newMap.buckets,
});
newMap.clear();
console.log({ "clear(), new Hashmap": newMap.buckets });
console.log("MAIN HASHMAP");
console.log({ "keys()": test.keys(), "values()": test.values() });
console.log({
  "Capacity and Length before adding new entry": [test.capacity, test.length()],
});
test.set("leaf", "yellow-green");
test.set("branch", "dirt-brown");
console.log({
  "Capacity and Length after adding two new entry": [
    test.capacity,
    test.length(),
  ],
  "loadFactor of 0.8 reached": test.buckets,
  "length()": test.length(),
  "entries()": test.entries(),
});
