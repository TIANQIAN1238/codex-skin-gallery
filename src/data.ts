export type Skin = {
  id: string
  name: string
  englishName: string
  author: string
  engine: string
  image: string
  source: string
  download: string
  tone: string
  palette: string[]
  platforms: string[]
  verified: string
  kind: '真实截图' | '可安装主题' | '概念预览'
  featured?: boolean
  description: string
  note: string
}

const raw = (repo: string, path: string) =>
  `https://raw.githubusercontent.com/${repo}/main/${path}`

export const skins: Skin[] = [
  {
    id: 'gothic-void-crusade',
    name: '哥特虚空远征',
    englishName: 'Gothic Void Crusade',
    author: 'seansong-ideogram × Fei-Away',
    engine: 'Codex Dream Skin',
    image: raw('Fei-Away/Codex-Dream-Skin', 'docs/images/presets/gothic-void-crusade-preview.jpg'),
    source: 'https://github.com/Fei-Away/Codex-Dream-Skin',
    download: 'https://github.com/Fei-Away/Codex-Dream-Skin#快速开始',
    tone: '暗色',
    palette: ['#101214', '#624b3b', '#a69882'],
    platforms: ['macOS', 'Windows'],
    verified: 'macOS 实测',
    kind: '可安装主题',
    featured: true,
    description: '低饱和哥特科幻氛围，保留原生控件可交互性，是 Dream Skin 的默认精选预设。',
    note: 'CDP 本机注入，不修改官方安装包；支持一键恢复。',
  },
  {
    id: 'miku-studio',
    name: '初音未来工作室',
    englishName: 'Miku Studio',
    author: 'HeiGeAi',
    engine: 'HeiGe Skin Studio',
    image: raw('HeiGeAi/heige-codex-skin-studio', 'docs/images/theme-switcher-live.webp'),
    source: 'https://github.com/HeiGeAi/heige-codex-skin-studio',
    download: 'https://github.com/HeiGeAi/heige-codex-skin-studio#快速开始macos',
    tone: '清透',
    palette: ['#93e9e4', '#e9b9e8', '#f5f1ec'],
    platforms: ['macOS', 'Windows'],
    verified: 'macOS 实测',
    kind: '真实截图',
    featured: true,
    description: '轻盈的青粉渐变、角色装饰与主题切换器，内置多套动漫与游戏风格预设。',
    note: '仓库标注 MIT；部分素材授权状态需逐项确认。',
  },
  {
    id: 'asuka-eva02',
    name: '明日香 · EVA 02',
    englishName: 'Asuka EVA-02',
    author: 'Wangnov',
    engine: '.codexskin',
    image: raw('Wangnov/awesome-codex-skins', 'dist-catalog/previews/asuka-eva02.webp'),
    source: 'https://github.com/Wangnov/awesome-codex-skins',
    download: 'https://github.com/Wangnov/awesome-codex-skins/releases/latest',
    tone: '鲜艳',
    palette: ['#cc372c', '#f1c944', '#1b1b1b'],
    platforms: ['macOS'],
    verified: '自动验收',
    kind: '可安装主题',
    featured: true,
    description: '完整的资产型 UI 主题，不止替换背景，还包含图标、卡片、光标与字体配置。',
    note: '提供 .codexskin 包，可试穿、应用与完全还原。',
  },
  {
    id: 'moon-spirit',
    name: '月影灵编',
    englishName: 'Moon Spirit',
    author: 'fantuan-lab',
    engine: 'Codex Skin Lab',
    image: raw('fantuan-lab/codex-skin-market', 'docs/images/moon-spirit-codex-workspace-preview.png'),
    source: 'https://github.com/fantuan-lab/codex-skin-market',
    download: 'https://github.com/fantuan-lab/codex-skin-market/releases/tag/v0.1.0-beta.1',
    tone: '梦幻',
    palette: ['#24365c', '#87a5db', '#e9d6ef'],
    platforms: ['macOS', 'Windows'],
    verified: 'Beta',
    kind: '真实截图',
    description: '月光、森林与灵性蓝紫色调，提供面向普通用户的独立安装包和恢复入口。',
    note: '安装包尚未完成 macOS 公证与 Windows 签名。',
  },
  {
    id: 'bamboo-panda',
    name: '竹影熊猫',
    englishName: 'Bamboo Panda',
    author: 'fantuan-lab',
    engine: 'Codex Skin Lab',
    image: raw('fantuan-lab/codex-skin-market', 'docs/images/bamboo-panda-codex-workspace-preview.jpg'),
    source: 'https://github.com/fantuan-lab/codex-skin-market',
    download: 'https://github.com/fantuan-lab/codex-skin-market/releases/tag/bamboo-panda-v0.1.0-beta.1',
    tone: '自然',
    palette: ['#405f3c', '#a5ba82', '#ece8d4'],
    platforms: ['macOS', 'Windows'],
    verified: 'Beta',
    kind: '可安装主题',
    description: '竹林绿意与熊猫角色构成的舒缓主题，提供安装、验证、恢复三个清晰入口。',
    note: '跨平台 ZIP 分开发布，下载时不要选择源码压缩包。',
  },
  {
    id: 'genshin-night',
    name: '提瓦特夜色',
    englishName: 'Genshin Night',
    author: 'HeiGeAi',
    engine: 'HeiGe Skin Studio',
    image: raw('HeiGeAi/heige-codex-skin-studio', 'docs/images/genshin-night-live.jpg'),
    source: 'https://github.com/HeiGeAi/heige-codex-skin-studio',
    download: 'https://github.com/HeiGeAi/heige-codex-skin-studio',
    tone: '暗色',
    palette: ['#1b2237', '#77668e', '#d6b99d'],
    platforms: ['macOS', 'Windows'],
    verified: 'macOS 实测',
    kind: '真实截图',
    description: '深蓝夜景与角色视觉焦点，自动联动 Codex 深浅色外观。',
    note: 'IP 素材可能受第三方权利限制，公开再分发前需核验。',
  },
  {
    id: 'rei-eva00',
    name: '绫波零 · EVA 00',
    englishName: 'Rei EVA-00',
    author: 'Wangnov',
    engine: '.codexskin',
    image: raw('Wangnov/awesome-codex-skins', 'dist-catalog/previews/rei-eva00.webp'),
    source: 'https://github.com/Wangnov/awesome-codex-skins',
    download: 'https://github.com/Wangnov/awesome-codex-skins/releases/latest',
    tone: '冷调',
    palette: ['#d8e2e9', '#7895ae', '#bd6e69'],
    platforms: ['macOS'],
    verified: '自动验收',
    kind: '可安装主题',
    description: '冰冷工业感与精细组件替换，使用统一的 .codexskin 资产包格式。',
    note: '预览为运行中 Codex 的真实截图。',
  },
  {
    id: 'arina-hashimoto',
    name: '桥本有菜',
    englishName: 'Arina Hashimoto',
    author: 'Fei-Away community',
    engine: 'Codex Dream Skin',
    image: raw('Fei-Away/Codex-Dream-Skin', 'docs/images/presets/arina-hashimoto-light.jpg'),
    source: 'https://github.com/Fei-Away/Codex-Dream-Skin',
    download: 'https://github.com/Fei-Away/Codex-Dream-Skin#桥本有菜--arina-hashimoto',
    tone: '明亮',
    palette: ['#e9dbc7', '#caa68c', '#5e5651'],
    platforms: ['macOS', 'Windows'],
    verified: 'macOS 实测',
    kind: '真实截图',
    description: '柔和暖调的人像主题，同时展示浅色与暗色真实注入效果。',
    note: '涉及人物与素材权利，仅作主题示意；公开使用前需自行确认授权。',
  },
]

export const projects = [
  { name: 'Codex Dream Skin', author: 'Fei-Away', stars: '8.7k', url: 'https://github.com/Fei-Away/Codex-Dream-Skin', trait: '热度最高 · 双平台' },
  { name: 'HeiGe Skin Studio', author: 'HeiGeAi', stars: '220+', url: 'https://github.com/HeiGeAi/heige-codex-skin-studio', trait: '十套预设 · 主题中心' },
  { name: 'awesome-codex-skins', author: 'Wangnov', stars: '新项目', url: 'https://github.com/Wangnov/awesome-codex-skins', trait: '.codexskin 标准 · 深度定制' },
  { name: 'Codex Skin Lab', author: 'fantuan-lab', stars: 'Beta', url: 'https://github.com/fantuan-lab/codex-skin-market', trait: '普通用户安装包 · 双平台' },
  { name: 'Codex Skin Switcher', author: 'bytefer', stars: 'Tauri', url: 'https://github.com/bytefer/codex-skin-switcher', trait: '原生主题管理器' },
]
