export function mergeSort(arr) {
  if (arr.length === 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const arr = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }

  while (left.length > 0) {
    arr.push(left.shift());
  }

  while (right.length > 0) {
    arr.push(right.shift());
  }

  return arr;
}
