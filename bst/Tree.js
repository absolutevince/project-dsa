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
      throw new Error("Callback function is required");
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
      throw new Error("Callback function is required");
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
