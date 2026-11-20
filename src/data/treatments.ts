/**
 * Áreas de cuidado exibidas no índice. Antes de publicar, confirmar com a
 * clínica os nomes, os serviços oferecidos e as fotografias autorizadas.
 *
 * Para adicionar imagem real (WebP/AVIF otimizado), preencha em cada item:
 * image: {
 *   src: '/images/treatments/facial.webp',
 *   mobileSrc: '/images/treatments/facial-mobile.webp', // opcional
 *   alt: 'Descrição fiel da fotografia',
 *   position: 'center', // 'top' ou 'bottom' opcionais
 * },
 *
 * Armazene as imagens em public/images/treatments/.
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
    position?: 'center' | 'top' | 'bottom'
  }
}

export const treatments: readonly TreatmentItem[] = [
  {
    id: 'botox',
    number: '01',
    eyebrow: 'ESTÉTICA FACIAL',
    title: 'Botox',
    teaser: 'Cuidado facial com avaliação individualizada.',
    description:
      'A aplicação da toxina botulínica é planejada de forma individual, conforme a avaliação profissional e as características de cada pessoa.',
    variant: 'feature',
    image: {
      src: '/images/treatments/botox.webp',
      alt: 'Profissional realizando atendimento estético na região da testa de uma paciente.',
      position: 'center',
    },
  },
  {
    id: 'corporal',
    number: '02',
    eyebrow: 'ÁREA DE CUIDADO',
    title: 'Estética corporal',
    teaser: 'Um espaço para olhar com carinho para você.',
    description:
      'Conheça nossa área de estética corporal e tire suas dúvidas sobre as possibilidades de atendimento.',
    variant: 'sand',
  },
  {
    id: 'destaque',
    number: '03',
    eyebrow: 'EXPLORE NOSSOS CUIDADOS',
    title: 'Em destaque',
    teaser: 'Descubra o cuidado que faz sentido para seu momento.',
    description:
      'Cada pessoa tem suas prioridades. Entre em contato para saber mais sobre as opções da Clínica de Paula.',
    variant: 'blush',
  },
  {
    id: 'possibilidades',
    number: '04',
    eyebrow: 'MAIS SOBRE A CLÍNICA',
    title: 'Outras possibilidades',
    teaser: 'Novos caminhos para conhecer e explorar.',
    description:
      'Seu próximo passo pode começar por uma conversa. Fale com nossa equipe para conhecer os atendimentos disponíveis.',
    variant: 'taupe',
  },
] as const
