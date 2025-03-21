// 1. 实现斐波那契数列

function fibo(n) {
    if (n == 1 || n ==2) return n;
    return fibo(n - 1) + fibo(n - 2)
};


var fibonacci = function (n) {
    let n1 = 1, n2 = 1;
    for (let i = 2; i <= n; i++) {
        [n1, n2] = [n2, n1 + n2];
    }
    return n2;
}

fibonacci(2);

console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4);
console.log(solution([0, 1, 0, 1, 2]) === 2);
function solution(cards) {
    // Edit your code here
    let result = 0;
    for (let i = 0; i < cards.length; i++) {
        result ^= cards[i];  // 使用异或运算
    }
    return result;
}

