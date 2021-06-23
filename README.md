# data-visual-screen
大屏可视化适配模板

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

To learn more about umi.js
open [https://umijs.org/zh-CN/docs](https://umijs.org/zh-CN/docs) to view

### 开发配置

#### 文件目录
```
src
├── api   // 请求接口统一配置
│   └── resources
├── assets  // 静态资源
├── components // 公共组件
│   ├── Container
│   ├── Content
│   └── Header
├── hooks // 自定义hooks
├── pages // 路由业务组件
├── services // 服务层
│   └── ajax
└── utils //工具函数目录
```

#### api
api 是资源层，用来放置我们所有的接口配置，在我们配置接口方法时我们只需要关心 resources 文件夹中的配置，利用 map 数据结构去描述，在内部不用关心输出请求函数，因为已经做了方法的统一封装，例如在 test.ts 中的例子中我们可以

```
export const getTestDetail = {
 url: '/api/list',
 method: 'get'
}
```
通过上面的写法，我们就能生成一个请求函数，当然 url 和 method 是必填参数，如果有一些默认参数也可以在此对象中扩充，整个资源我们可以在 index.ts 中统一导出，在 resource 文件夹中可以根据自己的业务模块区分 api 资源，在 resource 下面建立的 ts 文件都会自动导入输出，并不需要在 index.ts 再做任何操作
在业务组件中我们可以统一这样引入

```
import resources from '@/api';
const { getTestDetail } = resources; // 或者直接使用resources.getTestDetail

```
这样我们就完成了请求数据的调用
