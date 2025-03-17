const deepClone = (() => {
    const map = new WeakMap(); // ① 使用闭包共享单例
  
    return function(obj) {
      if (map.has(obj)) return map.get(obj); // ②
  
      if (typeof obj !== 'object' || obj === null) {
        return obj; // ③ 基础类型直接返回
      }
  
      const clone = Array.isArray(obj) ? [] : {}; // ④
      map.set(obj, clone); // ⑤ 记录原对象→克隆体
  
      Object.keys(obj).forEach(key => { // ⑥
        clone[key] = deepClone(obj[key]); // ⑦ 递归克隆
      });
  
      return clone;
    };
  })();
  
  // 测试循环引用
  const circular = { a: 1 };
  circular.self = circular;
  console.log(deepClone(circular)); // { a: 1, self: { a: 1, self: [Circular] } }


//   const deepClone = (() => {
//       const map = new WeakMap();
//       return function(obj) {
//           if (map.has(obj)) return map.get(obj);

//           if (typeof obj !== 'object' || obj === null) {
//               return obj;
//           }

//           const clone = Array.isArray(obj) ? [] : {};
//           map.set(obj, clone);

//           Object.key(obj).forEach((key) => {
//             clone[key] = deepClone(obj[key]);
//           })

//           return clone;
//       }
//   })