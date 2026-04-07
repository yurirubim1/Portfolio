export const translations = {
  en: {
    // Nav
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",

    // Hero
    heroTag: "Welcome",
    heroTitle: "Hi, I'm Gazin",
    heroDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroCta: "Explore my projects",
    heroLearnMore: "Learn more",

    // About
    aboutTag: "About me",
    aboutTitle: "Who I am",
    aboutP1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, mi eget laoreet venenatis, sem dolor tincidunt neque, sed gravida est massa a libero.",
    aboutP2:
      "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    aboutYears: "Years experience",
    aboutProjects: "Projects done",
    aboutClients: "Happy clients",

    // Projects
    projectsTag: "Portfolio",
    projectsTitle: "Projects I worked on",
    projectsDescription:
      "A collection of Roblox experiences I've helped build and develop.",
    projectsPlaying: "playing",

    // Contact
    contactTag: "Contact",
    contactTitle: "Get in touch",
    contactDescription:
      "Interested in working together? Feel free to reach out through any of the channels below.",
    contactEmail: "Email",
    contactDiscord: "Discord",
  },
  pt: {
    // Nav
    navHome: "Início",
    navAbout: "Sobre",
    navProjects: "Projetos",
    navContact: "Contato",

    // Hero
    heroTag: "Bem-vindo",
    heroTitle: "Olá, eu sou Gazin",
    heroDescription:
      "[TEXTO EM PORTUGUÊS] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroCta: "Explorar meus projetos",
    heroLearnMore: "Saiba mais",

    // About
    aboutTag: "Sobre mim",
    aboutTitle: "Quem eu sou",
    aboutP1:
      "[TEXTO EM PORTUGUÊS] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, mi eget laoreet venenatis, sem dolor tincidunt neque, sed gravida est massa a libero.",
    aboutP2:
      "[TEXTO EM PORTUGUÊS] Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec id elit non mi porta gravida at eget metus.",
    aboutYears: "Anos de experiência",
    aboutProjects: "Projetos feitos",
    aboutClients: "Clientes satisfeitos",

    // Projects
    projectsTag: "Portfólio",
    projectsTitle: "Projetos que trabalhei",
    projectsDescription:
      "Uma coleção de experiências Roblox que ajudei a construir e desenvolver.",
    projectsPlaying: "jogando",

    // Contact
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
