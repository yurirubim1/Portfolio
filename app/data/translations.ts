export const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",

    heroTag: "Welcome",
    heroTitle: "Hi, I'm Rubim",
    heroDescription:
      "Roblox developer focused on scripting and building engaging experiences on the platform.",
    heroCta: "Explore my projects",
    heroLearnMore: "Learn more",

    aboutTag: "About me",
    aboutTitle: "Who I am",
    aboutP1:
      "I'm a Roblox developer with experience in Lua scripting, gameplay systems, and game mechanics. I focus on delivering solid, well-crafted experiences.",
    aboutP2:
      "I've worked on a variety of project types and enjoy taking on new challenges. I'm always looking to improve and grow as a developer.",
    aboutYears: "Years experience",
    aboutProjects: "Projects done",
    aboutClients: "Happy clients",

    projectsTag: "Portfolio",
    projectsTitle: "Projects I worked on",
    projectsDescription:
      "A collection of Roblox experiences I've helped build and develop.",
    projectsPlaying: "playing",

    contactTag: "Contact",
    contactTitle: "Get in touch",
    contactDescription:
      "Interested in working together? Feel free to reach out through any of the channels below.",
    contactEmail: "Email",
    contactDiscord: "Discord",
  },
  pt: {
    navHome: "Início",
    navAbout: "Sobre",
    navProjects: "Projetos",
    navContact: "Contato",

    heroTag: "Bem-vindo",
    heroTitle: "Olá, eu sou Rubim",
    heroDescription:
      "Desenvolvedor Roblox focado em scripting e na criação de experiências envolventes na plataforma.",
    heroCta: "Explorar meus projetos",
    heroLearnMore: "Saiba mais",

    aboutTag: "Sobre mim",
    aboutTitle: "Quem eu sou",
    aboutP1:
      "Sou um desenvolvedor Roblox com experiência em Lua, sistemas de gameplay e mecânicas de jogo. Foco em entregar experiências bem feitas e consistentes.",
    aboutP2:
      "Já trabalhei em diferentes tipos de projeto e gosto de encarar novos desafios. Estou sempre buscando melhorar e evoluir como desenvolvedor.",
    aboutYears: "Anos de experiência",
    aboutProjects: "Projetos feitos",
    aboutClients: "Clientes satisfeitos",

    projectsTag: "Portfólio",
    projectsTitle: "Projetos que trabalhei",
    projectsDescription:
      "Uma coleção de experiências Roblox que ajudei a construir e desenvolver.",
    projectsPlaying: "jogando",

    contactTag: "Contato",
    contactTitle: "Entre em contato",
    contactDescription:
      "Interessado em trabalhar junto? Fique à vontade para entrar em contato por qualquer um dos canais abaixo.",
    contactEmail: "Email",
    contactDiscord: "Discord",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["en"];
