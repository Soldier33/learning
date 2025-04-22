0421

1. 范型工具
Partial 所有属性 可选的意思
Required 所有属性 必选的意思

Pick 提取部份属性
Omit 排除部份属性 并且返回新的类型

Exclude 排除部份属性

Record 约束对象的key以及value
ReturnType 返回函数的类型 获取函数的返回类型，


Readonly    

Record 类型接收了两个泛型参数：第一个参数作为接口类型的属性，第二个参数作为接口类型的属性值。

2. 实现sleep

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 使用示例
async function demo() {
  console.log('开始等待')
  await sleep(2000) // 等待 2 秒
  console.log('等待结束')
}



function legacySleep(ms, callback) {
  setTimeout(callback, ms)
}

// 使用示例（回调地狱）
legacySleep(1000, () => {
  console.log('1秒后执行')
  legacySleep(500, () => {
    console.log('再0.5秒后执行')
  })
})



// 在 Web Worker 中使用
const asyncSleep = (ms: number) => {
  return new Promise(resolve => {
    const channel = new MessageChannel()
    channel.port2.onmessage = () => resolve()
    channel.port1.postMessage(null)
    setTimeout(() => channel.port1.postMessage(null), ms)
  })
}


function* sleepGenerator(ms: number) {
  yield new Promise(resolve => setTimeout(resolve, ms))
}

// 使用示例
const gen = sleepGenerator(1000)
gen.next().value.then(() => {
  console.log('1秒后执行')
})

3. 
Service Worker ：是一种特殊的 Web Worker，它在浏览器和网络之间充当代理服务器的角色。
主要用于实现离线缓存、消息推送和后台同步等功能。


4. babel
通过 core-js 实现 polyfill 注入

预设是多个插件的集合

5. 协作git

6。 WebAssembly

7。 rollup
- 为什么 Vite 开发模式下不需要完整打包？

基于浏览器原生 ESM 和按需编译机制
- 如何理解 Vite 与 Rollup 的关系？

开发阶段：Vite 自主实现模块处理 生产构建：Vite 封装 Rollup 核心流程
- 共享的生命周期钩子有哪些？

```typescript
// 共同支持的钩子示例
interface SharedHooks {
  options: (options: InputOptions) => InputOptions | null
  buildStart: (options: InputOptions) => Promise<void>
  resolveId: (source: string) => string | null
}
 ```
- 如何实现 Vite 插件的 Rollup 兼容？

通过 apply: 'build' 配置限定插件仅在生产构建时生效

开发服务器插件 构建优化插件 HMR 插件 