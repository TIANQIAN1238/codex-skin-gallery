import { Check, Globe2, ShieldCheck, Sparkles } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { SubmitForm } from '../components/SubmitForm'
import { skins } from '../data'
import { useLocale } from '../lib/i18n'

export function SubmitPage() {
  const { isZh } = useLocale()
  const showcaseSkins = skins.slice(0, 3)
  const c = isZh ? { title: '上传皮肤', description: '向 Skindex 提交免费的 Codex 社区皮肤。', h1a: '让你的皮肤，', h1b: '成为下一张封面。', intro: '上传作品，不是填写工单。给我们真实预览和安装入口，我们负责把它整理成人人都能一键使用的作品页。', p1: '进入全网图鉴', p1s: '获得独立作品页与合辑曝光', p2: '安装体验标准化', p2s: '我们补全平台、安装和恢复流程', p3: '人工审核后公开', p3s: '检查安全性、预览真实性与素材权利', rules: '发布标准', r1: '用户可以免费获取', r2: '预览图与实际效果一致', r3: '提供恢复官方外观的方法', time: '预计填写时间', mins: '2 分钟' } : { title: 'Submit a Skin', description: 'Submit a free Codex community skin to the global Skindex library.', h1a: 'Make your skin', h1b: 'the next cover.', intro: 'Publishing should feel like presenting your work, not filing a ticket. Share the real preview and install source; we turn it into a page anyone can use.', p1: 'Join the global library', p1s: 'Get a dedicated page and collection exposure', p2: 'A polished install flow', p2s: 'We standardize platforms, installation, and recovery', p3: 'Reviewed before launch', p3s: 'We check safety, preview accuracy, and asset rights', rules: 'Publishing standard', r1: 'Free for every user', r2: 'Preview matches the real experience', r3: 'Includes a way back to the official look', time: 'Estimated time', mins: '2 minutes' }

  return (
    <>
      <PageMeta title={c.title} description={c.description} />
      <section className="submit-page page-container">
        <aside className="submit-page-intro"><span className="eyebrow-v2">CREATOR SUBMISSION</span><h1>{c.h1a}<br /><em>{c.h1b}</em></h1><p>{c.intro}</p><div className="submission-art-wall" aria-hidden="true">{showcaseSkins.map((skin, index) => <figure className={`submission-art submission-art-${index + 1}`} key={skin.id}><img src={skin.image} alt="" /><figcaption>{isZh ? skin.name : skin.englishName || skin.name}</figcaption></figure>)}</div><div className="submission-promises"><span><Globe2 /><strong>{c.p1}</strong><small>{c.p1s}</small></span><span><Sparkles /><strong>{c.p2}</strong><small>{c.p2s}</small></span><span><ShieldCheck /><strong>{c.p3}</strong><small>{c.p3s}</small></span></div><div className="submission-rules"><h3>{c.rules}</h3><p><Check />{c.r1}</p><p><Check />{c.r2}</p><p><Check />{c.r3}</p></div></aside><div className="submit-form-shell"><div><span>{c.time}</span><strong>{c.mins}</strong></div><SubmitForm /></div>
      </section>
    </>
  )
}
