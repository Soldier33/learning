// 手写create
function create(proto) {
  if (proto == null) {
    return { __proto__: null}
  }

  function F() {}
  F.prototype = proto;
  return new F();
}

// 手写new
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);

//   如果是对象（包括数组、函数等），直接返回该对象。
// 如果不是对象（如基本类型 number、string），返回新创建的 obj
  return result instanceof Object ? result : obj;
}

// 手写new
var obj= {};
obj.__proto__ = F.prototype;
F.call(obj);

// 手写call
Function.prototype.myCall = function(context, ...args) {
  // 处理 context 为 null 的情况
  context = context || window; 

  // 创建唯一键避免属性冲突
  const fnKey = Symbol('fn');
  context[fnKey] = this; 

  // 调用函数并传递参数（ES6 剩余参数简化代码）
  const result = context[fnKey](...args);

  // 删除临时添加的方法
  delete context[fnKey];

  return result;
};

// 柯里化
function testCurried(fn) {
    function curried(...args1) {
        if (args1.length >= fn.length) {
            return fn.apply(this, args1)
        } else {
            return function(...args2) {
                return curried(this, args1.concat(args2))
            }
        }
    }
    return curried
}

// 节流，一定时间内只触发一次
function throttle(fn, interval) {
    let lastTime = 0;
    const _throttle = function(...args) {
        let nowTime = new Date.getTime();
        let remainTime = interval - (nowTime - lastTime);
        // 立即执行，加上判断 !lastTime
        if (remainTime <= 0) {
            fn.apply(this, args);
            lastTime = nowTime;
        }
    }
    return _throttle;
}

// 防抖
function debounce(fn, deplay) {
    let timer = null;
    const _debounce = function(...args) {
        if (timer) ClearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, deplay);
    }
}

// 数组随机打乱
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

split('').reverse().join('')
structuredClone.split('').reverse().join('')

// 浅拷贝
function shallowCopy(sourObj) {
    if (typeof source !== 'object') return;
    let newObj = sourceObj instanceof Array ? [] : {};
    for(let key in sourceObj) {
        //只复制元素自身的属性，不复制原型链上的
        if(sourceObj.hasOwnProperty(key)) {
            newObj[key] = sourceObj[key]
        }
    }
    return newObj;
}
  
JSON.parse(JSON.stringify(obj))

// 深拷贝（手写）
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


function JLInstanceof(target, origin){
    while(target) {
      if(target.__proto__ === origin.prototype){
        return true;
      }
      target = target.__proto__;
    }
    return false;
}

  function createObject(initialData) {
    const data = initialData;
    return new Proxy(data, {
      set(target, property, value, receiver) {
        if (property === 'set') {
          const keys = property.split('.');
          let obj = target;
          for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]] || (obj[keys[i]] = {});
          }
          obj[keys[keys.length - 1]] = value;
          return true;
        } else {
          return false;
        }
      },
      
    });
  }


// 数组去重 （手写）
// 1. new Set(arr)
// 2. 
//  let newArr = arr.filter((item, index) => {
//      return arr.indexOf(item) === index
//  })

// unshift 最前面添加元素

Array.prototype.myUnshift = function () {
  const len = arguments.length;
  for (let i = len - 1; i >= 0; i--) {
      const elment = arguments[i];
      this.splice(0, 0, element);
  }

  return this.length;
}



// 手写promise.all :https://juejin.cn/post/7139579285055995917
// 否则只要有一个执行错误就reject 
function all(promises) { 
  // 问题关键: 什么时候要执行resolve, 什么时候要执行reject 
  return new Promise((resolve, reject) => { 
      const values = [] 
      promises.forEach(promise => { 
          promise.then(res => { 
              values.push(res) 
              // 如果所有的Promise都正确执行了 
              if (values.length === promises.length) { 
                  resolve(values) 
              } 
          }, err => { 
          // 否则只要有一个执行错误就reject 
              reject(err) 
          }) 
      }) 
   }) 
  }

  

  function any(promises) {
    // resolve必须等到有一个成功的结果
    // reject所有的都失败才执行reject
    const reasons = []
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, err => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons))
          }
        })
      })
    })
  }

  
// 对象扁平化
function JLObjectFlat(obj = ''){
  const res = {};

  function flat(item , preKey = ''){
    Object.entries(item).forEach(([key,value]) => {
      let newKey = key;
      if (Array.isArray(item)){
        newKey = preKey ? `${preKey}[${key}]` : key;
      }else{
        newKey = preKey ? `${preKey}.${key}` : key;
      }
      if (value && typeof value === 'object'){
        flat(value , newKey)
      }else{
        res[newKey] = value;
      }
    })
  }

  flat(obj);
  return res;
}
// eg: 
// {
//   "user.name": "Alice",
//   "user.hobbies[0]": "reading",
//   "user.hobbies[1]": "coding",
//   "user.address.city": "Beijing",
//   "user.address.street": "Xidan",
//   "data[0]": 1,
//   "data[1].id": 2,
//   "data[1].tags[0]": "js",
//   "data[1].tags[1]": "node"
// }