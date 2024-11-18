import ObjectList from "./ObjectList.js";

export default class HashMap {
  #loadFactor;
  constructor(size) {
    this.size = size;
    this.buckets = new Array(this.size).fill(null);
    this.#loadFactor = 0.8;
    this.capacity = Math.floor(this.size * this.#loadFactor);
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

    if (hash < 0 || hash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[hash] === null) {
      this.buckets[hash] = { key, value };
    } else if (this.buckets !== null && this.buckets[hash].key === key) {
      this.buckets[hash].value = value;
    } else {
      const targetBucketHash = this.hash(this.buckets[hash].key);
      if (hash === targetBucketHash) {
        const linkedList = new ObjectList();
        const obj = this.buckets[targetBucketHash];
        linkedList.append(obj.key, obj.value);
        linkedList.append(key, value);
        this.buckets[hash] = linkedList;
      }
    }

    if (this.length() > this.capacity) {
      const currentEntries = this.entries();
      this.#increaseCapacity(); // also deletes all the key, value pairs
      this.#refill(currentEntries);
    }
  }

  get(key) {
    const bucket = this.buckets[this.hash(key)];
    if (bucket === null) {
      return null;
    } else if (bucket instanceof ObjectList) {
      return bucket.get(key);
    } else if (bucket.key === key) {
      return bucket.value;
    }
  }

  has(key) {
    const bucket = this.buckets[this.hash(key)];
    if (bucket === null) {
      return false;
    } else if (bucket instanceof ObjectList) {
      return bucket.has(key);
    } else if (bucket.key === key) {
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hash(key);
    if (this.buckets[hash] === null) {
      return false;
    } else if (this.buckets[hash] instanceof ObjectList) {
      this.buckets[hash].remove(key);
    } else if (this.buckets[hash].key === key) {
      this.buckets[hash] = null;
      return true;
    }
  }

  length() {
    let counter = 0;
    this.buckets.forEach((bucket) => {
      if (bucket === null) return;
      if (bucket instanceof ObjectList) {
        let root = bucket.head();
        while (root !== null) {
          counter += 1;
          root = root.next;
        }
      } else {
        counter += 1;
      }
    });

    return counter;
  }

  clear() {
    this.buckets = new Array(16).fill(null);
  }

  keys() {
    const keysArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket === null) return;
      if (bucket instanceof ObjectList) {
        let root = bucket.head();
        while (root !== null) {
          keysArr.push(root.data.key);
          root = root.next;
        }
      } else {
        keysArr.push(bucket.key);
      }
    });
    return keysArr;
  }

  values() {
    const valuesArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket === null) return;
      if (bucket instanceof ObjectList) {
        let root = bucket.head();
        while (root !== null) {
          valuesArr.push(root.data.value);
          root = root.next;
        }
      } else {
        valuesArr.push(bucket.value);
      }
    });
    return valuesArr;
  }

  entries() {
    const entriesArr = [];
    this.buckets.forEach((bucket) => {
      if (bucket === null) return;
      if (bucket instanceof ObjectList) {
        let root = bucket.head();
        while (root !== null) {
          entriesArr.push([root.data.key, root.data.value]);
          root = root.next;
        }
      } else {
        entriesArr.push([bucket.key, bucket.value]);
      }
    });
    return entriesArr;
  }

  #increaseCapacity() {
    this.size = this.size * 2;
    this.capacity = this.size * this.#loadFactor;
    this.buckets = new Array(this.size).fill(null);
  }

  #refill(data) {
    for (let i = 0; i < data.length; i++) {
      const [key, value] = data[i];
      this.set(key, value);
    }
  }
}
