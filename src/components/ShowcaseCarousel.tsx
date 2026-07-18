import { ArrowLeft, ArrowRight, Download, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Skin } from '../data'
import { localizeCategory, useLocale } from '../lib/i18n'
import { LocalizedLink as Link } from './LocalizedLink'

type ShowcaseCarouselProps = { skins: Skin[] }
type CarouselParams = { cardWidth: number; angle: number; sideScale: number; step: number }

function ringOffset(index: number, position: number, total: number) {
  let offset = index - position
  while (offset > total / 2) offset -= total
  while (offset < -total / 2) offset += total
  return offset
}

function resolveParams(width: number): CarouselParams {
  if (width >= 900) return { cardWidth: Math.min(650, width * .56), angle: 58, sideScale: .82, step: 94 }
  const cardWidth = Math.min(520, width * .82)
  return { cardWidth, angle: 54, sideScale: .84, step: Math.max(34, cardWidth * .11) }
}

function cardStyle(offset: number, params: CarouselParams) {
  const distance = Math.abs(offset)
  const sign = Math.sign(offset)
  if (distance < .001) return { transform: 'translate(-50%, -50%) translateX(0) rotateY(0deg) scale(1) translateZ(0)', zIndex: 100 }
  const translateX = sign * (params.cardWidth * .39 + Math.max(0, distance - 1) * params.step)
  const scale = Math.max(.68, params.sideScale - Math.max(0, distance - 1) * .035)
  return {
    transform: `translate(-50%, -50%) translateX(${translateX.toFixed(2)}px) rotateY(${(-sign * params.angle).toFixed(2)}deg) scale(${scale.toFixed(3)}) translateZ(${(-95 - distance * 9).toFixed(2)}px)`,
    zIndex: Math.round(100 - distance * 10),
  }
}

export function ShowcaseCarousel({ skins }: ShowcaseCarouselProps) {
  const { isZh, locale } = useLocale()
  const items = useMemo(() => skins.slice(0, 9), [skins])
  const total = items.length
  const stageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; startPosition: number } | null>(null)
  const movedRef = useRef(false)
  const [position, setPosition] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [params, setParams] = useState<CarouselParams>({ cardWidth: 620, angle: 58, sideScale: .82, step: 94 })
  const activeIndex = ((Math.round(position) % total) + total) % total
  const activeSkin = items[activeIndex]
  const c = isZh ? { eyebrow: 'INTERACTIVE SHOWCASE', title: '把每一种风格，\n放到舞台中央。', text: '拖动、点击侧卡或使用方向键切换。每张都是真实的 Codex 运行预览。', prev: '上一套皮肤', next: '下一套皮肤', view: '查看详情', install: '一键安装', gallery: '浏览完整图鉴', count: '套精选展示' } : { eyebrow: 'INTERACTIVE SHOWCASE', title: 'Put every visual style\ncenter stage.', text: 'Drag, choose a side card, or use the arrow keys. Every image is a real Codex interface preview.', prev: 'Previous skin', next: 'Next skin', view: 'View details', install: 'One-click install', gallery: 'Explore the full gallery', count: 'featured skins' }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const update = () => setParams(resolveParams(stage.getBoundingClientRect().width))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .3 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || paused || dragging || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setPosition(value => (Math.round(value) + 1) % total), 6500)
    return () => window.clearInterval(timer)
  }, [dragging, inView, paused, total])

  const go = useCallback((direction: 1 | -1) => setPosition(value => (Math.round(value) + direction + total) % total), [total])
  const pixelsPerStep = params.cardWidth * .39 + params.step

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('[data-carousel-action]')) return
    movedRef.current = false
    dragRef.current = { startX: event.clientX, startPosition: position }
    setDragging(true)
    stageRef.current?.setPointerCapture(event.pointerId)
  }
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const distance = event.clientX - dragRef.current.startX
    if (Math.abs(distance) > 6) movedRef.current = true
    setPosition(dragRef.current.startPosition - distance / pixelsPerStep)
  }
  const endDrag = () => {
    if (!dragRef.current) return
    dragRef.current = null
    setDragging(false)
    setPosition(value => Math.round(value))
  }

  return <section id="showcase" className="showcase-section page-container" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
    <div className="showcase-heading"><div><span className="eyebrow-v2">{c.eyebrow}</span><h2>{c.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</h2></div><p>{c.text}</p></div>
    <div className="showcase-stage" ref={stageRef} role="group" aria-roledescription="carousel" aria-label={c.title.replace('\n', ' ')} tabIndex={0} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={event => { if (event.key === 'ArrowLeft') go(-1); if (event.key === 'ArrowRight') go(1) }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}>
      <div className={`showcase-track ${dragging ? 'dragging' : ''}`}>
        {items.map((skin, index) => {
          const offset = ringOffset(index, position, total)
          const distance = Math.abs(offset)
          const center = distance < .5
          const visible = distance <= 4.2
          const style = cardStyle(offset, params)
          return <article className={`showcase-card ${center ? 'active' : ''}`} aria-hidden={!visible} style={{ width: params.cardWidth, ...style, opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }} key={skin.id}>
            <img src={skin.image} alt={`${isZh ? skin.name : skin.englishName || skin.name} preview`} draggable={false} />
            <div className="showcase-card-shade" />
            {!center && <button data-carousel-action aria-label={`${isZh ? '切换到' : 'Show'} ${isZh ? skin.name : skin.englishName || skin.name}`} onClick={() => setPosition(value => Math.round(value) + Math.round(offset))} />}
            {center && <div className="showcase-card-content"><div><span>{localizeCategory(skin.category, locale)} · {isZh ? '免费' : 'Free'}</span><h3>{isZh ? skin.name : skin.englishName || skin.name}</h3></div><div className="showcase-card-actions"><Link data-carousel-action to={`/skins/${skin.id}`}><Sparkles />{c.view}</Link><Link data-carousel-action className="primary" to={`/install/${skin.id}`}><Download />{c.install}</Link></div></div>}
          </article>
        })}
      </div>
      <button data-carousel-action className="showcase-arrow showcase-arrow-left" aria-label={c.prev} onClick={() => go(-1)}><ArrowLeft /></button>
      <button data-carousel-action className="showcase-arrow showcase-arrow-right" aria-label={c.next} onClick={() => go(1)}><ArrowRight /></button>
    </div>
    <div className="showcase-footer"><div className="showcase-progress" aria-live="polite"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span>/ {String(total).padStart(2, '0')}</span><small>{activeSkin && (isZh ? activeSkin.name : activeSkin.englishName || activeSkin.name)} · {total} {c.count}</small></div><div className="showcase-dots">{items.map((skin, index) => <button data-carousel-action className={index === activeIndex ? 'active' : ''} aria-label={`${isZh ? '切换到' : 'Show'} ${isZh ? skin.name : skin.englishName || skin.name}`} onClick={() => setPosition(index)} key={skin.id} />)}</div><Link className="text-link" to="/skins">{c.gallery}<ArrowRight /></Link></div>
  </section>
}
