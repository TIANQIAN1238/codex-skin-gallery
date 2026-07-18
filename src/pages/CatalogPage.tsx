import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageMeta } from '../components/PageMeta'
import { SkinGrid } from '../components/SkinGrid'
import type { SkinCategory } from '../data'
import { filterSkins } from '../lib/catalog'
import { categoryFromSlug, categorySlug, useLocale } from '../lib/i18n'

const categoryOptions: Array<SkinCategory | '全部'> = ['全部', '动漫', '国风', '明星', '游戏', '治愈', '科幻', '极简']
const platformOptions = ['全部平台', 'macOS', 'Windows'] as const
const sortOptions = ['推荐', '最新', '名称'] as const
const sortSlug = (value: (typeof sortOptions)[number]) => ({ '推荐': 'featured', '最新': 'newest', '名称': 'name' }[value])
const sortFromSlug = (value: string | null): (typeof sortOptions)[number] => value === 'newest' ? '最新' : value === 'name' ? '名称' : '推荐'

export function CatalogPage() {
  const { isZh } = useLocale()
  const [params, setParams] = useSearchParams()
  const [visibleCount, setVisibleCount] = useState(16)
  const query = params.get('q') ?? ''
  const deferredQuery = useDeferredValue(query)
  const category = categoryFromSlug(params.get('category')) as SkinCategory | '全部'
  const platform = (params.get('platform') as (typeof platformOptions)[number]) || '全部平台'
  const sort = sortFromSlug(params.get('sort'))

  const updateParam = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(params)
    if (value === defaultValue || !value) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
    setVisibleCount(16)
  }

  const results = useMemo(() => filterSkins({ query: deferredQuery, category, platform, sort }), [deferredQuery, category, platform, sort])
  const hasFilters = Boolean(query) || category !== '全部' || platform !== '全部平台'
  const categoryLabel = (value: string) => isZh ? value : ({ '全部': 'All', '动漫': 'Anime', '国风': 'Chinese', '明星': 'Celebrity', '游戏': 'Gaming', '治愈': 'Cozy', '科幻': 'Sci-fi', '极简': 'Minimal' }[value] ?? value)
  const platformLabel = (value: string) => isZh ? value : value === '全部平台' ? 'All platforms' : value
  const sortLabel = (value: string) => isZh ? value : ({ '推荐': 'Featured', '最新': 'Newest', '名称': 'Name' }[value] ?? value)
  const c = isZh ? { title: '皮肤广场', description: '搜索、筛选并一键安装全部 Codex 社区免费皮肤。', eyebrow: 'THE COMPLETE CATALOG', h1a: '全网 Codex 皮肤，', h1b: '都放进来了。', intro: '从完整 UI 皮肤到轻量背景主题，持续自动发现、人工验证和整理。', filter: '筛选', clear: '清空', style: '风格分类', system: '适用系统', search: '搜索角色、风格、作者…', clearSearch: '清除搜索', sort: '排序', matches: '套匹配皮肤', searching: '正在搜索…', empty: '没有找到这套皮肤', emptyText: '试试角色名称、作者或换一个分类。', all: '查看全部皮肤', more: '继续加载', sets: '套' } : { title: 'Skin Gallery', description: 'Search, filter, and one-click install every free Codex community skin.', eyebrow: 'THE COMPLETE CATALOG', h1a: 'Every Codex skin,', h1b: 'in one place.', intro: 'From complete UI transformations to lightweight backgrounds, continuously discovered, reviewed, and organized.', filter: 'Filters', clear: 'Reset', style: 'Style', system: 'Platform', search: 'Search characters, styles, creators…', clearSearch: 'Clear search', sort: 'Sort', matches: 'matching skins', searching: 'Searching…', empty: 'No skins found', emptyText: 'Try a character, creator, or another category.', all: 'View all skins', more: 'Load', sets: 'more' }

  return (
    <>
      <PageMeta title={c.title} description={c.description} />
      <section className="catalog-hero page-container">
        <span className="eyebrow-v2">{c.eyebrow}</span><h1>{c.h1a}<br /><em>{c.h1b}</em></h1><p>{c.intro}</p>
      </section>
      <section className="catalog-layout page-container">
        <aside className="catalog-sidebar">
          <div className="filter-heading"><SlidersHorizontal size={17} /><strong>{c.filter}</strong>{hasFilters && <button onClick={() => { setParams({}); setVisibleCount(16) }}>{c.clear}</button>}</div>
          <fieldset><legend>{c.style}</legend>{categoryOptions.map((option) => <button className={category === option ? 'selected' : ''} onClick={() => updateParam('category', categorySlug(option), 'all')} key={option}><span>{categoryLabel(option)}</span></button>)}</fieldset>
          <fieldset><legend>{c.system}</legend>{platformOptions.map((option) => <button className={platform === option ? 'selected' : ''} onClick={() => updateParam('platform', option, '全部平台')} key={option}><span>{platformLabel(option)}</span></button>)}</fieldset>
        </aside>
        <div className="catalog-main">
          <div className="catalog-toolbar">
            <label className="catalog-search"><Search size={19} /><input value={query} onChange={(event) => updateParam('q', event.target.value, '')} placeholder={c.search} />{query && <button onClick={() => updateParam('q', '', '')} aria-label={c.clearSearch}><X size={17} /></button>}</label>
            <label className="sort-select"><span>{c.sort}</span><select value={sortSlug(sort)} onChange={(event) => updateParam('sort', event.target.value, 'featured')}>{sortOptions.map((option) => <option value={sortSlug(option)} key={option}>{sortLabel(option)}</option>)}</select></label>
          </div>
          <div className="catalog-result-line"><strong>{results.length}</strong> {c.matches}{deferredQuery !== query && <span>{c.searching}</span>}</div>
          {results.length ? <SkinGrid skins={results.slice(0, visibleCount)} priorityCount={4} /> : <div className="catalog-empty"><Search size={28} /><h2>{c.empty}</h2><p>{c.emptyText}</p><button onClick={() => setParams({})}>{c.all}</button></div>}
          {visibleCount < results.length && <button className="load-more-v2" onClick={() => setVisibleCount((count) => count + 16)}>{c.more} <span>{results.length - visibleCount}</span> {c.sets}</button>}
        </div>
      </section>
    </>
  )
}
