export default class LinkedList {
  constructor() {
    this.root = null;
  }

  append(data) {
    const node = new Node(data);
    if (this.root == null) {
      this.root = node;
    } else {
      addToEnd(this.root);
    }

    // -------
    function addToEnd(root) {
      if (root.next === null) {
        root.next = node;
      } else {
        addToEnd(root.next);
      }
    }
  }

  prepend(data) {
    const temp = this.root;
    this.root = new Node(data);
    this.root.next = temp;
  }

  size() {
    return count(0, this.root);

    // ------
    function count(counter, root) {
      if (root === null) {
        return counter;
      }
      return count(counter + 1, root.next);
    }
  }

  head() {
    return this.root;
  }

  tail() {
    if (this.root === null) return;

    return findTail(this.root.next);

    // -----
    function findTail(root) {
      if (root.next === null) {
        return root;
      }
      return findTail(root.next);
    }
  }

  at(index) {
    if (this.root === null) return "List is empty";
    return findValueAtIndex(0, this.root.next);

    function findValueAtIndex(currentIndex, root) {
      if (index === currentIndex) {
        return root.data;
      } else if (root === null) {
        return "Not Found";
      } else {
        return findValueAtIndex(currentIndex + 1, root.next);
      }
    }
  }

  pop() {
    if (this.root == null) return;
    removeAtEnd(this.root, this.root.next);

    // ------
    function removeAtEnd(prevRoot, root) {
      if (root.next === null) {
        prevRoot.next = null;
      } else {
        removeAtEnd(root, root.next);
      }
    }
  }

  contains(data) {
    if (this.root.data === data) return true;
    return finder(this.root.next);

    // ------
    function finder(root) {
      if (root === null) return false;
      if (root.data === data) return true;
      return finder(root.next);
    }
  }

  find(data) {
    return findIndexOfValue(this.root);

    //-----
    function findIndexOfValue(root, currentIndex = 0) {
      if (root === null) return -1;
      if (root.data === data) return currentIndex;
      return findIndexOfValue(root.next, currentIndex + 1);
    }
  }

  toString() {
    let string = "";

    stringify(this.root);

    return string;

    //------
    function nodeTemplate(data, hasNext) {
      if (hasNext) return `( ${data} ) -> `;
      return `( ${data} ) -> null`;
    }

    // ------
    function stringify(root) {
      if (root.next === null) {
        string += nodeTemplate(root.data, false);
        return;
      }
      string += nodeTemplate(root.data, true);
      stringify(root.next);
    }
  }

  insertAt(data, index) {
    const tailIndex = this.size() - 1;
    insertAtIndex(0, this.root, null);

    // ------
    function insertAtIndex(currentIndex, root, prevRoot) {
      const node = new Node(data);
      if (root === null) return;
      if (index === 0) {
        prepend(data);
        return;
      }
      if (index === tailIndex) {
        append(data);
        return;
      }
      if (currentIndex === index) {
        node.next = root;
        prevRoot.next = node;
      }

      insertAtIndex(currentIndex + 1, root.next, root);
    }
  }

  removeAt(index) {
    remove(this.root);
    //--------
    function remove(targetRoot, currentIndex = 0, prevRoot) {
      if (targetRoot === null) return;
      if (index === 0) {
        this.root = targetRoot.next;
      } else if (currentIndex === index) {
        prevRoot.next = targetRoot.next;
      }
      remove(targetRoot.next, currentIndex + 1, targetRoot);
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
