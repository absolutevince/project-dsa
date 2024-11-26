# Knights Travails

## How It Works

- Calling the `knightMoves(start, goal)` function will return the closest path from `start` point to `goal` point;

The `knightMoves()` function uses `BFS(Breath-first Search)` in order to immediately find the shortest path, and it's the best in this use case, we could use `DFS(Depth-first Search)` but it'll do more processes since we will go as deep as possible on first neighbor it found, `BFS` however checks every neighbors first before traversing throught it.

### Using `BFS`

we initialize the queue with the starting point, `[x, y, path = [x, y]]` and the visited with empty array, and just spread the `goal` point to `[gx, gy]

```js
const [gx, gy] = goal;
const visited = [];
const q = [[start[0], start[1], [start]]];
```

then, we start the while loop and get the first item on the queue by dequeuing, storing it's `x, y, path`

```js
while (q.length > 0) {
  // --------
  const [x, y, path] = q.shift();
  // --------
}
```

after that, we get the neighbors using the `getNeighbors()` function

```js
while (q.length > 0) {
  const [x, y, path] = q.shift();
  // --------
  const nb = getNeighbors([x, y]);
  // --------
}
```

> return an array of neighbors/edges (was edges the write word?)
>
> ```js
> function getNeighbors(pos) {
>   const arr = [];
>   validMoves.forEach((move) => {
>     const moveX = pos[0] > move[0] ? pos[0] + move[0] : move[0] + pos[0];
>     const moveY = pos[1] > move[1] ? pos[1] + move[1] : move[1] + pos[1];
>     if (moveX >= 0 && moveX <= 7 && moveY >= 0 && moveY <= 7) {
>       arr.push([moveX, moveY]);
>     }
>   });
>   return arr;
> }
> ```

Now, we check if the current vertex/node is the `goal` point

```js
while (q.length > 0) {
  const [x, y, path] = q.shift();
  const nb = getNeighbors([x, y]);
  // --------
  if (x === gx && y === gy) return path;
  // --------
}
```

> Immediately returning path means we found the shortest path, that just how BFS works, it makes sure the top layer were checked first before moving on

if it wasn't, then we start looping through it's neighbors

```js
while (q.length > 0) {
  const [x, y, path] = q.shift();
  const nb = getNeighbors([x, y]);
  if (x === gx && y === gy) return path;
  // --------
  for (let i = 0; i < nb.length; i++) {}
  // --------
}
```

Inside the loop, we check if the current iteration of `[nx, ny]` vertex is already in the `visted` array, if not, we then transform it into a string and attach the `path` array concatinating the `[nx, ny]` and add it to the visited array , if it is in the `visited` array we skip the item

```js
while (q.length > 0) {
  const [x, y, path] = q.shift();
  const nb = getNeighbors([x, y]);
  if (x === gx && y === gy) return path;

  for (let i = 0; i < nb.length; i++) {
    // --------
    const [nx, ny] = nb[i];
    if (!visited.includes(`${nx}${ny}`)) {
      visited.push(`${nx}${ny}`);
      q.push([nx, ny, [...path, [nx, ny]]]);
    }
    // --------
  }
}
```

> on `q.push([nx, ny, [...path, [nx, ny]]])`, we passed the `nx` & `ny` alongside the `path` array concatinating the `[nx, ny]` so that when it's time to dequeue and process this `[nx, ny]`'s neighbors the `path` array already has `[nx, ny]` on it so attaching it's neighbor won't ruin the path's correctness, (hope you get what I was trying to say :)

And that's it. The loop will keep queueing and dequeueing from the `queue` and concatinating one vertex at time to a corresponding `path` array until it find the first successful path (which is already the shortest, because you know, BFS).
