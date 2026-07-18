# Skindex — Codex 皮肤图鉴

一个免费、开源的 Codex Desktop 社区皮肤聚合站。它不售卖皮肤，重点解决三件事：

- 发现好看的社区皮肤，并给原创作者和上游项目清晰署名。
- 区分“效果图”“真实截图”和“可安装主题”。
- 把不同安装引擎统一成“复制任务 → 打开 Codex → 粘贴发送”的小白流程。

当前已经聚合 125+ 套皮肤，来源包括 `.codexskin`、Codex Dream Skin、Codex 原生外观主题、Get Codex Theme、Awesome Codex Themes、ThemeScape Studio、HeiGe Skin Studio、ChatGPT Skin Switcher、Codex Skin Lab 和公开主题包。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物位于 `dist/`，可以部署到 Vercel、Netlify、Cloudflare Pages 或任意静态站点服务。

## 数据维护

数据位于 `src/data.ts`。每个条目包含作者、来源、预览图、安装入口、适用平台、验证状态和素材风险提示。技术来源只用于生成安全安装任务，普通用户界面不会展示源码入口。

## 投稿接口

Vercel 部署时，`api/submit.ts` 会把站内投稿写入一个建议设为私有的 GitHub 仓库，避免投稿者联系方式公开。

配置以下环境变量：

```bash
GITHUB_SUBMISSION_TOKEN=github_pat_xxx
SUBMISSION_REPOSITORY=your-account/private-skin-submissions
```

Token 只需要对投稿仓库创建 Issue 的最小权限。

## 持续发现

`scripts/discover-skins.mjs` 会搜索 GitHub 上近期更新的 Codex skin/theme 项目，并把候选项目写入 `data/discovered-projects.json`。GitHub Actions 每天自动运行一次，新的候选项目经过预览图、安装方式和素材权利审核后再加入正式目录。

## 收录原则

1. 可以免费获取。
2. 有明确的作者和来源链接。
3. 有可理解的安装与恢复说明。
4. 不把概念图误写成可直接安装的主题。
5. 开源代码许可证与视觉素材授权分别标注。

## 声明

本项目非 OpenAI 官方项目。Codex 名称及相关权利归其权利人所有。第三方皮肤、人物、IP、字体与图片的许可状态以各自上游项目说明为准。
