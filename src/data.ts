export type SkinCategory = '动漫' | '国风' | '明星' | '游戏' | '治愈' | '科幻' | '极简'

export type Skin = {
  id: string
  name: string
  englishName: string
  author: string
  engine: string
  image: string
  repository: string
  themeId: string
  downloadUrl?: string
  platforms: Array<'macOS' | 'Windows'>
  category: SkinCategory
  tone: '暗色' | '明亮' | '彩色'
  verified: string
  kind: '完整皮肤' | '背景主题'
  featured?: boolean
  description: string
  note: string
}

const raw = (repo: string, path: string, branch = 'main') =>
  `https://raw.githubusercontent.com/${repo}/${branch}/${path}`

const wangRepo = 'https://github.com/Wangnov/awesome-codex-skins'
const wangV101 = new Set([
  'caishen-jubao', 'celestial-court', 'emilia-rezero', 'hancock-onepiece',
  'journey-to-west', 'kakashi-naruto', 'luffy-onepiece', 'mai-shiranui',
  'ming-imperial', 'three-kingdoms', 'underworld-yama', 'western-pure-land',
])

const wangThemes: Array<[string, string, string, SkinCategory, Skin['tone']]> = [
  ['asuka-eva02', '明日香 · EVA 02', 'Asuka EVA-02', '动漫', '暗色'],
  ['caishen-jubao', '财神聚宝', 'Fortune Vault', '国风', '彩色'],
  ['celestial-court', '天庭云宫', 'Celestial Court', '国风', '明亮'],
  ['dilraba-starlight', '迪丽热巴 · 星光', 'Starlight', '明星', '暗色'],
  ['elon-mars-protocol', '火星协议', 'Mars Protocol', '科幻', '暗色'],
  ['emilia-rezero', '爱蜜莉雅 · 冰晶', 'Emilia Re:Zero', '动漫', '明亮'],
  ['guts-terminal', '格斯终端', 'Guts Terminal', '动漫', '暗色'],
  ['hancock-onepiece', '女帝 · 海上王座', 'Pirate Empress', '动漫', '彩色'],
  ['jay-chou-inkstone-rhapsody', '周杰伦 · 墨韵狂想', 'Inkstone Rhapsody', '明星', '暗色'],
  ['jensen-infinite-compute', '无限算力', 'Infinite Compute', '科幻', '暗色'],
  ['jj-lin-soulwave-sanctuary', '林俊杰 · 声浪圣所', 'Soulwave Sanctuary', '明星', '暗色'],
  ['journey-to-west', '西游取经', 'Journey to the West', '国风', '彩色'],
  ['kakashi-naruto', '卡卡西 · 雷切', 'Kakashi Raikiri', '动漫', '暗色'],
  ['kaworu-mark06', '渚薰 · Mark 06', 'Kaworu Mark-06', '动漫', '暗色'],
  ['kun-afterglow', '落日余晖', 'Afterglow Court', '明星', '彩色'],
  ['luffy-onepiece', '路飞 · 伟大航路', 'Grand Line', '动漫', '彩色'],
  ['mai-shiranui', '不知火舞', 'Mai Shiranui', '游戏', '彩色'],
  ['ming-imperial', '大明帝国', 'Ming Imperial', '国风', '暗色'],
  ['rei-eva00', '绫波零 · EVA 00', 'Rei EVA-00', '动漫', '明亮'],
  ['rem-rezero', '蕾姆 · 鬼族之蓝', 'Rem Re:Zero', '动漫', '彩色'],
  ['san-tibo', '圣域金辉', 'Golden Sanctuary', '动漫', '暗色'],
  ['shinji-eva01', '碇真嗣 · EVA 01', 'Shinji EVA-01', '动漫', '暗色'],
  ['three-kingdoms', '三国群英', 'Three Kingdoms', '国风', '暗色'],
  ['trump-golden-order', '黄金秩序', 'Golden Order', '科幻', '彩色'],
  ['underworld-yama', '幽冥阎罗', 'Underworld Yama', '国风', '暗色'],
  ['western-pure-land', '西方净土', 'Western Pure Land', '国风', '明亮'],
]

const wangSkins: Skin[] = wangThemes.map(([id, name, englishName, category, tone], index) => {
  const version = wangV101.has(id) ? '1.0.1' : '1.0.0'
  return {
    id: `codexskin-${id}`,
    name,
    englishName,
    author: 'CodexSkins 社区',
    engine: '.codexskin',
    image: raw('Wangnov/awesome-codex-skins', `skins/${id}/previews/home.webp`),
    repository: wangRepo,
    themeId: id,
    downloadUrl: `${wangRepo}/releases/download/skins-v1.1.0/${id}-${version}.codexskin`,
    platforms: ['macOS'],
    category,
    tone,
    verified: '真实运行截图',
    kind: '完整皮肤',
    featured: index < 4,
    description: '组件级 Codex 主题，包含背景、卡片、图标和界面配色，可通过主题管理器切换并还原。',
    note: '人物、角色和品牌素材的使用范围请以原作者说明为准。',
  }
})

const heigeRepo = 'https://github.com/HeiGeAi/heige-codex-skin-studio'
const heigeSkill = `${heigeRepo}/releases/download/v5.2.2/heige-codex-skin-studio.skill`
const heigeThemes: Array<[string, string, string, string, SkinCategory, Skin['tone']]> = [
  ['miku-488137', '初音未来工作室', 'Miku Studio', 'assets/previews/miku-studio.webp', '动漫', '明亮'],
  ['genshin-dawn', '提瓦特晨曦', 'Teyvat Dawn', 'assets/previews/genshin-impact-codex-ui-1.webp', '游戏', '明亮'],
  ['genshin-night', '提瓦特夜色', 'Teyvat Night', 'assets/previews/genshin-impact-codex-ui-2.webp', '游戏', '暗色'],
  ['wuthering-echo', '鸣潮回声', 'Wuthering Echo', 'assets/previews/wuthering-waves-codex-ui-1.webp', '游戏', '明亮'],
  ['wuthering-tide', '鸣潮深海', 'Wuthering Tide', 'assets/previews/wuthering-waves-codex-ui-2.webp', '游戏', '暗色'],
  ['naruto-hokage', '火影 · 木叶暖阳', 'Hokage', 'assets/previews/naruto-codex-ui-1.webp', '动漫', '彩色'],
  ['naruto-sasuke', '佐助 · 雷鸣暗夜', 'Sasuke Night', 'assets/previews/naruto-codex-ui-2.webp', '动漫', '暗色'],
  ['deepspace-dawn', '深空晨光', 'Deepspace Dawn', 'assets/previews/love-and-deepspace-codex-ui-1.webp', '游戏', '明亮'],
  ['deepspace-star', '深空星夜', 'Deepspace Star', 'assets/previews/love-and-deepspace-codex-ui-2.webp', '游戏', '暗色'],
  ['dalao-dianyan', '大佬 · 点烟', 'Boss Mode', 'docs/images/dalao-live.jpg', '明星', '暗色'],
]

const heigeSkins: Skin[] = heigeThemes.map(([id, name, englishName, image, category, tone]) => ({
  id: `heige-${id}`,
  name,
  englishName,
  author: 'HeiGe Skin Studio',
  engine: 'HeiGe Skin Studio',
  image: raw('HeiGeAi/heige-codex-skin-studio', image),
  repository: heigeRepo,
  themeId: id,
  downloadUrl: heigeSkill,
  platforms: ['macOS', 'Windows'],
  category,
  tone,
  verified: 'macOS 已验证',
  kind: '完整皮肤',
  description: '一张图片构成完整工作氛围，安装工具后可以在 Codex 顶部菜单中随时切换。',
  note: 'Windows 版本仍有部分安装环境等待更多真机验证。',
}))

const roperRepo = 'https://github.com/RoperYoung/chatgpt-codex-skin-switcher'
const roperDmg = `${roperRepo}/releases/download/v1.0.6/ChatGPT-Skin-Switcher-1.0.6-build7-notarized.dmg`
const roperThemes: Array<[string, string, string, SkinCategory, Skin['tone']]> = [
  ['one-piece-grand-line', '海贼王 · 伟大航路', 'Grand Line', '动漫', '彩色'],
  ['naruto-konoha-dusk', '火影忍者 · 木叶黄昏', 'Konoha Dusk', '动漫', '彩色'],
  ['arina-rose-dawn', '玫瑰晨光', 'Rose Dawn', '明星', '明亮'],
  ['zhang-wei-law-office', '律政名场面', 'Law Office', '明星', '明亮'],
  ['messi-blue-gold-night', '蓝金之夜', 'Blue Gold Night', '明星', '暗色'],
  ['dongbei-yujie-winter-yard', '冬日小院', 'Winter Yard', '治愈', '明亮'],
  ['yiyangqianxi-sage-crane', '清透鼠尾草', 'Sage Crane', '明星', '明亮'],
  ['yua-mikami-cherry-glow', '樱光花园', 'Cherry Glow', '明星', '明亮'],
]

const roperSkins: Skin[] = roperThemes.map(([id, name, englishName, category, tone]) => ({
  id: `switcher-${id}`,
  name,
  englishName,
  author: 'ChatGPT Skin Switcher',
  engine: 'ChatGPT Skin Switcher',
  image: raw('RoperYoung/chatgpt-codex-skin-switcher', `themes/${id}/preview.jpg`),
  repository: roperRepo,
  themeId: id,
  downloadUrl: roperDmg,
  platforms: ['macOS'],
  category,
  tone,
  verified: 'macOS 公证应用',
  kind: '背景主题',
  description: '通过原生菜单栏应用切换，可分别调整 Codex 和 ChatGPT 的背景、缩放、透明度与遮罩。',
  note: '主题中的人物与品牌元素不自动包含在开源许可中。',
}))

const packRepo = 'https://github.com/ChannelerH/codex-skin-packs'
const packThemes: Array<[string, string, string, SkinCategory, Skin['tone']]> = [
  ['caishen-lite', '财神轻享版', 'Caishen Lite', '国风', '明亮'],
  ['caishen-max', '财神聚宝 Max', 'Caishen Max', '国风', '彩色'],
  ['caishen-readable', '财神阅读版', 'Caishen Readable', '国风', '明亮'],
  ['export-night', '出海之夜', 'Export Night', '科幻', '暗色'],
  ['global-founder-bright', '全球创业者', 'Global Founder', '极简', '明亮'],
  ['mythic-guardian-noir', '神话守卫 · 黑金', 'Mythic Guardian', '国风', '暗色'],
]

const packSkins: Skin[] = packThemes.map(([id, name, englishName, category, tone]) => ({
  id: `pack-${id}`,
  name,
  englishName,
  author: 'ChannelerH',
  engine: 'Dream Skin Pack',
  image: raw('ChannelerH/codex-skin-packs', `packs/${id}/background.png`),
  repository: packRepo,
  themeId: id,
  downloadUrl: `${packRepo}/releases/download/v0.1.0/${id}.zip`,
  platforms: ['macOS', 'Windows'],
  category,
  tone,
  verified: '公开素材包',
  kind: '背景主题',
  description: '只包含公开安全的背景素材和 theme.json，可交给 Codex 自动导入到现有 Dream Skin 环境。',
  note: '这是主题包，需要由 Codex 帮你安装或导入到兼容工具。',
}))

const extras: Skin[] = [
  {
    id: 'dream-gothic-void', name: '哥特虚空远征', englishName: 'Gothic Void Crusade',
    author: 'seansong-ideogram', engine: 'Codex Dream Skin',
    image: raw('Fei-Away/Codex-Dream-Skin', 'docs/images/presets/gothic-void-crusade-preview.jpg'),
    repository: 'https://github.com/Fei-Away/Codex-Dream-Skin', themeId: 'preset-gothic-void-crusade',
    platforms: ['macOS', 'Windows'], category: '科幻', tone: '暗色', verified: 'macOS 已验证', kind: '完整皮肤', featured: true,
    description: '低饱和哥特科幻氛围，保留 Codex 原生侧栏、卡片和输入框交互。',
    note: '安装过程会重启 Codex，但可以随时恢复官方外观。',
  },
  {
    id: 'dream-arina', name: '暖调人像', englishName: 'Warm Portrait',
    author: 'Dream Skin 社区', engine: 'Codex Dream Skin',
    image: raw('Fei-Away/Codex-Dream-Skin', 'docs/images/presets/arina-hashimoto-light.jpg'),
    repository: 'https://github.com/Fei-Away/Codex-Dream-Skin', themeId: 'preset-arina-hashimoto',
    platforms: ['macOS', 'Windows'], category: '明星', tone: '明亮', verified: 'macOS 已验证', kind: '背景主题',
    description: '柔和暖色的人像主题，拥有浅色和暗色两套真实运行效果。',
    note: '涉及人物素材，适合个人桌面使用；公开再分发前请确认权利。',
  },
  {
    id: 'lab-moon-spirit', name: '月影灵编', englishName: 'Moon Spirit',
    author: 'Codex Skin Lab', engine: 'Codex Skin Lab',
    image: raw('fantuan-lab/codex-skin-market', 'docs/images/moon-spirit-codex-workspace-preview.png'),
    repository: 'https://github.com/fantuan-lab/codex-skin-market', themeId: 'moon-spirit',
    downloadUrl: 'https://github.com/fantuan-lab/codex-skin-market/releases/tag/v0.1.0-beta.1',
    platforms: ['macOS', 'Windows'], category: '治愈', tone: '暗色', verified: '双平台 Beta', kind: '完整皮肤',
    description: '月光、森林和蓝紫色调组成的沉浸式工作空间，提供普通用户安装包。',
    note: '安装包仍处于 Beta 阶段，暂未完成正式发行签名。',
  },
  {
    id: 'lab-bamboo-panda', name: '竹影熊猫', englishName: 'Bamboo Panda',
    author: 'Codex Skin Lab', engine: 'Codex Skin Lab',
    image: raw('fantuan-lab/codex-skin-market', 'docs/images/bamboo-panda-codex-workspace-preview.jpg'),
    repository: 'https://github.com/fantuan-lab/codex-skin-market', themeId: 'bamboo-panda',
    downloadUrl: 'https://github.com/fantuan-lab/codex-skin-market/releases/tag/bamboo-panda-v0.1.0-beta.1',
    platforms: ['macOS', 'Windows'], category: '治愈', tone: '明亮', verified: '双平台 Beta', kind: '完整皮肤',
    description: '竹林绿意与熊猫角色构成的舒缓主题，安装、验证和恢复入口清晰。',
    note: '安装包仍处于 Beta 阶段，下载时请选择对应平台而不是源码压缩包。',
  },
]

export const skins: Skin[] = [...extras, ...wangSkins, ...heigeSkins, ...roperSkins, ...packSkins]

export const installPrompt = (skin: Skin) => `请帮我把 Codex 客户端换成「${skin.name}」皮肤。

皮肤信息：
- 主题 ID：${skin.themeId}
- 官方项目：${skin.repository}
${skin.downloadUrl ? `- 安装包：${skin.downloadUrl}\n` : ''}
请严格按下面步骤操作：
1. 先读取项目的 README 和安装说明，自动识别我使用的是 macOS 还是 Windows。
2. 安装并应用「${skin.name}」，不要修改 Codex 的 API Key、Base URL、模型供应商或项目文件。
3. 如果过程需要退出或重启 Codex，先提醒我保存当前任务。
4. 安装后验证皮肤确实生效，并告诉我以后如何一键恢复官方外观。
5. 如果当前系统不受支持、下载内容与说明不一致或素材来源有风险，请停止安装并直接告诉我原因。

现在开始处理，不要只给我教程；请直接完成能够安全自动完成的步骤。`

export const categories = ['全部', '热门', '动漫', '国风', '明星', '游戏', '治愈', '科幻', '极简', 'macOS', 'Windows'] as const
