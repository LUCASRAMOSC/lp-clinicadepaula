import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '../../data/heroSlides'
import '../../styles/hero-motion.css'

const AUTOPLAY_DELAY = 6500

/**
 * Carrossel editorial com navegação por toque, avanço automático e opção de pausa.
 * A fotografia é opcional; quando existir, recebe a copy por cima via CSS.
 */
export default function HeroMotion() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const rescheduleRef = useRef<(() => void) | null>(null)
  const manuallyPausedRef = useRef(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [selected, setSelected] = useState(0)
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'start',
    duration: 32,
  })

  const goTo = useCallback((index: number) => {
    embla?.scrollTo(index)
    rescheduleRef.current?.()
  }, [embla])

  const goPrev = useCallback(() => {
    embla?.scrollPrev()
    rescheduleRef.current?.()
  }, [embla])

  const goNext = useCallback(() => {
    embla?.scrollNext()
    rescheduleRef.current?.()
  }, [embla])

  const toggleAutoplay = () => {
    const next = !manuallyPausedRef.current
    manuallyPausedRef.current = next
    setManuallyPaused(next)
    rescheduleRef.current?.()
  }

  useEffect(() => {
    if (!embla || !sectionRef.current) return

    const section = sectionRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const hoverCapability = window.matchMedia('(hover: hover) and (pointer: fine)')

    let timer: number | undefined
    let visible = false
    let hovering = false
    let focused = false
    let dragging = false
    let prefersReducedMotion = motionPreference.matches

    setReducedMotion(prefersReducedMotion)

    const schedule = () => {
      window.clearTimeout(timer)
      timer = undefined
      if (
        !visible ||
        document.hidden ||
        hovering ||
        focused ||
        dragging ||
        manuallyPausedRef.current ||
        prefersReducedMotion
      ) return

      timer = window.setTimeout(() => embla.scrollNext(), AUTOPLAY_DELAY)
    }

    rescheduleRef.current = schedule

    const updateSelection = () => {
      setSelected(embla.selectedScrollSnap())
      schedule()
    }
    const onPointerDown = () => {
      dragging = true
      schedule()
    }
    const onPointerUp = () => {
      dragging = false
      schedule()
    }
    const onMouseEnter = () => {
      if (!hoverCapability.matches) return
      hovering = true
      schedule()
    }
    const onMouseLeave = () => {
      hovering = false
      schedule()
    }
    const onFocusIn = (event: FocusEvent) => {
      // Cliques/toques não devem deixar o autoplay pausado indefinidamente.
      if (!(event.target instanceof HTMLElement) || !event.target.matches(':focus-visible')) return
      focused = true
      schedule()
    }
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && section.contains(event.relatedTarget)) return
      focused = false
      schedule()
    }
    const onMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches
      setReducedMotion(event.matches)
      schedule()
    }

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting && entry.intersectionRatio >= 0.2
          schedule()
        }, { threshold: [0, 0.2, 0.5] })
      : null

    if (observer) observer.observe(section)
    else visible = true

    embla.on('select', updateSelection)
    embla.on('reInit', updateSelection)
    embla.on('pointerDown', onPointerDown)
    embla.on('pointerUp', onPointerUp)
    section.addEventListener('mouseenter', onMouseEnter)
    section.addEventListener('mouseleave', onMouseLeave)
    section.addEventListener('focusin', onFocusIn)
    section.addEventListener('focusout', onFocusOut)
    document.addEventListener('visibilitychange', schedule)
    motionPreference.addEventListener('change', onMotionChange)
    updateSelection()

    return () => {
      window.clearTimeout(timer)
      rescheduleRef.current = null
      observer?.disconnect()
      embla.off('select', updateSelection)
      embla.off('reInit', updateSelection)
      embla.off('pointerDown', onPointerDown)
      embla.off('pointerUp', onPointerUp)
      section.removeEventListener('mouseenter', onMouseEnter)
      section.removeEventListener('mouseleave', onMouseLeave)
      section.removeEventListener('focusin', onFocusIn)
      section.removeEventListener('focusout', onFocusOut)
      document.removeEventListener('visibilitychange', schedule)
      motionPreference.removeEventListener('change', onMotionChange)
    }
  }, [embla])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="section-anchor motion-hero"
      role="region"
      aria-label="Destaques da Clínica de Paula"
      aria-roledescription="carrossel"
    >
      <div className="motion-hero__frame page-container">
        <div className="motion-hero__intro">
          <span className="motion-hero__eyebrow">
            <span className="motion-hero__metal-line" aria-hidden="true" />
            ESTÉTICA COM IDENTIDADE
          </span>
          <p className="motion-hero__intro-note">Um convite para se cuidar.</p>
        </div>

        <div className="motion-hero__stage">
          <div className="motion-hero__viewport" ref={emblaRef}>
            <div className="motion-hero__track">
              {heroSlides.map((slide, index) => {
                const isSelected = selected === index
                return (
                  <article
                    key={slide.id}
                    className={`motion-hero__slide motion-hero__slide--${slide.theme}${slide.image ? ' has-image' : ''}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} de ${heroSlides.length}: ${slide.titleBefore}${slide.accent}${slide.titleAfter}`}
                    aria-hidden={!isSelected}
                    inert={!isSelected}
                  >
                    {slide.image && (
                      <picture className="motion-hero__media" aria-hidden="true">
                        {slide.image.mobileSrc && <source media="(max-width: 699px)" srcSet={slide.image.mobileSrc} />}
                        <img
                          className="motion-hero__image"
                          src={slide.image.src}
                          alt=""
                          loading={index === 0 ? 'eager' : 'lazy'}
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          decoding="async"
                        />
                      </picture>
                    )}
                    <div className="motion-hero__content">
                      <p className="motion-hero__kicker">{slide.eyebrow}</p>
                      {index === 0 ? (
                        <h1 className="motion-hero__title">
                          {slide.titleBefore}<em>{slide.accent}</em>{slide.titleAfter}
                        </h1>
                      ) : (
                        <h2 className="motion-hero__title">
                          {slide.titleBefore}<em>{slide.accent}</em>{slide.titleAfter}
                        </h2>
                      )}
                      <p className="motion-hero__description">{slide.description}</p>
                      <a className="motion-hero__cta" href={slide.href}>
                        {slide.cta}
                        <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
                      </a>
                    </div>
                    {!slide.image && (
                      <div className="motion-hero__art" aria-hidden="true">
                        <div className="motion-hero__art-ring" />
                        <span className="motion-hero__art-mark">0{index + 1}</span>
                        <span className="motion-hero__art-label">CLÍNICA DE PAULA</span>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>

          <div className="motion-hero__floating-arrows" aria-label="Navegação do carrossel">
            <button type="button" onClick={goPrev} aria-label="Slide anterior" className="motion-hero__arrow motion-hero__arrow--prev">
              <ChevronLeft size={23} strokeWidth={1.55} aria-hidden="true" />
            </button>
            <button type="button" onClick={goNext} aria-label="Próximo slide" className="motion-hero__arrow motion-hero__arrow--next">
              <ChevronRight size={23} strokeWidth={1.55} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="motion-hero__controls">
          <div className="motion-hero__progress" aria-label="Ir para um destaque">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`motion-hero__progress-button${index === selected ? ' is-current' : ''}`}
                aria-label={`Ir para o destaque ${index + 1}`}
                aria-current={index === selected ? 'true' : undefined}
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="motion-hero__count" aria-live="off">
            {String(selected + 1).padStart(2, '0')} <span>/ {String(heroSlides.length).padStart(2, '0')}</span>
          </span>
          {!reducedMotion && (
            <button
              type="button"
              className="motion-hero__autoplay-toggle"
              onClick={toggleAutoplay}
              aria-label={manuallyPaused ? 'Retomar rotação automática dos slides' : 'Pausar rotação automática dos slides'}
              aria-pressed={manuallyPaused}
              title={manuallyPaused ? 'Reproduzir' : 'Pausar'}
            >
              {manuallyPaused ? <Play size={15} fill="currentColor" aria-hidden="true" /> : <Pause size={15} fill="currentColor" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
