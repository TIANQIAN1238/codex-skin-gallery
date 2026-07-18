import { ArrowLeft, Check, Download, Monitor, ShieldCheck, Sparkles } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { LocalizedLink as Link } from '../components/LocalizedLink'
import { PageMeta } from '../components/PageMeta'
import { SkinGrid } from '../components/SkinGrid'
import { getRelatedSkins, getSkin } from '../lib/catalog'
import { useLocale } from '../lib/i18n'

export function SkinDetailPage() {
  const { isZh } = useLocale()
  const { skinId } = useParams()
  const skin = getSkin(skinId)
  if (!skin) return <div className="simple-empty page-container"><h1>{isZh ? '皮肤不存在' : 'Skin not found'}</h1><Link to="/skins">{isZh ? '返回皮肤广场' : 'Back to gallery'}</Link></div>
  const related = getRelatedSkins(skin)
  const category = isZh ? skin.category : ({ '动漫': 'Anime', '国风': 'Chinese', '明星': 'Celebrity', '游戏': 'Gaming', '治愈': 'Cozy', '科幻': 'Sci-fi', '极简': 'Minimal' }[skin.category] ?? skin.category)
  const description = isZh ? skin.description : `A free ${category.toLowerCase()} Codex skin with a complete community-made visual treatment, ready for guided installation and recovery.`
  const c = isZh ? { back: '返回皮肤广场', free: '免费', preview: '真实预览 / 上游素材', systems: '适用系统', method: '安装方式', auto: 'Codex 自动安装', status: '验证状态', type: '类型', install: '一键安装这套皮肤', trust: '安装任务会要求保留恢复入口，并禁止修改 API Key、模型和项目文件。', related: '类似风格' } : { back: 'Back to gallery', free: 'Free', preview: 'Real preview / upstream asset', systems: 'Supported systems', method: 'Install method', auto: 'Guided by Codex', status: 'Verification', type: 'Type', install: 'One-click install', trust: 'The install task requires a recovery path and never changes API keys, models, or project files.', related: 'More like this' }

  return (
    <>
      <PageMeta title={isZh ? skin.name : skin.englishName || skin.name} description={description} image={skin.image} />
      <article className="detail-page page-container">
        <Link className="back-link" to="/skins"><ArrowLeft size={16} />{c.back}</Link>
        <div className="detail-grid-v2">
          <div className="detail-preview"><img src={skin.image} alt={`${skin.name} Codex skin preview`} /><span>{c.preview}</span></div>
          <div className="detail-copy">
            <div className="detail-label"><Sparkles size={14} />{category} · {c.free}</div><h1>{isZh ? skin.name : skin.englishName || skin.name}</h1><p className="detail-english">{isZh ? skin.englishName : skin.engine}</p><p className="detail-description">{description}</p>
            <div className="detail-meta"><div><small>{c.systems}</small><strong><Monitor size={15} />{skin.platforms.join(' / ')}</strong></div><div><small>{c.method}</small><strong><WandLabel />{c.auto}</strong></div><div><small>{c.status}</small><strong><Check size={15} />{isZh ? skin.verified : 'Reviewed'}</strong></div><div><small>{c.type}</small><strong>{isZh ? skin.kind : 'Complete skin'}</strong></div></div>
            <Link className="detail-install cta-shimmer" to={`/install/${skin.id}`}><Download size={19} />{c.install}<span>{c.free}</span></Link><div className="detail-trust"><ShieldCheck size={17} /><span>{c.trust}</span></div>{isZh && <p className="detail-note">{skin.note}</p>}
          </div>
        </div>
      </article>
      <section className="related-section page-container"><div className="section-title-row"><div><span className="eyebrow-v2">YOU MAY ALSO LIKE</span><h2>{c.related}</h2></div></div><SkinGrid skins={related} /></section>
    </>
  )
}

function WandLabel() {
  return <Sparkles size={15} />
}
