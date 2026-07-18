import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleAlert,
  Download,
  ExternalLink,
  GitFork,
  Grid2X2,
  Heart,
  MonitorDown,
  MoonStar,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { projects, skins, type Skin } from './data'

const filters = ['全部', 'macOS', 'Windows', '暗色', '明亮', '真实截图']

function App() {
  const [filter, setFilter] = useState('全部')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Skin | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (!selected) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', close)
    document.body.classList.add('modal-open')
    return () => {
      window.removeEventListener('keydown', close)
      document.body.classList.remove('modal-open')
    }
  }, [selected])

  const visibleSkins = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skins.filter((skin) => {
      const matchesQuery = !q || [skin.name, skin.englishName, skin.author, skin.engine]
        .join(' ').toLowerCase().includes(q)
      const matchesFilter = filter === '全部'
        || skin.platforms.includes(filter)
        || skin.tone === filter
        || (filter === '真实截图' && skin.kind === '真实截图')
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  return (
    <>
      <header className="nav-shell">
        <a href="#top" className="brand" aria-label="Skindex 首页">
          <span className="brand-mark"><Grid2X2 size={17} strokeWidth={2.4} /></span>
          <span>SKIN<span>DEX</span></span>
        </a>
        <nav>
          <a href="#gallery">皮肤图鉴</a>
          <a href="#engines">安装工具</a>
          <a href="#safety">安全说明</a>
        </nav>
        <a className="nav-github" href="https://github.com/TIANQIAN1238/codex-skin-gallery" target="_blank" rel="noreferrer">
          <GitFork size={17} /> GitHub
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" />
          <div className="eyebrow"><Sparkles size={14} /> CODEX COMMUNITY SKINS · 2026</div>
          <h1>给你的 Codex，<br /><em>换一种心情。</em></h1>
          <p className="hero-copy">免费、开源、可恢复。收录社区里真正能装上的 Codex Desktop 皮肤，并把复杂的安装方式讲清楚。</p>
          <div className="hero-actions">
            <a className="button primary" href="#gallery">逛逛皮肤 <ArrowRight size={18} /></a>
            <a className="button secondary" href="#engines">先看怎么安装</a>
          </div>
          <div className="hero-stats">
            <div><strong>{skins.length}</strong><span>首批精选</span></div>
            <div><strong>5</strong><span>开源引擎</span></div>
            <div><strong>¥0</strong><span>永久免费</span></div>
          </div>
          <div className="hero-cards" aria-hidden="true">
            {skins.filter((skin) => skin.featured).map((skin, index) => (
              <div className={`floating-card card-${index + 1}`} key={skin.id}>
                <img src={skin.image} alt="" />
                <div><span>{skin.name}</span><small>{skin.tone} · {skin.engine}</small></div>
              </div>
            ))}
            <div className="orbit-badge"><MoonStar size={24} /><span>pick your<br />vibe</span></div>
          </div>
        </section>

        <section className="ticker" aria-label="收录原则">
          <span>真实来源</span><i>✦</i><span>免费获取</span><i>✦</i><span>安装可恢复</span><i>✦</i><span>作者署名</span><i>✦</i><span>平台状态透明</span>
        </section>

        <section className="gallery section" id="gallery">
          <div className="section-heading">
            <div>
              <span className="kicker">01 / CURATED GALLERY</span>
              <h2>本周皮肤图鉴</h2>
            </div>
            <p>不是商店，是一份持续更新的社区目录。<br />点击任意卡片查看安装与风险信息。</p>
          </div>

          <div className="toolbar">
            <div className="filters">
              {filters.map((item) => (
                <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>
              ))}
            </div>
            <label className="search-box">
              <Search size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索皮肤、作者或引擎" />
            </label>
          </div>

          <div className="skin-grid">
            {visibleSkins.map((skin, index) => (
              <article className="skin-card" key={skin.id}>
                <button className="card-visual" onClick={() => setSelected(skin)} aria-label={`查看 ${skin.name}`}>
                  <img src={skin.image} alt={`${skin.name} Codex 皮肤预览`} loading={index > 3 ? 'lazy' : 'eager'} />
                  <span className="kind-badge">{skin.kind}</span>
                  <span className="view-hint">查看详情 <ArrowRight size={16} /></span>
                </button>
                <div className="card-body">
                  <div className="card-topline">
                    <div className="swatches">{skin.palette.map((color) => <i style={{ background: color }} key={color} />)}</div>
                    <button className={favorites.includes(skin.id) ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(skin.id)} aria-label="收藏">
                      <Heart size={17} fill={favorites.includes(skin.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <h3>{skin.name}</h3>
                  <p className="english-name">{skin.englishName}</p>
                  <div className="meta-row">
                    <span>{skin.author}</span><span>{skin.platforms.join(' + ')}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visibleSkins.length === 0 && <div className="empty-state">没有找到匹配的皮肤，换个关键词试试。</div>}
        </section>

        <section className="manifesto section" id="safety">
          <div className="manifesto-visual">
            <div className="window-mock">
              <div className="window-bar"><i /><i /><i /><span>Codex</span></div>
              <div className="window-content">
                <div className="mock-sidebar" />
                <div className="mock-main"><Sparkles size={32} /><span>same Codex.<br />different mood.</span></div>
              </div>
            </div>
          </div>
          <div className="manifesto-copy">
            <span className="kicker">02 / BEFORE YOU INSTALL</span>
            <h2>好看之外，<br />我们更在意<span>可逆。</span></h2>
            <p>当前主流方案通过本机回环 CDP 向正在运行的 Codex 注入样式。它不等于官方主题系统，也不该修改官方安装包。</p>
            <ul>
              <li><ShieldCheck size={19} /><span><strong>看恢复路径</strong>必须明确提供关闭或恢复官方外观的方法。</span></li>
              <li><MonitorDown size={19} /><span><strong>看平台验证</strong>“支持 Windows”不代表已经完成 Windows 真机验证。</span></li>
              <li><CircleAlert size={19} /><span><strong>看素材权利</strong>开源代码许可不自动覆盖人物、IP、壁纸与字体。</span></li>
            </ul>
          </div>
        </section>

        <section className="engines section" id="engines">
          <div className="section-heading compact">
            <div><span className="kicker">03 / OPEN-SOURCE ENGINES</span><h2>皮肤背后的工具</h2></div>
            <p>同一张皮肤不一定能跨工具直接安装。<br />先选生态，再选外观。</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <a href={project.url} target="_blank" rel="noreferrer" className="project-row" key={project.name}>
                <span className="project-index">0{index + 1}</span>
                <div><strong>{project.name}</strong><small>by {project.author}</small></div>
                <span className="project-trait">{project.trait}</span>
                <span className="project-stars"><GitFork size={15} /> {project.stars}</span>
                <span className="round-arrow"><ArrowRight size={18} /></span>
              </a>
            ))}
          </div>
        </section>

        <section className="submit section">
          <div>
            <span className="kicker">COMMUNITY-DRIVEN</span>
            <h2>你做了一套？<br />让更多人看见。</h2>
          </div>
          <div className="submit-copy">
            <p>我们只收录免费获取、有明确来源和安装说明的作品。原创作者、维护者与发现者都可以投稿。</p>
            <a className="button light" href="https://github.com/TIANQIAN1238/codex-skin-gallery/issues/new?template=skin_submission.yml" target="_blank" rel="noreferrer">准备投稿 <ChevronRight size={18} /></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark"><Grid2X2 size={17} /></span><span>SKIN<span>DEX</span></span></div>
        <p>非 OpenAI 官方项目。Codex 名称与相关权利归其权利人所有。本站不托管付费内容。</p>
        <span>Made for the community · 2026</span>
      </footer>

      {selected && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <article className="modal" role="dialog" aria-modal="true" aria-label={`${selected.name} 详情`}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭"><X size={20} /></button>
            <div className="modal-image"><img src={selected.image} alt={`${selected.name} 预览`} /></div>
            <div className="modal-content">
              <span className="modal-engine">{selected.engine}</span>
              <h2>{selected.name}</h2>
              <p className="modal-english">{selected.englishName}</p>
              <p className="modal-description">{selected.description}</p>
              <div className="detail-grid">
                <div><small>创作者</small><strong>{selected.author}</strong></div>
                <div><small>平台</small><strong>{selected.platforms.join(' / ')}</strong></div>
                <div><small>验证状态</small><strong>{selected.verified}</strong></div>
                <div><small>预览类型</small><strong>{selected.kind}</strong></div>
              </div>
              <div className="notice"><CircleAlert size={18} /><span>{selected.note}</span></div>
              <div className="modal-actions">
                <a className="button primary" href={selected.download} target="_blank" rel="noreferrer"><Download size={18} /> 获取与安装</a>
                <a className="source-link" href={selected.source} target="_blank" rel="noreferrer"><GitFork size={17} /> 查看源码 <ExternalLink size={14} /></a>
              </div>
              <p className="install-tip"><Check size={15} /> 安装前建议退出当前任务，并确认仓库提供恢复官方外观的入口。</p>
            </div>
          </article>
        </div>
      )}
    </>
  )
}

export default App
