knightMoves([3, 3], [2, 4]);

function knightMoves(start, goal) {
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

  let path = [];
  let next = [];
  const visited = [];
  let stack = [start];
  const [gx, gy] = goal;
  while (stack.length > 0) {
    const [cx, cy] = stack.pop(); // vertex
    if (!visited.includes(`${cx}${cy}`)) {
      path.push([cx, cy]);
      next.push([cx, cy]);
      const neighbors = getNeighbors([cx, cy]);
      for (let i = 0; i < neighbors.length; i++) {
        const [nx, ny] = neighbors[i];
        path.push([nx, ny]);
        if (nx === gx && ny === gy) {
          console.log(path);
          path = [start];
        } else {
          path.pop();
        }
        if (!visited.includes(`${nx}${ny}`)) stack.push([nx, ny]);
      }
    }

    visited.push(`${cx}${cy}`);
  } // end of while loop

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
