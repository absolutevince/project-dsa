graph([3, 3]);
function graph(start) {
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

  const graph = [];
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push([i, j]);
    }
    graph.push(row);
  }

  graph.forEach((row) => {
    row.forEach((v) => {
      console.log({ [`${v}`]: getNeighbours(v) });
    });
  });

  // -----------------
  function getNeighbours(pos) {
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
