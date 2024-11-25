let counter = 0;
const arr = [];
while (counter < 10) {
  for (let i = 0; i < 10; i++) {
    if (i === 7) {
      break;
    } else {
      console.log(i);
    }
  }

  console.log("still runs");
  counter++;
}
