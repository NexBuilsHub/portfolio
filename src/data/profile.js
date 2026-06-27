export const profile = {
  name: 'Youssef Bouayez',
  title: 'AI Solutions Engineer / SaaS Builder',
  bio: 'AI & Full Stack Engineer with experience building SaaS platforms, AI-powered applications, automation workflows and cloud infrastructure. Specialized in Symfony, Laravel, Next.js, React, PostgreSQL, Docker, AWS, and modern AI tools.',
  keywords: ['RAG Systems', 'Voice AI', 'Multi-Tenant SaaS', 'n8n Automation'],
  contact: {
    email: 'youssefbouayez2@gmail.com',
    phone: '+212 700 768 895',
    location: 'Tangier, Morocco',
  },
  social: {
    github: 'https://github.com/youssef218',
    linkedin: 'https://www.linkedin.com/in/youssef-bouayez-27169224a/',
    whatsapp: '212700768895',
  },
}

export const getCvPath = () => {
  const base = import.meta.env.BASE_URL || '/'
  return `${base}doc/Youssef Bouayez.pdf`
}
