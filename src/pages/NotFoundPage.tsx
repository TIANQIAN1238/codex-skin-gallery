import { ArrowLeft } from 'lucide-react'
import { LocalizedLink as Link } from '../components/LocalizedLink'
import { PageMeta } from '../components/PageMeta'
import { useLocale } from '../lib/i18n'

export function NotFoundPage() {
  const { isZh } = useLocale()
  return <section className="not-found page-container"><PageMeta title={isZh ? '页面不存在' : 'Page Not Found'} description={isZh ? '这个页面暂时不存在。' : 'This page does not exist.'} noIndex /><span>404</span><h1>{isZh ? '这里没有皮肤' : 'No skin here'}</h1><p>{isZh ? '可能是链接过期了，也可能这套皮肤还在路上。' : 'The link may have expired, or this skin is still on its way.'}</p><Link className="cta cta-primary" to="/skins"><ArrowLeft size={17} />{isZh ? '返回皮肤广场' : 'Back to gallery'}</Link></section>
}
