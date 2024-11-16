export function fibs(n) {
  const arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }

  return arr;
}
export function fibsRecursive(n, arr = [0, 1]) {
  if (n === arr.length) return arr;
  return fibsRecursive(n, [...arr, arr[arr.length - 2] + arr[arr.length - 1]]);
}
