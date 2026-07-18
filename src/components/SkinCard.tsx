import { ArrowUpRight, Download, Monitor } from 'lucide-react'
import { LocalizedLink as Link } from './LocalizedLink'
import type { Skin } from '../data'
import { localizeCategory, useLocale } from '../lib/i18n'

type SkinCardProps = {
  skin: Skin
  priority?: boolean
}

export function SkinCard({ skin, priority = false }: SkinCardProps) {
  const { isZh, locale } = useLocale()
  const displayName = isZh ? skin.name : skin.englishName || skin.name
  const displayAuthor = isZh ? skin.author : /[\u4e00-\u9fff]/.test(skin.author) ? skin.engine : skin.author
  return (
    <article className="skin-card-v2">
      <Link className="skin-card-media" to={`/skins/${skin.id}`} aria-label={isZh ? `查看 ${skin.name}` : `View ${skin.englishName || skin.name}`}>
        <img src={skin.image} alt={isZh ? `${skin.name} Codex 皮肤预览` : `${skin.englishName || skin.name} Codex skin preview`} loading={priority ? 'eager' : 'lazy'} />
        <span className="skin-card-free">FREE</span>
        <span className="skin-card-open"><ArrowUpRight size={17} />{isZh ? '查看' : 'View'}</span>
      </Link>
      <div className="skin-card-info">
        <div className="skin-card-meta">
          <span>{localizeCategory(skin.category, locale)}</span>
          <span><Monitor size={12} />{skin.platforms.join(' · ')}</span>
        </div>
        <Link to={`/skins/${skin.id}`}><h3>{displayName}</h3></Link>
        <p>{isZh ? skin.englishName : skin.engine}</p>
        <div className="skin-card-bottom">
          <span>by {displayAuthor}</span>
          <Link className="quick-install" to={`/install/${skin.id}`}><Download size={14} />{isZh ? '一键安装' : 'Install'}</Link>
        </div>
      </div>
    </article>
  )
}
