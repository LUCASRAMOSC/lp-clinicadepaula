/**
 * Conteúdo editorial do hero. Nenhum slide atribui procedimentos ou resultados
 * não confirmados à clínica.
 *
 * Para publicar fotografias oficiais:
 * 1. Coloque os arquivos otimizados em public/images/hero/.
 * 2. Preencha image com src (e mobileSrc opcional) no slide desejado.
 * 3. O texto e os botões aparecerão sobre a fotografia automaticamente.
 *
 * Exemplo:
 * image: {
 *   src: '/images/hero/acolhimento-desktop.webp',
 *   mobileSrc: '/images/hero/acolhimento-mobile.webp',
 * },
 */
export interface HeroSlide {
  id: string
  eyebrow: string
  titleBefore: string
  accent: string
  titleAfter: string
  description: string
  cta: string
  href: '#tratamentos' | '#equipe' | '#experiencia' | '#contato'
  theme: 'ink' | 'sage' | 'cream' | 'cocoa' | 'pearl'
  image?: {
    src: string
    mobileSrc?: string
  }
}

export const heroSlides: readonly HeroSlide[] = [
  {
    id: 'essencia',
    eyebrow: 'CLÍNICA DE PAULA · ESTÉTICA E CUIDADO',
    titleBefore: 'Sua ',
    accent: 'essência',
    titleAfter: ' merece ser celebrada.',
    description: 'Um espaço de acolhimento, atenção e cuidado pensado para você.',
    cta: 'Explore nossos cuidados',
    href: '#tratamentos',
    theme: 'ink',
  },
  {
    id: 'cuidados',
    eyebrow: 'POSSIBILIDADES DE CUIDADO',
    titleBefore: 'Cuidado em cada ',
    accent: 'detalhe',
    titleAfter: '.',
    description: 'Conheça os tratamentos que serão apresentados pela Clínica de Paula.',
    cta: 'Ver tratamentos',
    href: '#tratamentos',
    theme: 'sage',
  },
  {
    id: 'pessoas',
    eyebrow: 'QUEM CUIDA DE VOCÊ',
    titleBefore: 'Cuidado feito por ',
    accent: 'pessoas',
    titleAfter: '.',
    description: 'Conheça Bárbara e Beatriz e descubra quem está por trás da clínica.',
    cta: 'Conheça nossa equipe',
    href: '#equipe',
    theme: 'cream',
  },
  {
    id: 'experiencia',
    eyebrow: 'CONHEÇA O ESPAÇO',
    titleBefore: 'Um espaço para ',
    accent: 'você',
    titleAfter: '.',
    description: 'Um olhar mais próximo dos ambientes e dos detalhes da Clínica de Paula.',
    cta: 'Explore a clínica',
    href: '#experiencia',
    theme: 'cocoa',
  },
  {
    id: 'conversa',
    eyebrow: 'SEU MOMENTO COMEÇA AQUI',
    titleBefore: 'Seu próximo ',
    accent: 'momento',
    titleAfter: ' começa aqui.',
    description: 'O próximo passo pode começar com uma conversa e um olhar atento para você.',
    cta: 'Entre em contato',
    href: '#contato',
    theme: 'pearl',
  },
] as const
