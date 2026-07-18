import { Check, Clipboard, MonitorDown, MousePointerClick, RotateCcw, ShieldCheck } from 'lucide-react'
import { LocalizedLink as Link } from '../components/LocalizedLink'
import { PageMeta } from '../components/PageMeta'
import { useLocale } from '../lib/i18n'

const steps = [
  { icon: MousePointerClick, number: '01', title: '挑一套喜欢的', description: '在皮肤广场搜索、筛选或浏览合辑，进入皮肤详情页。' },
  { icon: Clipboard, number: '02', title: '复制安装任务', description: '点击一键安装。网站会生成针对这套皮肤的完整任务。' },
  { icon: MonitorDown, number: '03', title: '打开 Codex', description: '粘贴任务并发送。Codex 会读取上游说明并自动操作。' },
  { icon: Check, number: '04', title: '验证并完成', description: 'Codex 会检查真实界面是否生效，并给出恢复方法。' },
]

export function GuidePage() {
  const { isZh } = useLocale()
  const localizedSteps = isZh ? steps : [
    { icon: MousePointerClick, number: '01', title: 'Choose a skin', description: 'Search the gallery, browse a collection, and open the skin detail page.' },
    { icon: Clipboard, number: '02', title: 'Copy the task', description: 'One click generates a complete installation task for that exact skin.' },
    { icon: MonitorDown, number: '03', title: 'Open Codex', description: 'Paste and send. Codex reads the verified upstream instructions and takes over.' },
    { icon: Check, number: '04', title: 'Verify and finish', description: 'Codex confirms the real result and gives you a recovery path.' },
  ]
  const c = isZh ? { title: '安装指南', description: '三分钟了解如何使用 Skindex 一键安装 Codex 皮肤。', a: '不用学命令行，', b: '让 Codex 自己装。', intro: '浏览器不能悄悄执行你电脑上的代码，所以我们选择了一条透明、可检查，也足够简单的路径。', simple: '简单，不代表黑盒。', safe: '每段安装任务都会要求 Codex 先阅读真实项目说明、识别平台、检查下载内容，并且禁止修改与你的皮肤无关的配置。', list: ['不修改 API Key 与模型供应商','不修改你的项目文件','安装前提醒保存当前任务','安装后必须提供恢复方法'], task: '给 Codex 的任务', now: '现在就挑一套试试', nowText: '不满意可以随时恢复，换另一套也很简单。', enter: '进入皮肤广场' } : { title: 'Installation Guide', description: 'Learn how to one-click install any Codex skin with Skindex.', a: 'No terminal.', b: 'Let Codex install it.', intro: 'A browser should never execute hidden code on your computer. Our flow stays transparent, inspectable, and genuinely simple.', simple: 'Simple, never opaque.', safe: 'Every task tells Codex to read the real project instructions, detect your platform, inspect downloads, and avoid unrelated settings.', list: ['Never changes API keys or model providers','Never modifies your project files','Reminds you to save current work','Always provides a recovery method'], task: 'Task for Codex', now: 'Choose your first skin', nowText: 'Restore it anytime, or switch to another in a few clicks.', enter: 'Explore the gallery' }
  return (
    <>
      <PageMeta title={c.title} description={c.description} /><section className="page-heading page-container"><span className="eyebrow-v2">INSTALLATION GUIDE</span><h1>{c.a}<br /><em>{c.b}</em></h1><p>{c.intro}</p></section><section className="guide-steps page-container">{localizedSteps.map(({ icon: Icon, number, title, description }) => <article key={number}><span>{number}</span><Icon /><h2>{title}</h2><p>{description}</p></article>)}</section>
      <section className="guide-explainer page-container"><div><ShieldCheck /><span className="eyebrow-v2">WHY IT IS SAFER</span><h2>{c.simple}</h2><p>{c.safe}</p><ul>{c.list.map(item => <li key={item}><Check />{item}</li>)}</ul></div><div className="guide-code-card"><div><i /><i /><i /><span>{c.task}</span></div><pre>{isZh ? <>请帮我把 Codex 客户端换成<br /><strong>「你选择的皮肤」</strong><br /><br />1. 读取真实安装说明<br />2. 自动识别 macOS / Windows<br />3. 安装后验证实际效果<br />4. 保留一键恢复入口</> : <>Install the selected Codex skin.<br /><strong>Use the verified source.</strong><br /><br />1. Read the real install guide<br />2. Detect macOS / Windows<br />3. Verify the result<br />4. Keep a recovery path</>}</pre></div></section><section className="guide-bottom page-container"><RotateCcw /><h2>{c.now}</h2><p>{c.nowText}</p><Link className="cta cta-primary" to="/skins">{c.enter}</Link></section>
    </>
  )
}
