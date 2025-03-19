import database from './data.json'

export interface perfilData {
  nome: string
  usuario: string
  imagem: string
  description: string
}

export interface subprojectData {
  [key: string]: {
    name: string
    description: string
    conclusion: string
    code_ex: string
    icon: string
    Tecnologia: string
    projeto: string
    url: string
    status: string
  }
}

export interface projetosData {
  [key: string]: {
    name: string
    url: string
    tecnologia: string
    subproject: subprojectData
    code_ex: string
    description: string
    conclusion: string
    icon: string
    status: string
  }
}

export interface cursosData {
  [key: string]: {
    name: string
    icon: string
    code_cert: string
    status: string
    descricao: string
    url: string
    Tecnologia: string
    escola: string
  }
}

export interface footerData {
  totalCourses: number
  certificates: number
  graduations: number
  updated_at: string
  status: boolean
}

export interface githubData {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  user_view_type: string
  site_admin: boolean
  name: string
  company: string | null
  blog: string
  location: string | null
  email: string | null
  hireable: string | null
  bio: string
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface generalData {
  perfil: perfilData
  projetos: projetosData
  cursos: cursosData
  footer: footerData
}

async function fetchData(url: string): Promise<githubData> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`)
  }

  return response.json()
}

function descobrir_status() {
  return false
}

function calcularCertificados(cursos: string[]): number {
  let count = 0
  for (let x = 0; x < cursos.length; x++) {
    if (
      cursos[x].toLowerCase() === 'ciências da computação' ||
      cursos[x].toLowerCase() === 'cozinheiro profissional' ||
      cursos[x].toLowerCase() === 'gastronomia e alta cozinha'
    ) {
      count--
    }
    count++
  }
  return count
}

function calcularGraduacoes(cursos: string[]): number {
  let count = 0
  for (let x = 0; x < cursos.length; x++) {
    if (
      cursos[x].toLowerCase() === 'ciências da computação' ||
      cursos[x].toLowerCase() === 'cozinheiro profissional' ||
      cursos[x].toLowerCase() === 'gastronomia e alta cozinha'
    ) {
      count++
    }
  }
  return count
}

async function generateFullInfo(): Promise<generalData> {
  const url: string = 'https://api.github.com/users/oOHimuraOo'
  let dict: generalData
  try {
    const remoteData = await fetchData(url)

    dict = {
      perfil: {
        nome: remoteData.name,
        imagem: remoteData.avatar_url,
        usuario: remoteData.login,
        description: remoteData.bio,
      },
      projetos: database.projetos,
      cursos: database.cursos,
      footer: {
        updated_at: remoteData.updated_at,
        totalCourses: Object.keys(database.cursos).length,
        certificates: calcularCertificados(Object.keys(database.cursos)),
        graduations: calcularGraduacoes(Object.keys(database.cursos)),
        status: descobrir_status(),
      },
    }
    return dict
  } catch (error) {
    console.error(error)
    dict = {
      perfil: {
        nome: database.perfil.nome,
        imagem: database.perfil.imagem,
        usuario: database.perfil.usuario,
        description: database.perfil.description,
      },
      projetos: database.projetos,
      cursos: database.cursos,
      footer: {
        updated_at: "Couldn't find last update date",
        totalCourses: 16,
        certificates: 13,
        graduations: 3,
        status: descobrir_status(),
      },
    }
    return dict
  }
}

export default generateFullInfo
