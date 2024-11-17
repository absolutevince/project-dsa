import { LinkedList } from "./linkedList.js";

const L = new LinkedList();

L.append("dog");
L.append("cat");
L.append("parrot");
L.append("hamster");
L.append("snake");
L.append("turtle");
console.log({ head: L.head() });
console.log({ size: L.size() });
console.log({ tail: L.tail() });
console.log({ at_index_2: L.at(2) });
L.pop(); // should remove the turtle
console.log({
  pop:
    L.tail().data !== "tutle"
      ? "item at tail (turtle) removed"
      : "item at tail not removed",
  new_tail: L.tail(),
});
console.log({
  contains_cat: L.contains("cat"),
  contains_catterpillar: L.contains("catterpillar"),
});
console.log({ find: L.find("snake") });
console.log({ to_string: L.toString() });
console.log({
  insert_eagle_at_index_2: L.insertAt("centipede", 2),
  new_list: L.toString(),
});
L.removeAt(3);
console.log({
  remove_at_index_3: "remove parrot at index 3",
  removed_parrot: `${L.at(2)}, is the new item at index 3`,
});
