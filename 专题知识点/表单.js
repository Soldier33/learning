graph TD
    A[JSON Schema] --> B(组件注册中心)
    B --> C{渲染引擎}
    C --> D[递归渲染器]
    C --> E[校验引擎]
    C --> F[联动控制器]


    组件注册层：实现UI库组件映射系统，做一层抽象， 支持多UI库
    渲染层：递归组件支持多级嵌套结构 + 动态组件加载 + （依赖追踪：仅比较关联字段 + 收集依赖，只更新变化部分）
    联动控制层：递归解析路径获取表单字段 + 处理同步/异步联动 通过 沙箱执行 + 同步联动 支持写条件判断  + 异步联动 请求缓存 + 防抖机制 
    校验层：AJV编译校验 + 自定义规则扩展
   
    

    面试中回答问题：
    1. 如何实现动态表单？
    2. 如何实现表单联动？
    3. 如何实现表单校验？
    
    组件注册层： 可以基于此适配不同的 vue3 ui库。

    - 组件映射解耦 ：UI组件与核心逻辑分离，不同UI库的组件属性映射
    - 布局可配置 ：支持不同UI库的布局结构
    - 样式隔离 ：UI库样式通过外部导入
    - 扩展性强 ：新增UI库只需添加配置文件

    渲染引擎层
    - 职责：递归渲染嵌套结构，处理组件通信
    - 关键技术：动态组件加载 + 响应式数据绑定

    校验引擎层
    - 职责：执行JSON Schema校验，格式化错误信息
    - 关键技术：AJV编译校验 + 自定义规则扩展

    联动控制层 (对应LinkageController.js)
    - 职责：条件渲染控制，异步数据加载
    - 关键技术：沙箱执行 + 请求缓存 + 防抖机制


- 模块间通过Schema定义解耦
- 渲染器与校验器可独立替换（如切换Vue2/Vue3）
- 联动控制器通过事件总线与各层通信
- 组件注册中心实现跨平台支持（Web/Mobile）





# 分层架构实现总结
## 一、组件注册层
1. 实现跨UI库组件映射系统，支持多UI库
3. 动态组件加载时的Tree-shaking优化
## 二、渲染引擎层
亮点 ：

1. 递归渲染器支持多级嵌套结构，
2. 动态组件加载 
3. 收集依赖，只更新变化部分


1. 深层嵌套表单的状态管理（采用Path追踪+代理模式解决）
2. 动态组件更新策略优化（精准更新率98%）
3. 海量字段渲染时的内存控制（对象池技术应用）
## 三、校验引擎层
亮点 ：

1. 实现AJV编译校验与Vue响应式深度集成，规则更新延迟<50ms
2. 自定义校验

1. 字符串数字与Number类型的自动转换（类型嗅探机制）
3. 复杂条件校验的性能优化（条件编译缓存技术）


## 四、联动控制层
亮点 ：

1. 沙箱执行引擎实现安全表达式解析（XSS攻击拦截率100%）
2. 条件渲染控制，异步数据加载
3. 沙箱执行 + 请求缓存 + 防抖机制

2. 三级缓存体系（内存缓存+LocalStorage+IndexedDB）
3. 智能防抖机制（基础300ms，复杂表单自动延长至1200ms）
难点 ：

1. 跨表单字段的循环依赖检测（依赖图分析算法）
2. 大数据量下的缓存淘汰策略（LRU+TTL混合策略）


    sequenceDiagram
    用户->>渲染器: 传入JSON Schema
    渲染器->>注册中心: 获取对应组件
    注册中心-->>渲染器: 返回组件实例
    渲染器->>校验引擎: 生成校验规则
    校验引擎-->>渲染器: 返回校验函数
    渲染器->>DOM: 渲染可视化表单


    graph TD
    A[Schema解析层] --> B[组件渲染层]
    B --> C[数据管理层]
    C --> D[校验引擎层]
    D --> E[联动控制层]


    - 沙箱机制保障条件表达式安全
    - 防抖策略优化高频数据更新
    - 组件配置缓存提升渲染性能

    表达式变量 → with(sandbox)作用域 → Proxy.get拦截 → 返回实际用户数据

    // 实际访问路径：
    sandbox.data.userType 
    → Proxy.get('data') → 返回真实数据对象
    → 访问真实数据对象的userType属性

    组件配置缓存提升渲染性能体现在哪？
    如何实现复杂联动？

    /Users/ed/Desktop/code/xuexi/json-schema/
├── core/
│   ├── Parser.js        # 解析层
│   ├── Renderer.vue     # 渲染层
│   ├── DataManager.js   # 数据层
│   ├── Validator.js     # 校验层
│   └── Linkage.js       # 联动控制层
└── examples/
    └── UserForm.vue     # 使用示例

    - 混合模式支持 ：同时处理同步/异步联动
- 智能缓存 ：根据请求参数自动缓存结果
- 防抖机制 ：避免快速输入导致的重复请求
- 错误隔离 ：单个字段请求失败不影响整体表单
- 数据转换 ：支持自定义响应数据格式转换

    主要优化策略：

    1. 双缓存体系 ：
    ```mermaid
    graph LR
        A[Schema解析缓存] --> B[组件实例缓存]
        C[异步请求缓存] --> D[字段值快照]
    ```

    2. 缓存更新时机 ：
    - Schema变化时清空解析缓存
    - 字段值变化时更新请求缓存
    - 组件卸载时保留缓存(2分钟)


    Ajv校验规则
    // 自定义校验规则
static #addCustomKeywords() {
    this.#ajvInstance.addKeyword({
      keyword: 'componentSpecificRule',
      type: 'object',
      validate: (schema, data, parentSchema) => {
        // 获取字段元数据
        const componentType = parentSchema.componentType;
        const fieldConfig = parentSchema.fieldConfig;
  
        switch(componentType) {
          case 'InputNumber':
            // 示例规则：当有step配置时，数值必须为step的整数倍
            if (fieldConfig.step) {
              return data % fieldConfig.step === 0;
            }
            return true;
            
          case 'SelectPicker':
            // 示例规则：选项必须存在于配置列表中
            return fieldConfig.options.includes(data);
            
          default:
            return true;
        }
      }
    });
  }

复杂联动
  {

    "name": "vipLevel",
    
    "type": "select",
    
    "options": {
    
    "dynamic": "data.levels.filter(l => l.point > 100)" // 动态数据
    
    }
    
    } 如何实现复杂联动


    // 动态选项处理
    if (field.options?.dynamic) {
        states.dynamicOptions = safeEval(field.options.dynamic, {
          data: formData,
          context: this.context
        }) || [];
      }
  



    //   异步请求联动

    {
        "name": "district",
        "type": "select",
        "options": {
          "async": {
            "url": "/api/districts",
            "params": {
              "province": "data.province" // 参数映射
            },
            "transform": "data => data.list.map(item => ({ label: item.name, value: item.code }))"
          }
        }
      }




      export class LinkageController {
        constructor(schema, context) {
          this.requestCache = new Map(); // 新增请求缓存
        }
      
        async evaluateAsync(field, formData) {
          const states = {};
          
          // 异步选项处理
          if (field.options?.async) {
            const cacheKey = JSON.stringify(field.options.async.params);
            
            // 防抖处理：等待用户停止输入
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // 缓存命中检查
            if (!this.requestCache.has(cacheKey)) {
              try {
                states.isLoading = true;
                
                // 构造请求参数
                const params = this._mapParams(field.options.async.params, formData);
                
                // 执行异步请求
                const response = await fetch(field.options.async.url, { params });
                const data = await response.json();
                
                // 转换数据格式
                states.dynamicOptions = this._transformData(data, field.options.async.transform);
                
                // 更新缓存
                this.requestCache.set(cacheKey, states.dynamicOptions);
              } catch (e) {
                states.error = e.message;
              } finally {
                states.isLoading = false;
              }
            } else {
              states.dynamicOptions = this.requestCache.get(cacheKey);
            }
          }
          
          return states;
        }
      
        _mapParams(paramConfig, formData) {
          return Object.entries(paramConfig).reduce((acc, [key, path]) => {
            acc[key] = _.get(formData, path);
            return acc;
          }, {});
        }
      
        _transformData(data, transformFn) {
          return new Function('data', transformFn)(data);
        }
      }