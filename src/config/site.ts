/** Dados de marca e navegação: únicos pontos de alteração por cliente. */
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
    { name: 'Bárbara', role: 'Profissional da clínica' },
    { name: 'Beatriz', role: 'Profissional da clínica' },
  ],
} as const
