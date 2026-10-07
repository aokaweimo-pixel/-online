# 如何写第一篇教程

这篇示例教程演示了从写文件到发布的完整流程，你可以直接照着改。

## 1. 新建 Markdown 文件

在 `docs/guide/` 目录下新建文件，文件名用小写英文和短横线，例如：

```
docs/guide/how-to-install-node.md
```

## 2. 写标题和正文

文件第一行用 `#` 写一级标题：

```markdown
# 如何在 Windows 上安装 Node.js

正文内容……
```

## 3. 常用写法速查

### 二级标题

用 `##` 表示章节，会出现在右侧的「本页目录」里。

### 代码块

用三个反引号包裹，并标注语言，可获得语法高亮：

```js
const greeting = 'Hello, world!'
console.log(greeting)
```

### 行内代码

用单个反引号包裹，例如 `npm run docs:dev`。

### 提示块

::: tip 小技巧
在 VitePress 里可以用 `::: tip` 生成提示框。
:::

::: warning 注意
支持 `tip`、`info`、`warning`、`danger` 四种类型。
:::

### 表格

| 命令 | 作用 |
| --- | --- |
| `npm run docs:dev` | 启动本地预览 |
| `npm run docs:build` | 构建生产版本 |
| `npm run docs:preview` | 预览构建结果 |

## 4. 挂到侧边栏

打开 `docs/.vitepress/config.mts`，在 `sidebar` 中添加：

```ts
sidebar: [
  {
    text: '入门',
    items: [
      { text: '教程总览', link: '/guide/' },
      { text: '如何在 Windows 上安装 Node.js', link: '/guide/how-to-install-node' }
    ]
  }
]
```

## 5. 本地预览

```bash
npm run docs:dev
```

浏览器打开终端里提示的地址（默认 `http://localhost:5173`），边写边看，保存即刷新。

## 6. 发布

```bash
git add .
git commit -m "add: 新教程"
git push
```

推送后托管平台会自动重新构建，几秒到一分钟内线上更新。