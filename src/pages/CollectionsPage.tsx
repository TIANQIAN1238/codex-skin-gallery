import { ArrowRight } from 'lucide-react'
import { LocalizedLink as Link } from '../components/LocalizedLink'
import { PageMeta } from '../components/PageMeta'
import { collectionSummaries } from '../lib/catalog'
import { categorySlug, useLocale } from '../lib/i18n'

export function CollectionsPage() {
  const { isZh } = useLocale()
  const categoryLabel = (value: string) => isZh ? value : ({ '动漫': 'Anime', '国风': 'Chinese', '明星': 'Celebrity', '游戏': 'Gaming', '治愈': 'Cozy', '科幻': 'Sci-fi', '极简': 'Minimal' }[value] ?? value)
  const c = isZh ? { title: '精选合辑', description: '按风格和心情浏览 Codex 免费皮肤合辑。', h1a: '不想搜索？', h1b: '按心情逛。', intro: '我们把分散的社区皮肤整理成容易选择的风格合辑。', sets: '套' } : { title: 'Curated Collections', description: 'Browse free Codex skin collections by style and mood.', h1a: 'Skip the search.', h1b: 'Follow the mood.', intro: 'Scattered community projects, organized into collections that are effortless to explore.', sets: 'skins' }
  return (
    <>
      <PageMeta title={c.title} description={c.description} /><section className="page-heading page-container"><span className="eyebrow-v2">CURATED COLLECTIONS</span><h1>{c.h1a}<br /><em>{c.h1b}</em></h1><p>{c.intro}</p></section>
      <section className="collections-page page-container">
        {collectionSummaries.map((collection, index) => (
          <Link className="collection-row" to={`/skins?category=${categorySlug(collection.category)}`} key={collection.category} style={{ '--collection-color': collection.color } as React.CSSProperties}>
            <span className="collection-number">0{index + 1}</span>
            <div className="collection-image"><img src={collection.preview} alt="" /></div>
            <div><h2>{categoryLabel(collection.category)}</h2><p>{isZh ? collection.description : `A hand-picked edit of ${categoryLabel(collection.category).toLowerCase()} Codex skins.`}</p></div><strong>{collection.count} {c.sets}</strong><span className="collection-arrow"><ArrowRight /></span>
          </Link>
        ))}
      </section>
    </>
  )
}
