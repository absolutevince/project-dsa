import LinkedList from "../linked-list/LinkedList.js";

export default class HashMap {
  constructor(size) {
    this.size = size;
    this.buckets = new Array(this.size).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.size;
  }

  set(key, value) {
    const hash = this.hash(key);
    if (this.buckets[hash] === null) {
      this.buckets[hash] = { key, value };
    } else if (this.buckets !== null && this.buckets[hash].key === key) {
      this.buckets[hash].value = value;
    } else {
      const targetBucketHash = this.hash(this.buckets[hash].key);
      if (hash === targetBucketHash) {
        const linkedList = new LinkedList();
        linkedList.append(this.buckets[hash]);
        linkedList.append({ key, value });
        this.buckets[hash] = linkedList;
      }
    }
  }

  get(key) {
    const hash = this.hash(key);
    if (this.buckets[hash] === null) return null;
    return this.buckets[hash].value;
  }

  has(key) {
    const hash = this.hash(key);
    const bucket = this.buckets[hash];
    if (bucket === null) {
      return false;
    } else if (bucket instanceof LinkedList) {
      return linkedListHas(bucket, (root) => {
        if (root.data.key === key) return true;
        return false;
      });

      // ------- the has() method on LinkedList class doens't operate with non-primitive data types
      function linkedListHas(list, fn) {
        if (!list) return;
        let endLoop = false;
        let root = list.root;
        let res = false;
        while (!endLoop || root !== null) {
          if (fn(root)) {
            res = true;
            endLoop = true;
          }
          root = root.next;
        }
        return res;
      }
    } else if (bucket.key === key) {
      return true;
    }
  }
}
