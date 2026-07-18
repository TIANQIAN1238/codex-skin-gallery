type PageMetaProps = {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

import { useEffect } from 'react'
import { useLocale } from '../lib/i18n'

export function PageMeta({ title, description, image, noIndex = false }: PageMetaProps) {
  const { locale, englishPath, chinesePath } = useLocale()
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
  const canonicalPath = locale === 'zh' ? chinesePath : englishPath
  const canonical = new URL(canonicalPath, siteUrl).toString()
  const englishUrl = new URL(englishPath, siteUrl).toString()
  const chineseUrl = new URL(chinesePath, siteUrl).toString()
  const fullTitle = `${title} · Skindex`
  const socialImage = image ? new URL(image, siteUrl).toString() : new URL('/og-cover.svg', siteUrl).toString()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: fullTitle,
    description,
    url: canonical,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
    isPartOf: { '@type': 'WebSite', name: 'Skindex', url: siteUrl },
  }

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="zh-CN" href={chineseUrl} />
      <link rel="alternate" hrefLang="x-default" href={englishUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Skindex" />
      <meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  )
}
