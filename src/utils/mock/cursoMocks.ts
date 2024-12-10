import { curso } from "../class/cursoClass";
import { getRandomEnumValue } from "./projectMocks";

const cursosDeProgramacao = [
  "Iniciação à Codificação Criativa",
  "Desenvolvimento de Jogos 3D",
  "Programação Funcional com Haskell",
  "Algoritmos para Inteligência Artificial",
  "Criação de Aplicativos Mobile",
  "Desenvolvimento de Softwares Empresariais",
  "Python para Análise de Dados",
  "Desenvolvimento Web Avançado",
  "Introdução ao Machine Learning",
  "Programação Segura e Criptografia",
  "Desenvolvimento de APIs com Node.js",
  "Desenvolvimento de Realidade Aumentada",
  "Programação Assíncrona em JavaScript",
  "Design de Sistemas com Microserviços",
  "Automatização com Scripts em Python",
  "Desenvolvimento Full-Stack",
  "Engenharia de Software Ágil",
  "Big Data e Computação em Nuvem",
  "Desenvolvimento de Jogos 2D com Unity",
  "Programação Orientada a Objetos com Java"
];

const escolasDeProgramacao = [
  "Academia de Codificação Inovadora",
  "Escola de Desenvolvimento Futuro",
  "Instituto de Programação Global",
  "Coders do Amanhã",
  "Universidade Tech Start",
  "Centro de Estudos em Algoritmos",
  "Faculdade de Tecnologia e Inovação",
  "Colégio de Engenharia de Software",
  "Escola de Codificação Digital",
  "Centro de Formação em TI",
  "Academia de Programadores",
  "Instituto de Ciência da Computação",
  "Universidade do Futuro Digital",
  "Centro de Excelência em Programação",
  "Academia de Software Moderno",
  "Escola de Codificação Avançada",
  "Instituto de Desenvolvimento Web",
  "Colégio de Programação e Engenharia",
  "Centro Educacional TechWave",
  "Escola de Tecnologias Emergentes"
];

const tecnologiasDeProgramacao = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "Ruby on Rails",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Django",
  "Spring Boot",
  "Flutter",
  "Kotlin",
  "Swift",
  "SQL",
  "MongoDB",
  "GraphQL",
  "Docker",
  "Kubernetes",
  "TensorFlow"
];



export function generateCurses() {
  const arrayDeCursos: curso[] = []

  for (let x = 0; x < Math.floor(Math.random() * 100); x++) {
    const name = cursosDeProgramacao[Math.floor(Math.random() * cursosDeProgramacao.length)]
    const entidade = escolasDeProgramacao[Math.floor(Math.random() * escolasDeProgramacao.length)]
    const tecnologia = tecnologiasDeProgramacao[Math.floor(Math.random() * tecnologiasDeProgramacao.length)]
    const codigoCertificado = '11s211sr325'
    const status = getRandomEnumValue()
    const icon = 'https://via.placholder.com/300x300'
    const descricao = 'essa é a descrição de um curso'
    const link = 'https://www.google.com'

    const novoCurso = new curso(name, entidade, tecnologia, codigoCertificado, status,icon, descricao, link)
    arrayDeCursos.push(novoCurso)
  }

  return arrayDeCursos
}
