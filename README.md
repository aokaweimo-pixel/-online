# 教程站

基于 [VitePress](https://vitepress.dev/zh/) 的纯静态教程分享站。内容以 Markdown 编写，推送到 GitHub 后由 GitHub Actions 自动构建并发布到 GitHub Pages。

- 线上地址：https://aokaweimo-pixel.github.io/-online/
- 仓库地址：https://github.com/aokaweimo-pixel/-online

## 本地开发

```bash
npm install
npm run docs:dev      # 本地预览，默认 http://localhost:5173
npm run docs:build    # 构建到 docs/.vitepress/dist
npm run docs:preview  # 预览构建结果
```

## 新增一篇教程

1. 在 `docs/guide/` 下新建 `.md` 文件，例如 `docs/guide/my-topic.md`
2. 在 `docs/.vitepress/config.mts` 的 `sidebar` 中登记，即可出现在侧边栏
3. 本地 `npm run docs:dev` 预览，确认无误后提交推送

> 文件路径即网址：`docs/guide/my-topic.md` 对应 `/guide/my-topic`。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并部署到 GitHub Pages。

- 部署地址前缀由 `docs/.vitepress/config.mts` 的 `base` 控制，当前为 `/-online/`（仓库名）。
- 若以后绑定独立域名，把 `base` 改回 `/` 即可。
- 仓库的 **Settings → Pages → Build and deployment → Source** 需设为 **GitHub Actions**。