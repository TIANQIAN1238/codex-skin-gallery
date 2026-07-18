import { ArrowUp, BookOpen, Check, ChevronDown, GalleryHorizontalEnd, Globe2, Home, Layers3, Menu, PanelLeft, Search, Upload, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import { LocalizedLink as Link, LocalizedNavLink as NavLink } from './LocalizedLink'
import { useLocale } from '../lib/i18n'

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [railExpanded, setRailExpanded] = useState(() => window.localStorage.getItem('skindex-rail-expanded') === 'true')
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const languagePickerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { isZh, englishPath, englishHref, chineseHref } = useLocale()
  const shellCopy = isZh ? {
    home: '首页', gallery: '皮肤广场', collections: '精选合辑', guide: '安装指南', upload: '上传', search: '搜索皮肤', submit: '上传皮肤', discover: '发现', create: '创作', collapse: '收起侧栏', expand: '展开侧栏', descriptor: 'Codex 皮肤图鉴', backToTop: '返回顶部', live: '持续收录中', nav: '主导航', quick: '快捷导航', footer: '全网 Codex 免费皮肤，持续收录中。', unofficial: '非 OpenAI 官方项目', free: '社区皮肤均免费获取',
  } : {
    home: 'Home', gallery: 'Skin Gallery', collections: 'Collections', guide: 'Install Guide', upload: 'Submit', search: 'Search skins', submit: 'Submit Skin', discover: 'Discover', create: 'Create', collapse: 'Collapse sidebar', expand: 'Expand sidebar', descriptor: 'Codex Skin Library', backToTop: 'Back to top', live: 'Continuously curated', nav: 'Primary navigation', quick: 'Quick navigation', footer: 'The complete library of free Codex community skins.', unofficial: 'Independent community project', free: 'Every listed skin is free',
  }
  const localizedNav = [
    { to: '/', label: shellCopy.home, icon: Home, end: true },
    { to: '/skins', label: shellCopy.gallery, icon: GalleryHorizontalEnd },
    { to: '/collections', label: shellCopy.collections, icon: Layers3 },
    { to: '/guide', label: shellCopy.guide, icon: BookOpen },
  ]
  const pageNames: Record<string, string> = { '/': shellCopy.home, '/skins': shellCopy.gallery, '/collections': shellCopy.collections, '/guide': shellCopy.guide, '/submit': isZh ? '创作者工作台' : 'Creator Studio' }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    window.localStorage.setItem('skindex-rail-expanded', String(railExpanded))
  }, [railExpanded])

  useEffect(() => {
    if (!languageOpen) return
    const closeOnPointer = (event: PointerEvent) => {
      if (!languagePickerRef.current?.contains(event.target as Node)) setLanguageOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLanguageOpen(false)
    }
    document.addEventListener('pointerdown', closeOnPointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnPointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [languageOpen])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollTop = window.scrollY
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      document.documentElement.style.setProperty('--scroll-progress', String(Math.min(1, scrollTop / max)))
      setHeaderScrolled(scrollTop > 24)
      setShowBackToTop(scrollTop > 900)
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (frame) window.cancelAnimationFrame(frame) }
  }, [location.pathname])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let observer: IntersectionObserver | undefined
    const frame = window.requestAnimationFrame(() => {
      const sectionTargets = document.querySelectorAll<HTMLElement>('.showcase-section, .home-section, .install-story, .creator-cta, .guide-explainer, .guide-bottom, .related-section')
      sectionTargets.forEach(target => target.classList.add('section-transition'))
      const targets = document.querySelectorAll<HTMLElement>('.skin-card-v2, .collection-row, .guide-steps article, .form-section')
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          if (element.classList.contains('section-transition')) {
            element.classList.add('is-in-view')
            observer?.unobserve(element)
            return
          }
          const order = Number(element.dataset.revealOrder || 0)
          element.animate([
            { opacity: .6, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 380, delay: Math.min(order % 4, 3) * 35, easing: 'cubic-bezier(.23,1,.32,1)', fill: 'both' })
          observer?.unobserve(element)
        })
      }, { threshold: .08, rootMargin: '0px 0px -40px' })
      sectionTargets.forEach(target => observer?.observe(target))
      targets.forEach((target, index) => { target.dataset.revealOrder = String(index); observer?.observe(target) })
    })
    return () => { window.cancelAnimationFrame(frame); observer?.disconnect() }
  }, [location.pathname])

  return (
    <div className={`app-shell ${railExpanded ? 'rail-expanded' : ''}`}>
      <aside className={`site-rail ${railExpanded ? 'expanded' : ''}`} aria-label={shellCopy.quick}>
        <div className="rail-top"><Link className="rail-brand" to="/"><span className="logo-mark"><span /><span /><span /><span /></span><span><strong>SKINDEX</strong><small>{shellCopy.descriptor}</small></span></Link><button className="rail-control" onClick={() => setRailExpanded(value => !value)} aria-label={railExpanded ? shellCopy.collapse : shellCopy.expand} aria-expanded={railExpanded}><PanelLeft size={18} /></button></div>
        <nav className="rail-nav">
          <span className="rail-group-label">{shellCopy.discover}</span>
          {localizedNav.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} aria-label={label}><Icon size={19} /><span>{label}</span></NavLink>)}
          <span className="rail-group-label">{shellCopy.create}</span>
          <NavLink to="/submit" aria-label={shellCopy.submit}><Upload size={19} /><span>{shellCopy.upload}</span></NavLink>
        </nav>
        <span className="rail-version">BETA</span>
      </aside>
      <header className={`site-header ${headerScrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="logo" aria-label={`Skindex ${shellCopy.home}`}>
          <span className="logo-mark"><span /><span /><span /><span /></span>
          <strong>SKIN<span>DEX</span></strong>
        </Link>
        <span className="header-context">{pageNames[englishPath] ?? (englishPath.startsWith('/skins/') ? 'Skin Detail' : englishPath.startsWith('/install/') ? 'One-click Install' : 'Skindex')}</span>
        <span className="header-live"><i />{shellCopy.live}</span>
        <div className="header-actions">
          <div className="language-picker" ref={languagePickerRef}>
            <button className="language-trigger" onClick={() => setLanguageOpen(open => !open)} aria-label={isZh ? '选择语言' : 'Choose language'} aria-expanded={languageOpen} aria-haspopup="menu"><Globe2 /><ChevronDown /></button>
            {languageOpen && <div className="language-menu" role="menu"><RouterLink role="menuitem" className={!isZh ? 'active' : ''} to={englishHref} onClick={() => setLanguageOpen(false)}><span><strong>English</strong><small>International</small></span>{!isZh && <Check />}</RouterLink><RouterLink role="menuitem" className={isZh ? 'active' : ''} to={chineseHref} onClick={() => setLanguageOpen(false)}><span><strong>简体中文</strong><small>中国大陆</small></span>{isZh && <Check />}</RouterLink></div>}
          </div>
          <Link className="icon-button header-search" to="/skins" aria-label={shellCopy.search}><Search size={18} /></Link>
          <Link className="header-submit" to="/submit"><Upload size={16} />{shellCopy.submit}</Link>
          <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? (isZh ? '关闭菜单' : 'Close menu') : (isZh ? '打开菜单' : 'Open menu')}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="mobile-nav" aria-label={isZh ? '移动端导航' : 'Mobile navigation'}>
            {localizedNav.map((item) => <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)}>{item.label}</NavLink>)}
            <NavLink to="/submit" onClick={() => setMobileOpen(false)}>{shellCopy.submit}</NavLink>
          </nav>
        )}
      </header>
      <main className="route-stage" key={`${location.pathname}${location.search}`}><Outlet /></main>
      <footer className="site-footer">
        <div>
          <Link to="/" className="logo footer-logo"><span className="logo-mark"><span /><span /><span /><span /></span><strong>SKIN<span>DEX</span></strong></Link>
          <p>{shellCopy.footer}</p>
        </div>
        <div className="footer-links">
          <Link to="/skins">{shellCopy.gallery}</Link>
          <Link to="/collections">{shellCopy.collections}</Link>
          <Link to="/guide">{shellCopy.guide}</Link>
          <Link to="/submit">{shellCopy.submit}</Link>
        </div>
        <div className="footer-note">{shellCopy.unofficial}<br />{shellCopy.free}</div>
      </footer>
      <button className={`back-to-top ${showBackToTop ? 'visible' : ''}`} aria-label={shellCopy.backToTop} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}><ArrowUp /></button>
    </div>
  )
}
