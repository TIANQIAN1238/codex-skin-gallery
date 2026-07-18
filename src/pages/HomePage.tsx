import { ArrowRight, Check, Download, Gamepad2, Globe2, Image, Palette, ShieldCheck, Sparkles, Upload, WandSparkles } from 'lucide-react'
import { LocalizedLink as Link } from '../components/LocalizedLink'
import { PageMeta } from '../components/PageMeta'
import { SkinGrid } from '../components/SkinGrid'
import { ShowcaseCarousel } from '../components/ShowcaseCarousel'
import { collectionSummaries, getFeaturedSkins, sourceCount } from '../lib/catalog'
import { skins } from '../data'
import { categorySlug, localizeCategory, useLocale } from '../lib/i18n'

export function HomePage() {
  const { isZh, locale } = useLocale()
  const featured = getFeaturedSkins(8)
  const heroSkins = featured.slice(0, 3)
  const c = isZh ? {
    title: '全网 Codex 免费皮肤', description: '发现并一键安装来自社区的 Codex Desktop 免费皮肤。', status: `${skins.length} 套免费皮肤 · 持续发现中`, heroA: '今天想把 Codex', heroB: '变成什么样？', intro: '从全网社区作品里挑一套视觉风格，一键交给 Codex 完成安装、验证与恢复。', all: '全部', anime: '动漫', minimal: '极简', game: '游戏', browse: `浏览全部 ${skins.length} 套`, how: '看看怎么安装', free: '全部免费', restore: '支持恢复', nocode: '无需懂代码', skins: '套已收录皮肤', ecosystems: '个开源生态', freeGet: '免费获取', daily: '每天自动发现', picks: '现在最值得换上的', viewAll: '查看全部', easyTitle: '小白也能完成的\n一键安装。', easyText: '网站会自动生成一段针对这套皮肤的安装任务。打开 Codex、粘贴发送，安装、验证和恢复说明都会自动完成。', flow: '查看完整流程', choose: '选一套皮肤', chooseText: '进入详情页确认预览与系统支持。', copy: '复制安装任务', copyText: '我们已经整理好来源、主题 ID 和安全要求。', done: 'Codex 自动完成', doneText: '完成后验证效果，并告诉你如何恢复原样。', mood: '按今天的心情挑', collections: '全部合辑', community: '让全网好皮肤，\n不再散落各处。', communityText: '如果你做了皮肤、发现了好作品，或者维护着换肤工具，欢迎直接提交。我们负责整理成普通用户能看懂、能安装的形式。', submit: '上传一套皮肤', sets: '套皮肤',
  } : {
    title: 'Free Codex Skins, All in One Place', description: 'Discover and one-click install the best free community skins for Codex Desktop.', status: `${skins.length} free skins · Updated continuously`, heroA: 'What should your Codex', heroB: 'look like today?', intro: 'Choose a visual identity from the best community-made skins. Codex handles installation, verification, and recovery.', all: 'All', anime: 'Anime', minimal: 'Minimal', game: 'Gaming', browse: `Explore all ${skins.length} skins`, how: 'See how it works', free: 'Always free', restore: 'Easy recovery', nocode: 'No coding required', skins: 'curated skins', ecosystems: 'open-source ecosystems', freeGet: 'free to install', daily: 'discovery updates', picks: 'Worth installing right now', viewAll: 'View all skins', easyTitle: 'One-click install,\nmade for everyone.', easyText: 'Every skin comes with a ready-to-run Codex task. Open Codex, paste it, and installation, verification, and recovery are handled for you.', flow: 'View the full flow', choose: 'Choose a skin', chooseText: 'Review the real preview and supported systems.', copy: 'Copy the install task', copyText: 'Source, theme ID, and safety rules are already included.', done: 'Let Codex finish', doneText: 'Codex installs it, verifies the result, and explains recovery.', mood: 'Browse by your mood', collections: 'All collections', community: 'Great skins belong\nin one global library.', communityText: 'Created a skin, found a hidden gem, or maintain a theming tool? Submit it. We turn community projects into experiences anyone can understand and install.', submit: 'Submit a skin', sets: 'skins',
  }
  const ecosystem = isZh ? { eyebrow: 'BEYOND SKINS', title: '不只换皮肤，\n而是扩展整个 Codex。', text: 'Skindex 会逐步收录主题管理器、安装技能、工作流预设和创作者工具。皮肤只是第一层。', live: '已开放', soon: '即将上线', library: '皮肤图鉴', libraryText: '浏览、比较并一键安装全网社区皮肤。', tools: '换肤工具', toolsText: '发现主题管理器、可视化编辑器和跨平台安装器。', skills: '安装技能', skillsText: '把复杂项目整理成 Codex 可以安全执行的任务。', creator: '创作者中心', creatorText: '发布作品、维护版本，并让普通用户直接使用。', explore: '开始浏览' } : { eyebrow: 'BEYOND SKINS', title: 'Not just a skin site.\nA customization layer for Codex.', text: 'Skindex will grow into a library of theme managers, install skills, workflow presets, and creator tools. Skins are only the first layer.', live: 'Live now', soon: 'Coming next', library: 'Skin Library', libraryText: 'Browse, compare, and one-click install the best community skins.', tools: 'Theme Tools', toolsText: 'Discover managers, visual editors, and cross-platform installers.', skills: 'Install Skills', skillsText: 'Turn complex open-source projects into safe, guided Codex tasks.', creator: 'Creator Studio', creatorText: 'Publish work, maintain versions, and reach users who just want it to work.', explore: 'Start exploring' }

  return (
    <>
      <PageMeta title={c.title} description={c.description} />
      <section className="home-hero page-container">
        <div className="hero-copy-v2">
          <div className="status-pill"><span />{c.status}</div>
          <h1>{c.heroA}<br /><em>{c.heroB}</em></h1>
          <p>{c.intro}</p>
          <div className="hero-mode-bar" aria-label="Quick categories"><Link to="/skins"><Sparkles />{c.all}</Link><Link to="/skins?category=anime"><Image />{c.anime}</Link><Link to="/skins?category=minimal"><Palette />{c.minimal}</Link><Link to="/skins?category=gaming"><Gamepad2 />{c.game}</Link></div>
          <div className="hero-actions-v2">
            <Link className="cta cta-primary cta-shimmer" to="/skins">{c.browse}<ArrowRight size={18} /></Link>
            <Link className="cta cta-secondary" to="/guide"><WandSparkles size={17} />{c.how}</Link>
          </div>
          <div className="hero-proof">
            <span><Check size={14} />{c.free}</span><span><Check size={14} />{c.restore}</span><span><Check size={14} />{c.nocode}</span>
          </div>
        </div>
        <div className="hero-gallery" aria-label={isZh ? '精选皮肤预览' : 'Featured skin previews'}>
          {heroSkins.map((skin, index) => (
            <Link className={`hero-skin hero-skin-${index + 1}`} to={`/skins/${skin.id}`} key={skin.id}>
              <img src={skin.image} alt={`${isZh ? skin.name : skin.englishName || skin.name} preview`} fetchPriority="high" decoding="async" />
              <span><strong>{isZh ? skin.name : skin.englishName || skin.name}</strong><small>{localizeCategory(skin.category, locale)} · {isZh ? '免费' : 'Free'}</small></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="metric-bar">
        <div><strong>{skins.length}</strong><span>{c.skins}</span></div><div><strong>{sourceCount}</strong><span>{c.ecosystems}</span></div><div><strong>100%</strong><span>{c.freeGet}</span></div><div><strong>Daily</strong><span>{c.daily}</span></div>
      </section>

      <ShowcaseCarousel skins={featured} />

      <section className="home-section page-container">
        <div className="section-title-row">
          <div><span className="eyebrow-v2">EDITOR'S PICKS</span><h2>{c.picks}</h2></div><Link className="text-link" to="/skins">{c.viewAll}<ArrowRight size={16} /></Link>
        </div>
        <SkinGrid skins={featured} priorityCount={4} />
      </section>

      <section id="ecosystem" className="ecosystem-section home-section page-container">
        <div className="ecosystem-heading"><span className="eyebrow-v2">{ecosystem.eyebrow}</span><h2>{ecosystem.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h2><p>{ecosystem.text}</p></div>
        <div className="ecosystem-grid">
          <Link className="ecosystem-card ecosystem-card-primary" to="/skins"><span className="ecosystem-card-icon"><Palette /></span><small>{ecosystem.live}</small><h3>{ecosystem.library}</h3><p>{ecosystem.libraryText}</p><strong>{ecosystem.explore}<ArrowRight /></strong></Link>
          <article className="ecosystem-card"><span className="ecosystem-card-icon"><WandSparkles /></span><small>{ecosystem.soon}</small><h3>{ecosystem.tools}</h3><p>{ecosystem.toolsText}</p></article>
          <article className="ecosystem-card"><span className="ecosystem-card-icon"><ShieldCheck /></span><small>{ecosystem.soon}</small><h3>{ecosystem.skills}</h3><p>{ecosystem.skillsText}</p></article>
          <Link className="ecosystem-card" to="/submit"><span className="ecosystem-card-icon"><Globe2 /></span><small>{ecosystem.live}</small><h3>{ecosystem.creator}</h3><p>{ecosystem.creatorText}</p></Link>
        </div>
      </section>

      <section className="install-story">
        <div className="page-container install-story-grid">
          <div>
            <span className="eyebrow-v2">DESIGNED FOR EVERYONE</span>
            <h2>{c.easyTitle.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h2><p>{c.easyText}</p><Link className="cta cta-light" to="/guide">{c.flow}<ArrowRight size={17} /></Link>
          </div>
          <div className="install-steps-card">
            <div><span>01</span><Download /><strong>{c.choose}</strong><p>{c.chooseText}</p></div><div><span>02</span><WandSparkles /><strong>{c.copy}</strong><p>{c.copyText}</p></div><div><span>03</span><ShieldCheck /><strong>{c.done}</strong><p>{c.doneText}</p></div>
          </div>
        </div>
      </section>

      <section className="home-section page-container">
        <div className="section-title-row">
          <div><span className="eyebrow-v2">BROWSE BY MOOD</span><h2>{c.mood}</h2></div><Link className="text-link" to="/collections">{c.collections}<ArrowRight size={16} /></Link>
        </div>
        <div className="collection-preview-grid">
          {collectionSummaries.slice(0, 4).map((collection) => (
            <Link to={`/skins?category=${categorySlug(collection.category)}`} className="collection-tile" style={{ '--tile-color': collection.color } as React.CSSProperties} key={collection.category}>
              <img src={collection.preview} alt="" />
              <span>{localizeCategory(collection.category, locale)}</span>
              <div><strong>{isZh ? collection.description : `Curated ${collection.category} visual styles`}</strong><small>{collection.count} {c.sets}</small></div>
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
      </section>

      <section className="creator-cta page-container">
        <div><Globe2 size={26} /><span>COMMUNITY-POWERED</span></div>
        <h2>{c.community.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h2><p>{c.communityText}</p><Link className="cta cta-primary" to="/submit"><Upload size={17} />{c.submit}</Link>
      </section>
    </>
  )
}
