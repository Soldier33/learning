如果version1 > version2 返回1，如果 version1 < version2 返回-1，不然返回0.

输入的version字符串非空，只包含数字和字符.。.字符不代表通常意义上的小数点，只是用来区分数字序列。例如字符串2.5并不代表二点五，只是代表版本是第一级版本号是2，第二级版本号是5.

给出js答案


function compareVersion(version1, version2) {
    // 将版本号字符串分割成数组
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    
    // 获取最长的数组长度
    const maxLength = Math.max(v1.length, v2.length);
    
    // 逐个比较版本号
    for (let i = 0; i < maxLength; i++) {
        // 获取当前位置的版本号，如果不存在则默认为0
        const num1 = parseInt(v1[i] || 0);
        const num2 = parseInt(v2[i] || 0);
        
        if (num1 > num2) {
            return 1;
        }
        if (num1 < num2) {
            return -1;
        }
    }
    
    // 如果所有数字都相等，返回0
    return 0;
}


function compareVersion(version1, version2) {
    const v1 = version1.split('.');
    const v2 = version2.split('.');

    const maxLength = Math.max(v1.length, v2.length);
    for (let i = 0; i < maxLength; i++) {
        let a = parseInt(v1[i] || 0);
        let b = parseInt(v2[i] || 0);
        if (a < b) return -1;
        if (a > b) return 1;
    }
    return 0
}