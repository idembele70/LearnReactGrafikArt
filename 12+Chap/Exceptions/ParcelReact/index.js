function wait(duration) {
  const t = Date.now();
  while (true) {
    if (Date.now() - t > duration) {
      console.log(Date.now() - t);
      return true;
    }
  }
}
function encode(number) {
  wait(1000);
  return Date.now();
}
