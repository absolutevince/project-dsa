import ObjectList from "./ObjectList.js";

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
        const linkedList = new ObjectList();
        const obj = this.buckets[targetBucketHash];
        linkedList.append(obj.key, obj.value);
        linkedList.append(key, value);
        this.buckets[hash] = linkedList;
      }
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
  }

  remove(key) {
    const hash = this.hash(key);
    if (this.buckets[hash] === null) {
      return null;
    } else if (this.buckets[hash] instanceof ObjectList) {
      this.buckets[hash].remove(key);
    } else if (this.buckets[hash].key === key) {
      this.buckets[hash] = null;
      return true;
    }
  }
}
