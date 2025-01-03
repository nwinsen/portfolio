export interface ProjectImage {
  src: string;
  pos: number;
}

export const MyProjects = [
  {
    title: "League Of Lookup",
    img: { src: "/league.png", pos: 20 },
    subtitle: "Grab your League Of Legends stats!",
    description:
      "A full-stack application that allows users to search for their League Of Legends stats, similar to op.gg.",
    links: [
      {
        title: "View on GitHub",
        url: "https://github.com/nwinsen/computer-project",
      },
    ],
  },
  {
    title: "BestBet",
    img: { src: "/bestbet.png", pos: 50 },
    subtitle: "Betting aggregation site for sports games",
    description:
      "Scrapes betting odds from various sportsbooks and displays what we think is the best pick of them in a user-friendly manner.",
    links: [
      {
        title: "View on GitHub",
        url: "https://github.com/Ajmicco18/HackYSU-2024",
      },
    ],
  },
  {
    title: "ASLingo",
    img: { src: "/aslingo.jpg", pos: 20 },
    subtitle: "First place at HackYSU 2023!",
    description:
      "A language learning app that teaches American Sign Language through a Duolingo-style type app.",
    links: [
      { title: "View on GitHub", url: "https://github.com/nwinsen/hackysu" },
    ],
  },
];
