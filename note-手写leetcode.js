// 一. 简单排序
// 1.1. 冒泡排序

// 1.2. 选择排序: 遍历平方,每次遍历找到最小的值放在最前面

// 1.3. 插入排序 : 遍历，从[1]开始，跟前面的元素进行比较，如果比它小，就位置往前挪 , for + while

// 二. 重要排序
// 2.1. 归并排序 : 递归，二分之一开始递归，分成了很多小的两个区间，将两个区间进行每个比较排好序

// 2.2. 快速排序 : （递归）选中基准，然后分割左右，然后再将元素与基准进行比较，左边元素小于基准，右边元素大于基准

// 2.3. 堆排序

// 2.4. 希尔排序

// 作者：coderwhy
// 链接：https://juejin.cn/post/7208466455879467045

// 1. 选择排序，遍历平方,每次遍历找到最小的值放在最前面
function selectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (i !== minIndex) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

// 2. 插入排序，遍历，从[1]开始，跟前面的元素进行比较，如果比它小，就位置往前挪
function insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        // 如果该元素小于前一个元素，那么前一个元素向后移动，并继续向前比较
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        // 如果该元素大于前一个元素，那么它将放到合适的位置
        arr[j + 1] = current;
    }
    return arr;
}
// 3. 归并排序,（Merge Sort）
// 递归，二分之一开始递归，分成了很多小的两个区间，将两个区间进行每个比较排好序
// 数组做参数，分割数组slice
function mergeSort(arr: number[]): number[] {
    const n = arr.length;
    if (n <= 1) return arr;
    const middle = Math.floor(n / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));
    return merge(left, right)
}

function merge(left: number[], right: number[]):number[] {
    let i = 0, j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++])
        } else {
            result.push(right[j++])
        }
    }

    result.concat(left.slice(i)).concat(right.slice(j));

    return result;
}

// 4. 快递排序，
// （递归）选中基准，然后分割左右，然后再将元素与基准进行比较，左边元素小于基准，右边元素大于基准
// 参数，arr,low,high
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}
function partition(arr, low, high) {
    // 选择基准元素（此处选最后一个元素，实际可优化为随机选择）
    const pivot = arr[high];
    let i = low; // i 指向“小元素区”的末尾

    // 遍历区间 [low, high-1]，将小元素交换到左侧
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换元素
            i++; // 扩展“小元素区”
        }
    }

    // 将基准元素放到正确位置（i 右侧是大元素区）
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i; // 返回基准元素的最终位置
}



//  5. 二分查找 （手写） while + for
function binary(arr, val) {
    if (!arr.length) return -1;
    let low = 0, high = arr.length;
    while (low < high) {
        let mid = Math.floor((high + low) / 2);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                return i;
            }
            else if (arr[i] > val) {
                high = mid - 1;
            } else if (arr[i] < val) {
                low = mid + 1;
            }
        }
    }
}

// 6. 二分插入，遍历，从[1]开始，跟前面的元素比较，只是每次从二分之一开始。 
    // for + while 开始找最小的下标low，for 开始腾挪 ， 然受arr[low]设置
function binaryInsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let low = 0, high = i - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (key < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        // 移动
        for (let j = i; j > low; j--) {
            arr[j] = arr[j - 1];
        }

        arr[low] = key;
    }
    return arr;
}
