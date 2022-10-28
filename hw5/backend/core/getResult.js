function getResult(guess, ans) {
    const guessNo = Number(guess);
    let status = ''
    if (guessNo < ans) {
        status = "bigger";
    };
    if (guessNo > ans) {
        status = "smaller";
    };
    if (guessNo === ans) {
        status = "Equal";
    };
    return status;
  }
export default getResult()