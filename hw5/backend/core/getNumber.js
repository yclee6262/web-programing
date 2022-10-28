let ans;

function genNumber() {
    ans = Math.floor(Math.random() * 99) + 1;
}

function getNumber(){
    return ans
}
export {genNumber, getNumber}