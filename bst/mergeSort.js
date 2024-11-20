export default function mergeSort(arr) {
  const set = [...new Set(arr)];
  return mergeAndSort(set);

  // -------
  function mergeAndSort(arr) {
    if (arr.length === 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return sort(mergeAndSort(left), mergeAndSort(right));
  }
}

function sort(left, right) {
  const sorted = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  while (left.length > 0) {
    sorted.push(left.shift());
  }

  while (right.length > 0) {
    sorted.push(right.shift());
  }

  return sorted;
}
