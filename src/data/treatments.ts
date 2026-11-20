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
    id: 'depilacao-laser',
    number: '02',
    eyebrow: 'DEPILAÇÃO A LASER',
    title: 'Depilação a laser',
    teaser: 'Tecnologia e cuidado para a redução progressiva dos pelos.',
    description:
      'A depilação a laser é planejada conforme as características da pele, dos pelos e da região tratada, com avaliação individual antes do procedimento.',
    variant: 'sand',
    image: {
      src: '/images/treatments/depilacao-laser.webp',
      alt: 'Profissional utilizando equipamento de depilação a laser na região do pescoço de uma paciente com óculos de proteção.',
      position: 'center',
    },
  },
  {
    id: 'preenchimento-labial',
    number: '03',
    eyebrow: 'ESTÉTICA FACIAL',
    title: 'Preenchimento labial',
    teaser: 'Harmonia e definição respeitando os traços naturais.',
    description:
      'O preenchimento labial busca valorizar o contorno e as proporções dos lábios. O planejamento é individualizado, com atenção às características e aos objetivos de cada pessoa.',
    variant: 'blush',
    image: {
      src: '/images/treatments/preenchimento-labial.webp',
      alt: 'Profissional realizando atendimento estético facial em paciente reclinada na clínica.',
      position: 'center',
    },
  },
  {
    id: 'limpeza-de-pele',
    number: '04',
    eyebrow: 'CUIDADOS COM A PELE',
    title: 'Limpeza de pele',
    teaser: 'Cuidado e atenção às necessidades da sua pele.',
    description:
      'A limpeza de pele é um cuidado adaptado às necessidades individuais, que pode incluir higienização e remoção de impurezas, conforme avaliação profissional.',
    variant: 'taupe',
    image: {
      src: '/images/treatments/limpeza-de-pele.webp',
      alt: 'Profissional realizando cuidados faciais em paciente na clínica.',
      position: 'center',
    },
  },
] as const

/** Outras possibilidades de atendimento, exibidas abaixo do índice interativo. */
export const additionalTreatments = [
  {
    professional: 'Dra. Bárbara',
    services: [
      'Lentes em resina',
      'Clareamento e limpeza dental',
      'Próteses dentárias',
    ],
  },
  {
    professional: 'Dra. Beatriz',
    services: [
      'Drenagem linfática',
      'Microagulhamento facial',
      'Peeling',
    ],
  },
] as const
