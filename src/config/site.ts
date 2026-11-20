/** Dados de marca e navegação: únicos pontos de alteração por cliente. */
export interface TeamPortrait {
  src: string
  mobileSrc?: string
  alt: string
  position?: 'center' | 'top' | 'bottom'
}

export const site = {
  name: 'Clínica de Paula',
  tagline: 'Estética facial e corporal',
  title: 'Clínica de Paula | Estética facial e corporal',
  description:
    'Conheça a Clínica de Paula, nossa equipe e nossas possibilidades de cuidado. Site em preparação.',
  navigation: [
    { label: 'Início', href: '#inicio' },
    { label: 'Tratamentos', href: '#tratamentos' },
    { label: 'Equipe', href: '#equipe' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Contato', href: '#contato' },
  ],
  professionals: [
    {
      id: 'barbara',
      name: 'Bárbara',
      role: 'Profissional da clínica',
      focus: 'Sorrisos e cuidado dental',
      intro: 'Atenção aos detalhes que fazem parte de cada sorriso.',
      services: ['Lentes em resina', 'Clareamento e limpeza dental', 'Próteses dentárias'],
      // Quando a foto oficial estiver aprovada, usar /images/team/barbara.webp.
      // Informar alt fiel à imagem; mobileSrc permite enquadramento específico no iPhone.
      portrait: null as TeamPortrait | null,
    },
    {
      id: 'beatriz',
      name: 'Beatriz',
      role: 'Profissional da clínica',
      focus: 'Cuidado facial e corporal',
      intro: 'Uma experiência de cuidado que respeita as particularidades de cada pessoa.',
      services: ['Drenagem linfática', 'Microagulhamento facial', 'Peeling'],
      portrait: null as TeamPortrait | null,
    },
  ],
} as const
