import { useLocation } from 'react-router-dom'

export type Locale = 'en' | 'zh'

export function localizeCategory(value: string, locale: Locale) {
  if (locale === 'zh') return value
  return ({ '全部': 'All', '动漫': 'Anime', '国风': 'Chinese', '明星': 'Celebrity', '游戏': 'Gaming', '治愈': 'Cozy', '科幻': 'Sci-fi', '极简': 'Minimal' }[value] ?? value)
}

const categorySlugs: Record<string, string> = { '全部': 'all', '动漫': 'anime', '国风': 'chinese', '明星': 'celebrity', '游戏': 'gaming', '治愈': 'cozy', '科幻': 'sci-fi', '极简': 'minimal' }

export function categorySlug(value: string) {
  return categorySlugs[value] ?? value
}

export function categoryFromSlug(value: string | null) {
  if (!value) return '全部'
  return Object.entries(categorySlugs).find(([, slug]) => slug === value)?.[0] ?? (categorySlugs[value] ? value : '全部')
}

export function useLocale() {
  const { pathname, search, hash } = useLocation()
  const locale: Locale = pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en'
  const englishPath = locale === 'zh' ? pathname.slice(3) || '/' : pathname
  const chinesePath = `/zh${englishPath === '/' ? '' : englishPath}`
  const englishHref = `${englishPath}${search}${hash}`
  const chineseHref = `${chinesePath}${search}${hash}`
  const localePath = (to: string) => {
    if (to.startsWith('http') || to.startsWith('#') || to.startsWith('mailto:')) return to
    if (locale === 'en') return to
    if (to === '/') return '/zh'
    return `/zh${to}`
  }
  return { locale, isZh: locale === 'zh', localePath, englishPath, chinesePath, englishHref, chineseHref }
}
