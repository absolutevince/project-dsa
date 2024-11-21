import mergeSort from "./mergeSort.js";
import Node from "./Node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const branches = mergeSort(arr);
    return build(branches, 0, branches.length - 1);
    // ------
    function build(arr, start, end) {
      if (start > end) return null;
      const mid = start + Math.floor((end - start) / 2);
      const root = new Node(arr[mid]);
      root.left = build(arr, start, mid - 1);
      root.right = build(arr, mid + 1, end);

      return root;
    }
  }

  insert(value) {
    const node = new Node(value);
    insertValue(this.root);

    //-------
    function insertValue(root) {
      if (root === null) return node;
      if (root.value === node.value) return;
      if (root.value > node.value) {
        root.left = insertValue(root.left);
      } else {
        root.right = insertValue(root.right);
      }

      return root;
    }
  }

  delete(value) {
    del(this.root, value);

    // ------------------
    function del(root, value) {
      if (root === null) return root;
      if (root.value > value) {
        root.left = del(root.left, value);
      } else if (root.value < value) {
        root.right = del(root.right, value);
      } else {
        if (root.left === null) {
          return root.right;
        }

        if (root.right === null) {
          return root.left;
        }

        const succ = getSuccesor(root);
        root.value = succ.value;
        root.right = del(root.right, succ.value);
      }

      return root;
    }

    function getSuccesor(root) {
      root = root.right;
      while (root !== null && root.left !== null) {
        root = root.left;
      }

      return root;
    }
  }

  find(value) {
    return f(this.root);

    // ------
    function f(root) {
      if (root.value === value) return root;
      if (root === null) return null;
      if (root.value > value) {
        return f(root.left);
      } else {
        return f(root.right);
      }
    }
  }

  levelOrder(fn) {
    if (!fn) {
      throw new Error("A Callback function is required");
    }

    const q = [this.root];
    while (q.length > 0) {
      const left = q[0].left;
      const right = q[0].right;
      if (left) q.push(left);
      if (right) q.push(right);
      fn(q.shift().value);
    }
  }

  levelOrderRecursive(fn) {
    if (!fn) {
      throw new Error("A Callback function is required");
    }

    traverse([this.root]);

    //-----------------
    function traverse(q) {
      const root = q[0];
      if (q.length === 0) return;
      if (root.left !== null) q.push(root.left);
      if (root.right !== null) q.push(root.right);
      fn(q.shift().value);
      traverse(q);
    }
  }

  inOrder(fn) {
    if (!fn) {
      throw new Error("A Callback function is required");
    }
    traverse(this.root);

    //-------------
    function traverse(root) {
      if (root === null) return;
      traverse(root.left);
      fn(root.value);
      traverse(root.right);
    }
  }

  preOrder(fn) {
    if (!fn) {
      throw new Error("A Callback function is required");
    }

    traverse(this.root);

    //---------
    function traverse(root) {
      if (root === null) return;
      fn(root.value);
      traverse(root.left);
      traverse(root.right);
    }
  }

  postOrder(fn) {
    if (!fn) {
      throw new Error("A Callback function is required");
    }

    traverse(this.root);

    //---------
    function traverse(root) {
      if (root === null) return;
      traverse(root.left);
      traverse(root.right);
      fn(root.value);
    }
  }

  height(node) {
    // find the longest path using on the given node's edges
    // count the number of traverses it made
    let height = -1;

    h(this.root);
    return height;

    // ------------
    function h(root) {
      if (root === null) return -1;
      let leftHeight = h(root.left);
      let rightHeight = h(root.right);

      let res = Math.max(leftHeight, rightHeight) + 1;
      if (root.value === node.value) {
        height = res;
      }

      return res;
    }
  }

  depth(node) {
    return d(this.root);

    //-----------
    function d(root) {
      let distance = -1;
      if (root === null) return -1;
      if (
        root.value === node.value ||
        (distance = d(root.left) >= 0 || (distance = d(root.right >= 0)))
      ) {
        return distance + 1;
      }

      return distance;
    }
  }

  isBalanced() {
    const leftHeight = this.height(this.root.left);
    const rightHeight = this.height(this.root.right);

    if (leftHeight > rightHeight || leftHeight === rightHeight)
      return leftHeight - rightHeight <= 1;
    if (leftHeight < rightHeight) return rightHeight - leftHeight <= 1;
  }

  rebalance() {
    const array = [];
    this.inOrder((value) => array.push(value));
    this.root = this.buildTree(array);
  }

  // -----------------------------------------
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
