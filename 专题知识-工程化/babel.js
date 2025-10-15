// babel转化箭头函数插件babel-plugin-transform-arrow-functions
import babel from '@babel/core'

const result = babel.transformFileSync('./test.js', {
  presets: ['@babel/preset-env'],
  plugins: ['babel-plugin-transform-arrow-functions']
})
console.log(result)
console.log(result.code)

// 转化后的代码
// const add = (a, b) => a + b
// const add = function (a, b) {
//   return a + b
// }   

