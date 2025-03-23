for (int j = 0; j < i; j++) {
    // 如果当前怪物的属性严格大于之前的怪物
    if (h[j] < h[i] && a[j] < a[i]) {
        dp[i] = max(dp[i], dp[j] + 1);
    }
}

// 更新最大击败数量
cnt = max(dp[i], cnt);
————————————————

            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。
        
原文链接：https://blog.csdn.net/D2510466299/article/details/144176981