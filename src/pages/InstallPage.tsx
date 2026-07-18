import { Check, Clipboard, Download, ExternalLink, MonitorDown, RotateCcw, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LocalizedLink as Link } from '../components/LocalizedLink'
import { PageMeta } from '../components/PageMeta'
import { installPrompt } from '../data'
import { getSkin } from '../lib/catalog'
import { useLocale } from '../lib/i18n'

type CopyState = 'idle' | 'copied' | 'failed'

export function InstallPage() {
  const { isZh, locale } = useLocale()
  const { skinId } = useParams()
  const skin = getSkin(skinId)
  const [copyState, setCopyState] = useState<CopyState>('idle')

  if (!skin) return <div className="simple-empty page-container"><h1>{isZh ? '皮肤不存在' : 'Skin not found'}</h1><Link to="/skins">{isZh ? '返回皮肤广场' : 'Back to gallery'}</Link></div>
  const prompt = installPrompt(skin, locale)
  const c = isZh ? { title: `安装 ${skin.name}`, description: `用 Codex 自动安装 ${skin.name} 皮肤。`, installing: '正在安装', heading: '复制任务，\n交给 Codex。', intro: '这段任务已经包含皮肤来源、主题 ID、系统判断、验证和恢复要求。你不需要自己看安装文档。', copied: '安装任务已复制', ready: '安装任务已准备好', copiedText: '现在打开 Codex，粘贴并发送即可。', readyText: '点击按钮后会复制到剪贴板。', open: '打开 Codex 继续', copyOpen: '复制并打开 Codex', copyOnly: '只复制安装任务', backup: '下载安装包作为备用', failed: '浏览器无法访问剪贴板，请手动复制：', checklist: 'Codex 会完成这些事', check: '检查环境', checkText: '识别系统和 Codex 安装版本。', apply: '安装并应用', applyText: '按上游说明选择正确安装方式。', verify: '验证效果', verifyText: '确认主题已经在真实界面生效。', recovery: '保留恢复入口', recoveryText: '随时可以回到官方外观。', safety: '禁止修改 API Key、Base URL、模型配置和项目文件。', note: '不喜欢也没关系：安装完成后，Codex 会同时告诉你如何恢复原样。', free: '免费' } : { title: `Install ${skin.englishName || skin.name}`, description: `Install ${skin.englishName || skin.name} with a guided Codex task.`, installing: 'Installing', heading: 'Copy one task.\nLet Codex do the rest.', intro: 'The task already includes the source, theme ID, platform checks, verification, and recovery requirements. You never need to read the raw install guide.', copied: 'Install task copied', ready: 'Your install task is ready', copiedText: 'Open Codex, paste it, and send.', readyText: 'One click copies everything to your clipboard.', open: 'Open Codex to continue', copyOpen: 'Copy and open Codex', copyOnly: 'Copy task only', backup: 'Download the installer as backup', failed: 'Clipboard access failed. Copy the task manually:', checklist: 'What Codex will do', check: 'Check your environment', checkText: 'Detect the operating system and Codex version.', apply: 'Install and apply', applyText: 'Follow the verified upstream instructions.', verify: 'Verify the result', verifyText: 'Confirm the skin is active in the real interface.', recovery: 'Keep a recovery path', recoveryText: 'Return to the official look at any time.', safety: 'Never changes API keys, base URLs, model settings, or project files.', note: 'Changed your mind? Codex will also explain exactly how to restore the original interface.', free: 'Free' }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <>
      <PageMeta title={c.title} description={c.description} />
      <section className="install-page page-container">
        <div className="install-summary">
          <Link className="install-thumb" to={`/skins/${skin.id}`}><img src={skin.image} alt={`${skin.name} 预览`} /></Link>
          <div><span>{c.installing}</span><h1>{isZh ? skin.name : skin.englishName || skin.name}</h1><p>{skin.platforms.join(' / ')} · {isZh ? skin.kind : 'Complete skin'} · {c.free}</p></div>
        </div>
        <div className="install-console">
          <div className="install-console-main">
            <span className="eyebrow-v2">ONE-CLICK INSTALL</span>
            <h2>{c.heading.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h2><p>{c.intro}</p>
            <div className={`copy-status ${copyState}`}>
              <span>{copyState === 'copied' ? <Check /> : <Clipboard />}</span>
              <div><strong>{copyState === 'copied' ? c.copied : c.ready}</strong><p>{copyState === 'copied' ? c.copiedText : c.readyText}</p></div>
            </div>
            <a className="install-open-button cta-shimmer" href="codex://" onClick={copy}><MonitorDown size={20} />{copyState === 'copied' ? c.open : c.copyOpen}<ExternalLink size={15} /></a><button className="install-copy-only" onClick={copy}><Clipboard size={15} />{c.copyOnly}</button>{skin.downloadUrl && <a className="install-download" href={skin.downloadUrl} target="_blank" rel="noreferrer"><Download size={16} />{c.backup}</a>}{copyState === 'failed' && <div className="manual-prompt"><p>{c.failed}</p><textarea readOnly value={prompt} rows={8} /></div>}
          </div>
          <aside className="install-checklist">
            <h3>{c.checklist}</h3><ol><li><span>1</span><div><strong>{c.check}</strong><p>{c.checkText}</p></div></li><li><span>2</span><div><strong>{c.apply}</strong><p>{c.applyText}</p></div></li><li><span>3</span><div><strong>{c.verify}</strong><p>{c.verifyText}</p></div></li><li><span>4</span><div><strong>{c.recovery}</strong><p>{c.recoveryText}</p></div></li></ol><div className="install-safety"><ShieldCheck size={18} /><span>{c.safety}</span></div>
          </aside>
        </div>
        <div className="install-footer-note"><RotateCcw size={16} /><span>{c.note}</span></div>
      </section>
    </>
  )
}
