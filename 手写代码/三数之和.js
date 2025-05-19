// 方法思路
// ​排序数组：首先将数组排序，这样可以利用双指针的技巧来寻找三元组。
// ​固定第一个元素：遍历数组，将当前元素作为三元组的第一个元素。
// ​双指针寻找剩余两个元素：对于每一个固定的第一个元素，使用双指针法在剩余部分寻找两个元素，使得三者的和为0。
// ​跳过重复元素：在处理过程中，需要跳过重复的元素以避免重复的三元组。

function threeSum(nums) {
    const result = [];
    // 先对数组进行排序
    nums.sort((a, b) => a - b);
    // 遍历数组，固定第一个元素
    for (let i = 0; i < nums.length - 2; i++) {
        // 跳过重复的第一个元素
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        let left = i + 1;
        let right = nums.length - 1;
        // 使用双指针寻找剩下的两个元素
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                // 跳过重复的left元素
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                // 跳过重复的right元素
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                // 移动指针寻找下一个可能的组合
                left++;
                right--;
            } else if (sum < 0) {
                // 和太小，左指针右移
                left++;
            } else {
                // 和太大，右指针左移
                right--;
            }
        }
    }
    return result;
}


function threeSum(nums) {
    let result = [];
    nums.sort((a, b) => (a - b));
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;
        while (sum === 0)
        if ( i > 0 && nums[i] === nums[i -1] ) {
            continue;
        }
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push(nums[i], nums[left], nums[right])
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;    
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}