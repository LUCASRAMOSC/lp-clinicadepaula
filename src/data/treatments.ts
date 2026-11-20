/**
 * Conteúdo editorial PROVISÓRIO: os procedimentos, textos técnicos e imagens
 * precisam de validação pela Clínica de Paula antes da publicação.
 *
 * Para adicionar uma fotografia oficial a um card:
 * image: {
 *   src: '/images/treatments/facial.webp',
 *   mobileSrc: '/images/treatments/facial-mobile.webp', // opcional
 *   alt: 'Descrição objetiva da fotografia real',
 * }
 */
export interface TreatmentItem {
  id: string
  number: string
  eyebrow: string
  title: string
  teaser: string
  description: string
  variant: 'feature' | 'sand' | 'blush' | 'taupe'
  image?: {
    src: string
    mobileSrc?: string
    alt: string
  }
}

export const treatments: readonly TreatmentItem[] = [
  {
    id: 'facial',
    number: '01',
    eyebrow: 'ÁREA DE CUIDADO',
    title: 'Estética facial',
    teaser: 'A beleza de cada detalhe merece um olhar atento.',
    description:
      'Os tratamentos faciais, suas características e indicações serão apresentados aqui após a confirmação da equipe da clínica.',
    variant: 'feature',
  },
  {
    id: 'corporal',
    number: '02',
    eyebrow: 'ÁREA DE CUIDADO',
    title: 'Estética corporal',
    teaser: 'Um espaço dedicado às possibilidades do cuidado corporal.',
    description:
      'Este painel receberá as informações dos procedimentos corporais que forem confirmados pela Clínica de Paula.',
    variant: 'sand',
  },
  {
    id: 'destaque',
    number: '03',
    eyebrow: 'A DEFINIR COM A CLÍNICA',
    title: 'Em destaque',
    teaser: 'O lugar de um tratamento que merece ser conhecido.',
    description:
      'Assim que os procedimentos forem definidos, este card apresentará um cuidado em destaque, com uma fotografia e explicação próprias.',
    variant: 'blush',
  },
  {
    id: 'possibilidades',
    number: '04',
    eyebrow: 'A DEFINIR COM A CLÍNICA',
    title: 'Outras possibilidades',
    teaser: 'Novos detalhes para explorar, no seu tempo.',
    description:
      'Reservamos este espaço para completar a seleção de tratamentos. Nenhum procedimento específico será anunciado sem validação.',
    variant: 'taupe',
  },
] as const
