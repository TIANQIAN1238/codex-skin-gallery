import { ArrowRight, Check, ImagePlus } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { useLocale } from '../lib/i18n'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

export function SubmitForm() {
  const { isZh } = useLocale()
  const [state, setState] = useState<SubmitState>('idle')
  const c = isZh ? { success: '投稿已收到', successText: '我们会检查安装方式、图片权利和恢复流程，审核后加入皮肤广场。', again: '再投一套', identity: '作品身份', identitySub: '告诉大家这套皮肤叫什么、由谁创作', name: '皮肤名称', namePh: '例如：午夜极光', author: '作者名称', authorPh: '你的昵称或团队名称', contact: '联系方式', private: '仅审核可见', contactPh: '邮箱或社交账号', assets: '预览与安装', assetsSub: '使用真实、公开可访问的作品素材', preview: '预览图地址', previewPh: '粘贴高清预览图直链 https://...', previewHelp: '推荐 16:10 横图，至少 1280px 宽，画面中不要加入无关水印。', install: '安装包或发布地址', installPh: 'GitHub Release、网盘或公开下载页', platform: '支持平台', choose: '请选择', kind: '皮肤类型', full: '完整皮肤', bg: '背景主题', tool: '换肤工具内置主题', story: '作品说明', storySub: '让第一次看到它的人立刻理解亮点', intro: '简单介绍', introPh: '它是什么风格？最特别的细节是什么？用户如何恢复原样？', consent: '我确认这套皮肤可以免费分享，并且有权提交相关图片和素材。', error: '暂时未能提交。部署环境需要先配置投稿接口，请稍后再试。', sending: '正在提交…', submit: '提交审核', privacy: '提交内容不会自动公开。联系方式仅用于审核沟通。' } : { success: 'Submission received', successText: 'We will review installation, image rights, and recovery before publishing it in the gallery.', again: 'Submit another', identity: 'Work identity', identitySub: 'Give the skin a clear name and creator credit', name: 'Skin name', namePh: 'For example: Midnight Aurora', author: 'Creator name', authorPh: 'Your name, handle, or studio', contact: 'Contact', private: 'Review team only', contactPh: 'Email or social profile', assets: 'Preview and install', assetsSub: 'Use real, publicly accessible project assets', preview: 'Preview image URL', previewPh: 'Paste a high-resolution image URL https://...', previewHelp: 'Use a 16:10 landscape image, at least 1280px wide, without unrelated watermarks.', install: 'Installer or release URL', installPh: 'GitHub Release, public drive, or download page', platform: 'Platforms', choose: 'Choose one', kind: 'Skin type', full: 'Complete skin', bg: 'Background theme', tool: 'Theme inside a skin manager', story: 'Project story', storySub: 'Help someone understand the work at a glance', intro: 'Short description', introPh: 'What is the visual direction? What makes it special? How can users restore the original look?', consent: 'I confirm this skin can be shared for free and I have the right to submit these images and assets.', error: 'Submission is not available yet. Configure the production submission endpoint and try again.', sending: 'Submitting…', submit: 'Send for review', privacy: 'Nothing is published automatically. Contact details are visible only to reviewers.' }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('sending')
    const form = event.currentTarget
    try {
      const response = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) })
      if (!response.ok) throw new Error('submit failed')
      form.reset()
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') return <div className="submit-success-v2"><span><Check /></span><h2>{c.success}</h2><p>{c.successText}</p><button className="cta cta-primary" onClick={() => setState('idle')}>{c.again}</button></div>

  return (
    <form className="submit-form-v2" onSubmit={submit}>
      <section className="form-section"><div className="form-section-heading"><span>01</span><div><strong>{c.identity}</strong><small>{c.identitySub}</small></div></div><div className="form-section-fields"><div className="form-grid"><label><span>{c.name} <b>*</b></span><input name="name" required placeholder={c.namePh} /></label><label><span>{c.author} <b>*</b></span><input name="author" required placeholder={c.authorPh} /></label></div><label><span>{c.contact} <small>{c.private}</small></span><input name="contact" required placeholder={c.contactPh} /></label></div></section>
      <section className="form-section"><div className="form-section-heading"><span>02</span><div><strong>{c.assets}</strong><small>{c.assetsSub}</small></div></div><div className="form-section-fields"><label className="preview-url-field"><span>{c.preview} <b>*</b></span><div className="input-with-icon"><ImagePlus size={20} /><input name="previewUrl" type="url" required placeholder={c.previewPh} /></div><small>{c.previewHelp}</small></label><label><span>{c.install} <b>*</b></span><input name="installUrl" type="url" required placeholder={c.installPh} /></label><div className="form-grid"><label><span>{c.platform}</span><select name="platform" required defaultValue=""><option value="" disabled>{c.choose}</option><option>macOS</option><option>Windows</option><option>macOS + Windows</option></select></label><label><span>{c.kind}</span><select name="kind" defaultValue="完整皮肤"><option value="完整皮肤">{c.full}</option><option value="背景主题">{c.bg}</option><option value="换肤工具内置主题">{c.tool}</option></select></label></div></div></section>
      <section className="form-section"><div className="form-section-heading"><span>03</span><div><strong>{c.story}</strong><small>{c.storySub}</small></div></div><div className="form-section-fields"><label><span>{c.intro} <b>*</b></span><textarea name="description" required rows={5} placeholder={c.introPh} /></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" /><label className="form-consent"><input type="checkbox" name="rightsConfirmed" value="yes" required /><span>{c.consent}</span></label></div></section>
      {state === 'error' && <p className="inline-error">{c.error}</p>}<button className="submit-form-button cta-shimmer" disabled={state === 'sending'}>{state === 'sending' ? c.sending : c.submit}<ArrowRight size={17} /></button><p className="form-privacy">{c.privacy}</p>
    </form>
  )
}
