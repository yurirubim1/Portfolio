export const translations = {
  en: {
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",

    heroTag: "Welcome",
    heroTitle: "Hi, I'm Rubim",
    heroDescription:
      "Lua developer passionate about creating fun and engaging experiences on Roblox. I love building games that bring players together and make them smile.",
    heroCta: "Explore my projects",
    heroLearnMore: "Learn more",

    aboutTag: "About me",
    aboutTitle: "Who I am",
    aboutP1:
      "I'm a Roblox developer specializing in Lua scripting. Over the past 2 years I've been crafting gameplay systems, building mechanics, and polishing experiences that players genuinely enjoy. I care deeply about the quality of every game I ship.",
    aboutP2:
      "From physics sandboxes to escape games and idle clickers, I enjoy tackling all kinds of projects. I'm always learning, always iterating, and always looking for ways to make something more fun. Game development isn't just my job — it's what I love to do.",
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
      "Desenvolvedor Lua apaixonado por criar experiências divertidas no Roblox. Adoro criar jogos que unem jogadores e os fazem sorrir.",
    heroCta: "Explorar meus projetos",
    heroLearnMore: "Saiba mais",

    aboutTag: "Sobre mim",
    aboutTitle: "Quem eu sou",
    aboutP1:
      "Sou um desenvolvedor Roblox especializado em Lua. Nos últimos 2 anos venho criando sistemas de gameplay, mecânicas e experiências que os jogadores realmente curtem.",
    aboutP2:
      "De sandboxes de física a jogos de fuga e idle clickers, gosto de encarar todo tipo de projeto. Desenvolvimento de jogos não é só o meu trabalho — é o que eu amo fazer.",
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
