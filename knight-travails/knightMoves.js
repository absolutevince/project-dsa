export default function knightMoves(start, goal) {
  const validMoves = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  const [gx, gy] = goal;
  const visited = [];
  const q = [[start[0], start[1], [start]]];

  // ---------------------
  while (q.length > 0) {
    const [x, y, path] = q.shift();
    const nb = getNeighbors([x, y]);
    if (x === gx && y === gy) return path;
    for (let i = 0; i < nb.length; i++) {
      const [nx, ny] = nb[i];
      if (!visited.includes(`${nx}${ny}`)) {
        visited.push(`${nx}${ny}`);
        q.push([nx, ny, [...path, [nx, ny]]]);
      }
    }
  }

  // -----------------
  function getNeighbors(pos) {
    const arr = [];
    validMoves.forEach((move) => {
      const moveX = pos[0] > move[0] ? pos[0] + move[0] : move[0] + pos[0];
      const moveY = pos[1] > move[1] ? pos[1] + move[1] : move[1] + pos[1];
      if (moveX >= 0 && moveX <= 7 && moveY >= 0 && moveY <= 7) {
        arr.push([moveX, moveY]);
      }
    });
    return arr;
  }
}
