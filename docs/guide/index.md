# 教程总览

这里是教程列表。左侧边栏会随教程增多自动扩展。

## 已有教程

- [如何写第一篇教程](./getting-started) —— 从新建文件到本地预览的完整流程
- [好用的工具合集](./lanzou-tools) —— Windows / 手机常用工具，蓝奏云一键下载
- [Codex 部署与中转站配置](./codex-ccswitch) —— 安装 Codex、接入三方中转站，用 CC Switch 一键导入切换

## 如何新增一篇教程

1. 在 `docs/guide/` 下新建一个 `.md` 文件，例如 `docs/guide/my-topic.md`
2. 在文件开头写标题（`# 标题`），正文用 Markdown 编写
3. 在 `docs/.vitepress/config.mts` 的 `sidebar` 里加一行，把它挂到侧边栏
4. 本地执行 `npm run docs:dev` 预览
5. 确认无误后 `git push`，线上会自动更新

> 文件路径即网址。`docs/guide/my-topic.md` 对应的访问地址就是 `/guide/my-topic`。
