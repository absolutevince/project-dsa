export default class ObjectList {
  #root;
  constructor() {
    this.#root = null;
  }

  append(key, value) {
    const node = new Node(key, value);
    if (this.#root === null) {
      this.#root = node;
    } else {
      addToEnd(this.#root);
    }

    // --------
    function addToEnd(root) {
      if (root.next === null) {
        root.next = node;
      } else {
        addToEnd(root.next);
      }
    }
  }

  prepend(key, value) {
    const temp = this.#root;
    this.#root = new Node(key, value);
    this.#root.next = temp;
  }

  get(key) {
    return getUsingKey(this.#root);
    // -----
    function getUsingKey(root) {
      if (root === null) return null;
      if (root.data.key === key) {
        return root.data.value;
      } else {
        return getUsingKey(root.next);
      }
    }
  }

  has(key) {
    return isKeyExistFrom(this.#root);
    //-----;
    function isKeyExistFrom(root) {
      if (root === null) return false;
      if (root.data.key === key) {
        return true;
      } else {
        return isKeyExistFrom(root.next);
      }
    }
  }

  remove(key) {
    if (this.#root.data.key === key) {
      this.#root = this.#root.next;
    } else {
      removeUsingkey(this.#root);
    }
    // ------
    function removeUsingkey(targetRoot, prevRoot) {
      if (targetRoot === null) return false;
      if (targetRoot.data.key === key) {
        prevRoot.next = targetRoot.next;
      } else {
        removeUsingkey(targetRoot.next, targetRoot);
      }
    }
  }

  head() {
    return this.#root;
  }
}

class Node {
  constructor(key, value) {
    this.data = { key, value };
    this.next = null;
  }
}
