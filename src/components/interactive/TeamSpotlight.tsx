import { useState, type KeyboardEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

interface Professional {
  id: string
  name: string
  focus: string
  intro: string
  services: readonly string[]
}

interface TeamSpotlightProps {
  professionals: readonly Professional[]
  portrait: {
    src: string
    alt: string
  }
}

/**
 * Uma única fotografia das duas profissionais + conteúdo em abas.
 * A foto permanece inalterada ao selecionar cada profissional.
 * Beatriz está à esquerda e Bárbara à direita na fotografia.
 */
export default function TeamSpotlight({ professionals, portrait }: TeamSpotlightProps) {
  // A ordem das abas acompanha a disposição física das profissionais na foto.
  const ordered = [
    ...professionals.filter((professional) => professional.id === 'beatriz'),
    ...professionals.filter((professional) => professional.id === 'barbara'),
  ]
  const [activeId, setActiveId] = useState('beatriz')
  const activeProfessional = ordered.find((professional) => professional.id === activeId) ?? ordered[0]

  if (!activeProfessional) return null

  function handleTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let index: number | null = null
    const selectedIndex = ordered.findIndex((professional) => professional.id === activeProfessional.id)

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') index = (selectedIndex + 1) % ordered.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') index = (selectedIndex + ordered.length - 1) % ordered.length
    if (event.key === 'Home') index = 0
    if (event.key === 'End') index = ordered.length - 1

    if (index === null) return
    event.preventDefault()
    const nextId = ordered[index].id
    setActiveId(nextId)
    document.getElementById(`team-tab-${nextId}`)?.focus()
  }

  return (
    <div className="team-spotlight">
      <div className="team-spotlight__media-shell">
        <div className="team-spotlight__photo-heading" aria-hidden="true">
          <span>RETRATO DA EQUIPE</span>
          <span>01 — 02</span>
        </div>

        <figure className="team-spotlight__media">
          <img
            className="team-spotlight__image"
            src={portrait.src}
            alt={portrait.alt}
            width={1080}
            height={1350}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="team-spotlight__caption">
            <span className="team-spotlight__caption-kicker">Clínica de Paula</span>
            <strong className="team-spotlight__caption-title">Beatriz <span aria-hidden="true">&amp;</span> Bárbara</strong>
            <span className="team-spotlight__caption-subtitle">Duas profissionais, um cuidado atento a cada detalhe.</span>
          </figcaption>
        </figure>
        <p className="team-spotlight__photo-footnote">Da esquerda para a direita: Dra. Beatriz e Dra. Bárbara.</p>
      </div>

      <div className="team-spotlight__panel">
        <div className="team-spotlight__panel-topline">
          <span className="team-spotlight__rule" aria-hidden="true" />
          <p>Conheça quem está por trás de cada cuidado.</p>
        </div>

        <div
          className="team-spotlight__tabs"
          role="tablist"
          aria-label="Conheça as profissionais"
          onKeyDown={handleTabsKeyDown}
        >
          {ordered.map((professional) => {
            const selected = professional.id === activeProfessional.id
            return (
              <button
                key={professional.id}
                type="button"
                role="tab"
                id={`team-tab-${professional.id}`}
                aria-selected={selected}
                aria-controls="team-spotlight-panel"
                tabIndex={selected ? 0 : -1}
                className={`team-spotlight__tab${selected ? ' is-active' : ''}`}
                onClick={() => setActiveId(professional.id)}
              >
                <span className="team-spotlight__tab-name">Dra. {professional.name}</span>
                <span className="team-spotlight__tab-focus">{professional.focus}</span>
              </button>
            )
          })}
        </div>

        <div
          className="team-spotlight__content"
          role="tabpanel"
          id="team-spotlight-panel"
          aria-labelledby={`team-tab-${activeProfessional.id}`}
          tabIndex={0}
        >
          <p className="team-spotlight__eyebrow">Equipe clínica</p>
          <h3 className="team-spotlight__title">Dra. {activeProfessional.name}</h3>
          <p className="team-spotlight__focus">{activeProfessional.focus}</p>
          <p className="team-spotlight__intro">{activeProfessional.intro}</p>

          <div className="team-spotlight__services-block">
            <p className="team-spotlight__services-title">Áreas de cuidado</p>
            <ul className="team-spotlight__services">
              {activeProfessional.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <a className="team-spotlight__cta" href="#contato">
            Falar com a clínica
            <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}
