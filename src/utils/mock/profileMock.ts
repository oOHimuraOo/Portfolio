import { profile } from "../class/profileClass";

const nomesDePessoas = [
  "Ana Clara",
  "João Pedro",
  "Maria Eduarda",
  "Lucas Henrique",
  "Beatriz Souza",
  "Gabriel Silva",
  "Lara Oliveira",
  "Matheus Almeida",
  "Isabela Lima",
  "Rafael Costa",
  "Carolina Mendes",
  "Henrique Santos",
  "Alice Ferreira",
  "Felipe Ribeiro",
  "Laura Nunes",
  "Gustavo Moreira",
  "Valentina Rocha",
  "Caio Andrade",
  "Giovanna Martins",
  "Diego Carvalho"
];

const nicks = [
  "CyberNinja",
  "PixelPirate",
  "QuantumCoder",
  "HackHero",
  "TechWiz",
  "DataDynamo",
  "CodeCrusader",
  "ByteKnight",
  "ScriptSorcerer",
  "NetMaster",
  "AlgorithmAce",
  "SyntaxSamurai",
  "VirtualViking",
  "GigaGuru",
  "DigitalDragon",
  "RoboRanger",
  "MatrixMage",
  "TechTactician",
  "BitBandit",
  "ScriptSavant"
];

const profissoesDeProgramacao = [
  "Desenvolvedor de Software",
  "Engenheiro de Software",
  "Cientista de Dados",
  "Analista de Sistemas",
  "Desenvolvedor Web",
  "Desenvolvedor Mobile",
  "Engenheiro de DevOps",
  "Administrador de Banco de Dados",
  "Desenvolvedor Full-Stack",
  "Especialista em Segurança da Informação",
  "Engenheiro de Machine Learning",
  "Arquiteto de Soluções",
  "Desenvolvedor de Jogos",
  "Analista de Qualidade de Software",
  "Desenvolvedor Front-End",
  "Desenvolvedor Back-End",
  "Engenheiro de Testes",
  "Especialista em Cloud Computing",
  "Desenvolvedor de Inteligência Artificial",
  "Engenheiro de Dados"
];

export function generateProfile() {
  const image = 'https://via.placeholder.com/300x300'
  const name = nomesDePessoas[Math.floor(Math.random() * nomesDePessoas.length)]
  const nickname = nicks[Math.floor(Math.random() * nicks.length)]
  const proffesion = profissoesDeProgramacao[Math.floor(Math.random() * profissoesDeProgramacao.length)]

  const novoProfile = new profile(image, name, nickname, proffesion)
  return novoProfile
}
