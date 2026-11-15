import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CalendarDays, Menu, X } from 'lucide-react'
import '../../styles/navigation.css'

interface NavigationItem {
  label: string
  href: string
}

interface SmartNavigationProps {
  brandName: string
  items: readonly NavigationItem[]
}

/**
 * Cabeçalho interativo. O <header> sticky fica no Astro; apenas os controles
 * precisam de hidratação React. Os links seguem funcionando sem JavaScript.
 */
export default function SmartNavigation({ brandName, items }: SmartNavigationProps) {
  const firstId = items[0]?.href.slice(1) ?? 'inicio'
  const [activeId, setActiveId] = useState(firstId)
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const mobileRailRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null)

  // IntersectionObserver + scroll passivo com rAF: precisão mesmo em seções longas e no Safari.
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.replace(/^#/, '')))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const update = () => {
      const header = document.querySelector<HTMLElement>('.smart-header')
      const line = (header?.getBoundingClientRect().bottom ?? 110) + 44
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
      let current = sections[0].id

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id
      }
      if (atEnd) current = sections[sections.length - 1].id
      setActiveId((previous) => previous === current ? previous : current)
    }

    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(schedule, { rootMargin: '-15% 0px -65% 0px' })
      : null
    sections.forEach((section) => observer?.observe(section))
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    update()

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      cancelAnimationFrame(frame)
    }
  }, [items])

  // Mantém o item ativo visível na barra horizontal, inclusive em telas estreitas.
  useEffect(() => {
    const rail = mobileRailRef.current
    const item = rail && [...rail.querySelectorAll<HTMLAnchorElement>('a')]
      .find((link) => link.hash === `#${activeId}`)
    if (!rail || !item) return

    const railRect = rail.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const offset = itemRect.left + itemRect.width / 2 - railRect.left - railRect.width / 2
    rail.scrollTo({
      left: rail.scrollLeft + offset,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [activeId, reducedMotion])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 960px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  // Menu acessível: Escape, foco inicial e clique fora.
  useEffect(() => {
    if (!menuOpen) return

    const focusFrame = requestAnimationFrame(() => firstMenuItemRef.current?.focus({ preventScroll: true }))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus({ preventScroll: true })
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return
      if (menuRef.current?.contains(event.target) || toggleRef.current?.contains(event.target)) return
      setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  function handleNavigation(href: string) {
    setActiveId(href.replace(/^#/, ''))
    setMenuOpen(false)
  }

  function pills(variant: 'desktop' | 'mobile') {
    return items.map((item) => {
      const id = item.href.replace(/^#/, '')
      const selected = id === activeId
      return (
        <a
          key={`${variant}-${id}`}
          href={item.href}
          aria-current={selected ? 'location' : undefined}
          className={`smart-nav__pill${selected ? ' is-active' : ''}`}
          onClick={() => handleNavigation(item.href)}
        >
          {selected && (
            <motion.span
              className="smart-nav__indicator"
              layoutId={`active-pill-${variant}`}
              initial={false}
              transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 39 }}
              aria-hidden="true"
            />
          )}
          <span className="smart-nav__pill-label">{item.label}</span>
        </a>
      )
    })
  }

  return (
    <div className="smart-header__content">
      <div className="smart-header__top">
        <a className="smart-header__brand" href="#inicio" onClick={() => handleNavigation('#inicio')}>
          <span className="smart-header__brand-name">{brandName}</span>
          <span className="smart-header__brand-subtitle">Estética e cuidado</span>
        </a>

        <nav className="smart-nav smart-nav--desktop" aria-label="Seções principais">
          {pills('desktop')}
        </nav>

        <div className="smart-header__actions">
          <a className="smart-header__contact" href="#contato" aria-label="Ir para contato e agendamento" onClick={() => handleNavigation('#contato')}>
            <CalendarDays size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Agendar</span>
          </a>
          <button
            ref={toggleRef}
            className="smart-header__menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="smart-mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={21} strokeWidth={1.8} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav ref={mobileRailRef} className="smart-nav smart-nav--mobile" aria-label="Navegação rápida por seções">
        {pills('mobile')}
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            ref={menuRef}
            id="smart-mobile-menu"
            className="smart-header__menu-panel"
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            <span className="smart-header__menu-eyebrow">Explore a clínica</span>
            <nav aria-label="Menu completo">
              {items.map((item, index) => (
                <a
                  key={item.href}
                  ref={index === 0 ? firstMenuItemRef : undefined}
                  href={item.href}
                  aria-current={item.href === `#${activeId}` ? 'location' : undefined}
                  onClick={() => handleNavigation(item.href)}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
