import { project, STATUS, subProject } from "../class/projectClass";

const projectNames: string[] = [
  "SistemaGestãoDeProjetos",
  "AplicativoDeSaúde",
  "PlataformaECommerce",
  "ChatBotAtendimento",
  "SistemaControleEstoque",
  "GestorFinanceiroPessoal",
  "AplicativoTreinamentoFísico",
  "SistemaBiblioteca",
  "RedeSocialEstudantil",
  "FerramentaDesenvolvimentoWeb",
  "SistemaAgendamentoConsultas",
  "PlataformaEducaçãoOnline",
  "AplicativoDeliveryComida",
  "SistemaMonitoramentoIoT",
  "GestãoDeEventos",
  "PlataformaStreamingVídeo",
  "AplicativoViagensTurismo",
  "SistemaAnáliseDados",
  "FerramentaDesenvolvimentoMobile",
  "AplicativoMúsica",
  "SistemaSegurançaInformação",
  "AplicativoGestãoImobiliária",
  "PlataformaCrowdfunding",
  "SistemaGerenciamentoProjetos",
  "AplicativoEstudosIdiomas",
  "FerramentaMarketingDigital",
  "SistemaGestãoVendas",
  "AplicativoControleFreelancer",
  "PlataformaConsultoriaOnline",
  "SistemaAutenticaçãoBiométrica"
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

export function getRandomEnumValue(): STATUS {
  const enumValues = Object.values(STATUS).filter(value => typeof value === 'number')
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex] as STATUS
}

export function generateSubProject(): subProject[] {
  const subProjectArray:subProject[] = []

  for (let x = 0; x < (Math.floor(Math.random() * 5)); x++) {
    const name = projectNames[Math.floor(Math.random() * projectNames.length)]
    const url = 'https://github.com/oOHimuraOo/'
    const description = `essa é uma descrição padrão do subprojeto ${name}`
    const conclusion = `essa é uma conclusão padrão do subprojeto ${name}`
    const icon = 'http://via.placeholder.com/25x25'
    const status = getRandomEnumValue()
    const tech = tecnologiasDeProgramacao[Math.floor(Math.random() * tecnologiasDeProgramacao.length)]

    const newSubproject = new subProject(name, url, description, conclusion, status, icon, tech, "not avaible")
    subProjectArray.push(newSubproject)
  }

  return subProjectArray
}

export function genearateProjects(): project[] {
  const projectArray:project[] = []

  for (let x = 0; x < (Math.floor(Math.random() * 1000) + 1); x++) {
    const name = projectNames[Math.floor(Math.random() * projectNames.length)]
    const url = 'https://github.com/oOHimuraOo/'
    const description = `essa é uma descrição padrão do projeto ${name}`
    const conclusion = `essa é uma conclusão padrão do projeto ${name}`
    const subProjects = generateSubProject()
    const icon = 'http://via.placeholder.com/25x25'
    const status = getRandomEnumValue()
    const tech = tecnologiasDeProgramacao[Math.floor(Math.random() * tecnologiasDeProgramacao.length)]

    const newProject = new project(name, subProjects, url, description, conclusion, status, icon, tech, "not avaible")

    projectArray.push(newProject)
  }

  return projectArray
}
