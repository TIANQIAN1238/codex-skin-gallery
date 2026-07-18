import { type FormEvent, useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  CircleAlert,
  Copy,
  Download,
  Grid2X2,
  Heart,
  ImagePlus,
  MonitorDown,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from 'lucide-react'
import { categories, installPrompt, skins, type Skin } from './data'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

function App() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('全部')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(12)
  const [selected, setSelected] = useState<Skin | null>(null)
  const [copied, setCopied] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [uploadOpen, setUploadOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  useEffect(() => {
    if (!selected && !uploadOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
        setUploadOpen(false)
      }
    }
    window.addEventListener('keydown', close)
    document.body.classList.add('modal-open')
    return () => {
      window.removeEventListener('keydown', close)
      document.body.classList.remove('modal-open')
    }
  }, [selected, uploadOpen])

  const visibleSkins = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skins.filter((skin) => {
      const matchesQuery = !q || [skin.name, skin.englishName, skin.author, skin.category]
        .join(' ').toLowerCase().includes(q)
      const matchesFilter = filter === '全部'
        || (filter === '热门' && skin.featured)
        || skin.category === filter
        || skin.platforms.includes(filter as 'macOS' | 'Windows')
      return matchesQuery && matchesFilter
    })
  }, [filter, query])

  const copyPrompt = async (skin: Skin) => {
    try {
      await navigator.clipboard.writeText(installPrompt(skin))
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const openInstaller = async (skin: Skin) => {
    setSelected(skin)
    setCopied(false)
    await copyPrompt(skin)
  }

  const toggleFavorite = (id: string) => {
    setFavorites((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id])
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitStatus('sending')
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('submit failed')
      setSubmitStatus('success')
      form.reset()
    } catch {
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <header className="nav-shell">
        <a href="#top" className="brand" aria-label="Skindex 首页">
          <span className="brand-mark"><Grid2X2 size={17} strokeWidth={2.4} /></span>
          <span>SKIN<span>DEX</span></span>
        </a>
        <nav>
          <a href="#gallery">皮肤广场</a>
          <a href="#how">怎么安装</a>
          <button className="nav-text-button" onClick={() => setUploadOpen(true)}>上传皮肤</button>
        </nav>
        <button className="nav-upload" onClick={() => setUploadOpen(true)}>
          <Upload size={16} /> 上传皮肤
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-noise" />
          <div className="eyebrow"><Sparkles size={14} /> CODEX SKIN COMMUNITY · FREE FOREVER</div>
          <h1>挑一个喜欢的，<br /><em>一键换上。</em></h1>
          <p className="hero-copy">不用看代码，不用研究 GitHub。选中皮肤，我们会把安装任务交给你熟悉的 Codex 完成。</p>
          <div className="hero-actions">
            <a className="button primary" href="#gallery">开始挑皮肤 <ArrowDown size={18} /></a>
            <button className="button secondary" onClick={() => setUploadOpen(true)}>上传我的皮肤</button>
          </div>
          <div className="hero-stats">
            <div><strong>{skins.length}</strong><span>套免费皮肤</span></div>
            <div><strong>1</strong><span>次点击开始安装</span></div>
            <div><strong>0</strong><span>元永久免费</span></div>
          </div>
          <div className="hero-cards" aria-hidden="true">
            {skins.filter((skin) => skin.featured).slice(0, 3).map((skin, index) => (
              <div className={`floating-card card-${index + 1}`} key={skin.id}>
                <img src={skin.image} alt="" />
                <div><span>{skin.name}</span><small>{skin.category} · 免费</small></div>
              </div>
            ))}
            <div className="orbit-badge"><WandSparkles size={24} /><span>one click<br />to install</span></div>
          </div>
        </section>

        <section className="ticker" aria-label="服务特点">
          <span>{skins.length} 套持续更新</span><i>✦</i><span>全部免费</span><i>✦</i><span>Codex 自动安装</span><i>✦</i><span>支持恢复原样</span><i>✦</i><span>欢迎用户投稿</span>
        </section>

        <section className="how-strip section" id="how">
          <div className="how-title">
            <span className="kicker">真的很简单</span>
            <h2>不会命令行，<br />也能换皮肤。</h2>
          </div>
          <div className="how-steps">
            <div><span>01</span><WandSparkles /><strong>选择皮肤</strong><p>看到喜欢的，点击“一键安装”。</p></div>
            <div><span>02</span><Copy /><strong>自动复制</strong><p>安装任务会自动复制，无需理解代码。</p></div>
            <div><span>03</span><MonitorDown /><strong>交给 Codex</strong><p>打开 Codex 粘贴发送，它会帮你完成。</p></div>
          </div>
        </section>

        <section className="gallery section" id="gallery">
          <div className="section-heading">
            <div>
              <span className="kicker">不断增加中的皮肤库</span>
              <h2>今天想换哪一套？</h2>
            </div>
            <p>来自不同社区作者和换肤工具。<br />你只需要负责挑喜欢的。</p>
          </div>

          <div className="toolbar">
            <div className="filters">
              {categories.map((item) => (
                <button className={filter === item ? 'active' : ''} onClick={() => { setFilter(item); setLimit(12) }} key={item}>{item}</button>
              ))}
            </div>
            <label className="search-box">
              <Search size={17} />
              <input value={query} onChange={(event) => { setQuery(event.target.value); setLimit(12) }} placeholder="搜角色、风格或作者" />
            </label>
          </div>

          <div className="result-count"><strong>{visibleSkins.length}</strong> 套皮肤</div>
          <div className="skin-grid">
            {visibleSkins.slice(0, limit).map((skin, index) => (
              <article className="skin-card" key={skin.id}>
                <button className="card-visual" onClick={() => openInstaller(skin)} aria-label={`安装 ${skin.name}`}>
                  <img src={skin.image} alt={`${skin.name} Codex 皮肤预览`} loading={index > 7 ? 'lazy' : 'eager'} />
                  <span className="kind-badge">免费 · {skin.kind}</span>
                  <span className="view-hint">立即安装 <ArrowRight size={16} /></span>
                </button>
                <div className="card-body">
                  <div className="card-topline">
                    <div className="platform-pills">
                      {skin.platforms.map((platform) => <span key={platform}>{platform}</span>)}
                    </div>
                    <button className={favorites.includes(skin.id) ? 'favorite active' : 'favorite'} onClick={() => toggleFavorite(skin.id)} aria-label={`收藏 ${skin.name}`}>
                      <Heart size={17} fill={favorites.includes(skin.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <h3>{skin.name}</h3>
                  <p className="english-name">{skin.englishName}</p>
                  <div className="card-footer">
                    <span>by {skin.author}</span>
                    <button onClick={() => openInstaller(skin)}>一键安装 <ChevronRight size={14} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visibleSkins.length === 0 && <div className="empty-state">没有找到匹配的皮肤，换个关键词试试。</div>}
          {limit < visibleSkins.length && (
            <button className="load-more" onClick={() => setLimit((current) => current + 12)}>
              再看 12 套 <ArrowDown size={17} />
            </button>
          )}
        </section>

        <section className="manifesto section">
          <div className="manifesto-visual">
            <div className="window-mock">
              <div className="window-bar"><i /><i /><i /><span>Codex</span></div>
              <div className="window-content">
                <div className="mock-sidebar" />
                <div className="mock-main"><Sparkles size={32} /><span>same Codex.<br />new mood.</span></div>
              </div>
            </div>
          </div>
          <div className="manifesto-copy">
            <span className="kicker">放心换，随时换回来</span>
            <h2>小白体验，<br />安全底线<span>不缩水。</span></h2>
            <p>我们把技术细节藏起来，但不会把风险藏起来。Codex 会先检查安装说明、系统兼容性和恢复方式，再帮你操作。</p>
            <ul>
              <li><ShieldCheck size={19} /><span><strong>不碰你的配置</strong>安装任务明确禁止修改 API Key、模型和项目文件。</span></li>
              <li><MonitorDown size={19} /><span><strong>自动识别系统</strong>Codex 会根据 macOS 或 Windows 选择正确版本。</span></li>
              <li><CircleAlert size={19} /><span><strong>随时恢复原样</strong>每次安装都要求保留恢复官方外观的方法。</span></li>
            </ul>
          </div>
        </section>

        <section className="submit section">
          <div>
            <span className="kicker">让社区一起把它做大</span>
            <h2>你有好皮肤？<br />上传到这里。</h2>
          </div>
          <div className="submit-copy">
            <p>原创、二创、换肤工具自带主题都欢迎。填一张简单表单，审核通过后就会出现在皮肤广场。</p>
            <button className="button light" onClick={() => setUploadOpen(true)}>上传一套皮肤 <ImagePlus size={18} /></button>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark"><Grid2X2 size={17} /></span><span>SKIN<span>DEX</span></span></div>
        <p>非 OpenAI 官方项目。皮肤由社区创作者提供，本站不售卖任何皮肤。</p>
        <span>{skins.length} skins and counting · 2026</span>
      </footer>

      {selected && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <article className="modal install-modal" role="dialog" aria-modal="true" aria-label={`安装 ${selected.name}`}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="关闭"><X size={20} /></button>
            <div className="modal-image">
              <img src={selected.image} alt={`${selected.name} 预览`} />
              <span className="free-stamp">FREE<br />免费</span>
            </div>
            <div className="modal-content">
              <span className="modal-engine">{selected.category} · {selected.platforms.join(' / ')}</span>
              <h2>{selected.name}</h2>
              <p className="modal-english">{selected.englishName}</p>
              <p className="modal-description">{selected.description}</p>

              <div className={copied ? 'copy-success active' : 'copy-success'}>
                <span>{copied ? <Check size={20} /> : <Copy size={20} />}</span>
                <div>
                  <strong>{copied ? '安装任务已复制' : '点击下方按钮复制安装任务'}</strong>
                  <p>{copied ? '接下来打开 Codex，直接粘贴并发送。' : 'Codex 会自动识别系统并完成安装。'}</p>
                </div>
              </div>

              <div className="install-actions">
                <a className="button primary install-main" href="codex://" onClick={() => copyPrompt(selected)}>
                  <WandSparkles size={18} /> {copied ? '打开 Codex 去安装' : '复制任务并打开 Codex'}
                </a>
                {!copied && <button className="copy-only" onClick={() => copyPrompt(selected)}><Copy size={15} /> 只复制安装任务</button>}
                {selected.downloadUrl && (
                  <a className="download-link" href={selected.downloadUrl} target="_blank" rel="noreferrer">
                    <Download size={16} /> 直接下载安装包
                  </a>
                )}
              </div>

              <div className="mini-steps">
                <span><i>1</i>打开 Codex</span><ChevronRight size={14} />
                <span><i>2</i>粘贴发送</span><ChevronRight size={14} />
                <span><i>3</i>等待完成</span>
              </div>
              <div className="notice"><CircleAlert size={18} /><span>{selected.note}</span></div>
            </div>
          </article>
        </div>
      )}

      {uploadOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setUploadOpen(false)}>
          <article className="upload-modal" role="dialog" aria-modal="true" aria-label="上传皮肤">
            <button className="modal-close" onClick={() => setUploadOpen(false)} aria-label="关闭"><X size={20} /></button>
            <div className="upload-intro">
              <span className="kicker">COMMUNITY UPLOAD</span>
              <h2>上传一套<br />好皮肤。</h2>
              <p>不需要懂代码。把皮肤介绍、预览图和安装地址告诉我们，审核后会帮你整理上架。</p>
              <div><Check size={16} /> 免费皮肤优先</div>
              <div><Check size={16} /> 原创作者清晰署名</div>
              <div><Check size={16} /> 必须可以恢复官方外观</div>
            </div>
            <form className="upload-form" onSubmit={handleSubmit}>
              {submitStatus === 'success' ? (
                <div className="submit-success">
                  <span><Check size={30} /></span>
                  <h3>已经收到啦</h3>
                  <p>我们会检查安装方式和预览内容，审核通过后加入皮肤广场。</p>
                  <button type="button" className="button primary" onClick={() => { setUploadOpen(false); setSubmitStatus('idle') }}>完成</button>
                </div>
              ) : (
                <>
                  <label>皮肤名称<input name="name" required placeholder="给你的皮肤起个名字" /></label>
                  <div className="form-row">
                    <label>作者名称<input name="author" required placeholder="你的昵称" /></label>
                    <label>联系方式<input name="contact" required placeholder="邮箱或社交账号" /></label>
                  </div>
                  <label>预览图地址<input name="previewUrl" type="url" required placeholder="https://... 图片直链" /></label>
                  <label>安装包或发布地址<input name="installUrl" type="url" required placeholder="https://..." /></label>
                  <label>支持平台<select name="platform" required defaultValue=""><option value="" disabled>请选择</option><option>macOS</option><option>Windows</option><option>macOS + Windows</option></select></label>
                  <label>简单介绍<textarea name="description" required rows={3} placeholder="它是什么风格？有什么特点？" /></label>
                  <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
                  <label className="rights-check"><input type="checkbox" name="rightsConfirmed" value="yes" required /><span>我确认这套皮肤可以免费分享，并且有权提交其中的图片和素材。</span></label>
                  {submitStatus === 'error' && <p className="form-error">暂时没能提交成功，请稍后再试。</p>}
                  <button className="button primary submit-button" disabled={submitStatus === 'sending'}>
                    {submitStatus === 'sending' ? '正在提交…' : '提交审核'} <ArrowRight size={17} />
                  </button>
                  <p className="form-footnote">提交后不会立刻公开，我们会先检查安全性和安装说明。</p>
                </>
              )}
            </form>
          </article>
        </div>
      )}
    </>
  )
}

export default App
