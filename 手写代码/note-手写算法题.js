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

// 2. 找到唯一的数

function solution(cards) {
    // Edit your code here
    let result = 0;
    for (let i = 0; i < cards.length; i++) {
        result ^= cards[i];  // 使用异或运算
    }
    return result;
}

console.log(solution([1, 1, 2, 2, 3, 3, 4, 5, 5]) === 4);
console.log(solution([0, 1, 0, 1, 2]) === 2);

// 3. 最小的花费
function solution(n, k, data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        // 初始化当前最便宜的价格为当天的价格
        let minPrice = data[i];
        
        // 检查前 k 天的价格，找到最便宜的那一天
        for (let j = 1; j <= k && i - j >= 0; j++) {
            if (data[i - j] < minPrice) {
                minPrice = data[i - j];
            }
        }
        
        // 更新总花费
        sum += minPrice;
    }
    return sum;
}

console.log(solution(5, 2, [1, 2, 3, 3, 2]) === 9);


// 4. 数字格式化
function solution(s) {
    s = s.replace(/^0+/, '')
    let index = s.indexOf('.');
    if (index === -1) {
        index = s.length;
    }

    let integerPart = '';
    for (let i = index - 1, count = 0; i >= 0; i--, count++) {
        if (count > 0 && count % 3 === 0) {
            integerPart = ',' + integerPart;
        }
        integerPart = s[i] + integerPart;
        console.log(i, integerPart);
    }

    let result = integerPart;
    if (index != s.length) {
        result += s.slice(index)
    }
    return result;
}

function main() {
    console.log(solution("1294512.12412") === '1,294,512.12412');
    console.log(solution("0000123456789.99") === '123,456,789.99');
    console.log(solution("987654321") === '987,654,321');
}

// 5. 组合数字之和
function solution(numbers) {

    let length = numbers.length;
    let sum = 0;
    let strNum = numbers.map((item) => item.toString());
    function generateCombinations(index, currentCombination) {
        if (index === length) {
            let currentSum = currentCombination.reduce((acc, digit) => acc + parseInt(digit), 0);

            if (currentSum % 2 === 0) {
                sum++;
            }
            return;
        }
        for (let digit of strNum) {
            generateCombinations(index + 1, currentCombination.concat(digit))
        }
    }

    generateCombinations(0, []);

}

console.log(solution([123, 456, 789]) === 14);


// 6. 最大的葫芦
function solution(n, max, array) {
    // Edit your code here
    // 牌面值的映射
    let countMap = {};
    array.forEach((item) => {
        countMap[item] = (countMap[item] || 0) + 1;
    })

    let twoArr = [];
    let threeArr = [];
    for (let key in countMap) {
        if (countMap[key] >= 3) {
            threeArr.push(parseInt(key))
        }
        if (countMap[key] >= 2) {
            twoArr.push(parseInt(key));
        }
    }

    let possibleFours = [];
    for (let three of threeArr) {
        for (let two of twoArr) {
            if (three !== two) {
                possibleFours.push([three, two])
            }
        }
    }

    let vaildFours = possibleFours.filter(four => {
        let sum = four[0] * 3 + four[1] * 2;
        return sum <= max
    })

    // 葫芦
    if (vaildFours.length === 0) {
        return [0, 0];
    } else {
        vaildFours.sort((a, b) => {
            if (a[0] !== b[0]) {
                return b[0] - a[0];
            } else {
                return b[1] - a[1];
            }
        })
        // return vaildFours[0];
        // 处理1的情况， tips: find找不到就返回undefined
        let temp1Fours = vaildFours.find((item) => item[0] == 1);
        let maxFours = temp1Fours === undefined ? vaildFours[0] : temp1Fours;
        let temp2Fours = vaildFours.find((item) => item[0] === maxFours[0] && item[1] === 1);
        maxFours = temp2Fours === undefined ? maxFours : temp2Fours
        return maxFours;
    }
}

// 统计每种牌的数量：使用 countMap 来记录每种牌面值的数量。
// 找出所有可能的三张相同牌和两张相同牌的组合：遍历 countMap，找出数量大于等于3的牌面值（三张相同牌）和数量大于等于2的牌面值（两张相同牌）。
// 生成所有可能的葫芦组合：遍历 threeArr 和 twoArr，生成所有可能的葫芦组合。
// 筛选符合条件的葫芦：计算每个葫芦的牌面值之和，并筛选出符合条件的葫芦。
// 选择最大的葫芦：在符合条件的葫芦中，选择牌面值最大的葫芦, (最后记得处理1的情况)