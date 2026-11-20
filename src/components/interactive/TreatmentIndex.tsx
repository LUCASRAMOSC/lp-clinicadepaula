import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react'
import { treatments, type TreatmentItem } from '../../data/treatments'
import '../../styles/treatment-index.css'

type TreatmentMediaProps = {
  item: TreatmentItem
  compact?: boolean
}

function TreatmentMedia({ item, compact = false }: TreatmentMediaProps) {
  return (
    <div className={`treatment-index__media treatment-index__media--${item.variant}${compact ? ' treatment-index__media--compact' : ''}`}>
      {item.image ? (
        <picture className="treatment-index__picture">
          {item.image.mobileSrc && <source media="(max-width: 899px)" srcSet={item.image.mobileSrc} />}
          <img src={item.image.src} alt={item.image.alt} loading="lazy" decoding="async" />
        </picture>
      ) : (
        <div className="treatment-index__art" aria-hidden="true">
          <span className="treatment-index__art-brand">CLÍNICA DE PAULA</span>
          <span className="treatment-index__art-rule" />
          <span className="treatment-index__art-number">{item.number}</span>
          <span className="treatment-index__art-caption">FOTOGRAFIA OFICIAL EM PREPARAÇÃO</span>
        </div>
      )}
    </div>
  )
}

/**
 * Índice editorial de tratamentos: não usa carrossel nem modal.
 * No mobile, expande os detalhes no fluxo da página. No desktop,
 * atualiza um painel lateral de prévia, sem deslocar o usuário.
 */
export default function TreatmentIndex() {
  const [activeId, setActiveId] = useState(treatments[0]?.id ?? '')
  const reducedMotion = useReducedMotion()
  const activeItem = treatments.find((item) => item.id === activeId) ?? treatments[0]
  const transition = { duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] as const }

  return (
    <section id="tratamentos" className="section-anchor treatment-index" aria-labelledby="treatment-index-title">
      <div className="treatment-index__container">
        <div className="treatment-index__heading">
          <p className="treatment-index__eyebrow"><span aria-hidden="true" /> TRATAMENTOS</p>
          <h2 id="treatment-index-title">O cuidado começa <em>na escolha.</em></h2>
          <p>Explore nossas áreas de cuidado. Os procedimentos específicos serão incluídos após a confirmação da clínica.</p>
        </div>

        <div className="treatment-index__layout">
          <div className="treatment-index__list" aria-label="Áreas de cuidado">
            {treatments.map((item) => {
              const selected = activeId === item.id
              return (
                <div key={item.id} className={`treatment-index__entry${selected ? ' is-active' : ''}`}>
                  <button
                    type="button"
                    className="treatment-index__trigger"
                    aria-expanded={selected}
                    aria-controls={`treatment-inline-${item.id}`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="treatment-index__number">{item.number}</span>
                    <span className="treatment-index__item-text">
                      <span className="treatment-index__item-title">{item.title}</span>
                      <span className="treatment-index__item-teaser">{item.teaser}</span>
                    </span>
                    <span className="treatment-index__item-icon" aria-hidden="true">
                      {selected ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <motion.div
                    id={`treatment-inline-${item.id}`}
                    className="treatment-index__inline"
                    initial={false}
                    animate={{ height: selected ? 'auto' : 0, opacity: selected ? 1 : 0 }}
                    transition={transition}
                    aria-hidden={!selected}
                    inert={!selected}
                  >
                    <div className="treatment-index__inline-inner">
                      <TreatmentMedia item={item} compact />
                      <p>{item.description}</p>
                      <a className="treatment-index__action" href="#contato">Entre em contato <ArrowUpRight size={17} strokeWidth={1.65} aria-hidden="true" /></a>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>

          <div className="treatment-index__desktop-preview" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false}>
              {activeItem && (
                <motion.article
                  key={activeItem.id}
                  className="treatment-index__preview-card"
                  initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={transition}
                >
                  <TreatmentMedia item={activeItem} />
                  <div className="treatment-index__preview-content">
                    <div className="treatment-index__preview-topline"><span>CLÍNICA DE PAULA / CUIDADOS</span><span>{activeItem.number} / {String(treatments.length).padStart(2, '0')}</span></div>
                    <h3>{activeItem.title}</h3>
                    <p>{activeItem.description}</p>
                    <a className="treatment-index__action" href="#contato">Entre em contato <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" /></a>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="treatment-index__notice">Conteúdo em preparação. Os tratamentos e as imagens serão validados com a equipe da clínica.</p>
      </div>
    </section>
  )
}
