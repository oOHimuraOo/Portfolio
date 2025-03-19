<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import LeftBarComponent from '@/components/LeftBarComponent.vue'
import leftMenuComponent from '@/components/leftMenuComponent.vue'
import TabBarComponent from '@/components/TabBarComponent.vue'
import ViewPortComponent from '@/components/ViewPortComponent.vue'
import footerComponent from '@/components/footerComponent.vue'
import { project, STATUS, subProject } from '@/utils/class/projectClass'
import profileComponent from '@/components/profileComponent.vue'
import { generateProfile } from '@/utils/mock/profileMock'
import { stringDateModelConverter } from '@/utils/calculators/footerCalculators'
import getInfos from '../utils/base/dataBase'
import { profile } from '@/utils/class/profileClass'
import { curso } from '@/utils/class/cursoClass'
import { footer } from '@/utils/class/siteInfoClass'

const getStatus = (status: string) => {
  if (status == 'completed') {
    return STATUS.COMPLETED
  } else if (status == 'incomplete') {
    return STATUS.IN_DEVELOPMENT
  } else {
    return STATUS.DROPPED
  }
}

const infosProf = async () => {
  try {
    const generalInfos = await getInfos()

    const nome = generalInfos.perfil.nome
    const image = generalInfos.perfil.imagem
    const nickname = generalInfos.perfil.usuario
    const proffession = generalInfos.perfil.description

    const novoProfile = new profile(image, nome, nickname, proffession)
    return novoProfile
  } catch (error) {
    console.error(error)
    return generateProfile()
  }
}

const infosProj = async () => {
  try {
    const generalInfos = await getInfos()

    const projectArray: project[] = []
    const chaves2 = Object.keys(generalInfos.projetos)
    const quantidade1 = chaves2.length
    for (let x = 0; x < quantidade1; x++) {
      const subprojectArray: subProject[] = []
      const chaves3 = Object.keys(generalInfos.projetos[chaves2[x]].subproject)
      const quantidade2 = chaves3.length
      if (quantidade2 > 0) {
        for (let y = 0; y < quantidade2; y++) {
          const nome = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].name
          const url = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].url
          const descricao = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].description
          const conclusion = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].conclusion
          const icon = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].icon
          const status = getStatus(generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].status)
          const tech = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].Tecnologia
          const code_ex = generalInfos.projetos[chaves2[x]].subproject[chaves3[y]].code_ex

          const newSubproject = new subProject(
            nome,
            url,
            descricao,
            conclusion,
            status,
            icon,
            tech,
            code_ex,
          )
          subprojectArray.push(newSubproject)
        }
      }
      const nome = generalInfos.projetos[chaves2[x]].name
      const url = generalInfos.projetos[chaves2[x]].url
      const descricao = generalInfos.projetos[chaves2[x]].description
      const conclusion = generalInfos.projetos[chaves2[x]].conclusion
      const status = getStatus(generalInfos.projetos[chaves2[x]].status)
      const icon = generalInfos.projetos[chaves2[x]].icon
      const tech = generalInfos.projetos[chaves2[x]].tecnologia
      const code_ex = generalInfos.projetos[chaves2[x]].code_ex

      const newProject = new project(
        nome,
        subprojectArray,
        url,
        descricao,
        conclusion,
        status,
        icon,
        tech,
        code_ex,
      )

      projectArray.push(newProject)
    }
    return projectArray
  } catch (error) {
    console.error(error)
  }
}

const infosCurs = async () => {
  try {
    const generalInfos = await getInfos()
    const arrayDeCursos: curso[] = []
    const chaves1 = Object.keys(generalInfos.cursos)
    const quantidadeCursos = chaves1.length

    for (let x = 0; x < quantidadeCursos; x++) {
      const nome = generalInfos.cursos[chaves1[x]].name
      const entidade = generalInfos.cursos[chaves1[x]].escola
      const tecnologia = generalInfos.cursos[chaves1[x]].Tecnologia
      const codigo = generalInfos.cursos[chaves1[x]].code_cert
      const status = getStatus(generalInfos.cursos[chaves1[x]].status)
      const icon = generalInfos.cursos[chaves1[x]].icon
      const description = generalInfos.cursos[chaves1[x]].descricao
      const link = generalInfos.cursos[chaves1[x]].url

      const novoCurso = new curso(
        nome,
        entidade,
        tecnologia,
        codigo,
        status,
        icon,
        description,
        link,
      )
      arrayDeCursos.push(novoCurso)
    }
    return arrayDeCursos
  } catch (error) {
    console.error(error)
  }
}

const infosFoot = async () => {
  try {
    const generalInfos = await getInfos()
    const data = stringDateModelConverter(new Date(generalInfos.footer.updated_at))
    const views = 0
    const total = generalInfos.footer.totalCourses
    const certificates = generalInfos.footer.certificates
    const graduations = generalInfos.footer.graduations
    const frase1 = 'Fullstack Developer'
    const frase2 = 'Game Developer'
    const expertise = [
      'https://godotengine.org/assets/press/icon_color.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201',
      'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/306px-ISO_C%2B%2B_Logo.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/C_Sharp_Logo_2023.svg/800px-C_Sharp_Logo_2023.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/800px-HTML5_logo_and_wordmark.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Official_CSS_Logo.svg/800px-Official_CSS_Logo.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/800px-Vue.js_Logo_2.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
      'https://www.svgrepo.com/show/353657/django-icon.svg',
      'https://www.svgrepo.com/show/331760/sql-database-generic.svg',
    ]
    const status = generalInfos.footer.status

    const newFooter = new footer(
      data,
      total,
      certificates,
      graduations,
      views,
      frase1,
      frase2,
      expertise,
      status,
    )
    return newFooter
  } catch (error) {
    console.error(error)
  }
}

const projectsInfo = ref<project[] | null>(null)
const cursosInfo = ref<curso[] | null>(null)
const profileInfo = ref<profile | null>(null)
const footerInfo = ref<footer | null>(null)
const projeto1 = ref<project | null>(null)
const projeto2 = ref<project | null>(null)
const projeto3 = ref<project | null>(null)

const size = ref<string>('')

const tabActive = ref<project | subProject | null>(null)
const selectedMenu = ref<string>('null')
const handleSelected = (menu: string) => {
  selectedMenu.value = menu
}

const projectIndex = ref<number>(-1)
const subProjectindex = ref<number>(-1)
const handleProjectIndex = (projindex: number, subprojindex: number) => {
  projectIndex.value = projindex
  subProjectindex.value = subprojindex
}

const ajuste_liberado = ref<boolean>(false)

const openTabs = ref<[number, number][]>([])
const createNewTab = () => {
  if (projectIndex.value !== -1) {
    const cords: [number, number] = [projectIndex.value, subProjectindex.value]
    if (openTabs.value.some(([proj, subproj]) => proj === cords[0] && subproj === cords[1])) {
      return
    }
    openTabs.value.push(cords)
  }
}

onMounted(async () => {
  const proj = await infosProj()
  const cour = await infosCurs()
  const prof = await infosProf()
  const foot = await infosFoot()

  if (proj == undefined || cour == undefined || prof == undefined || foot == undefined) {
    return
  }

  projectsInfo.value = proj
  cursosInfo.value = cour
  profileInfo.value = prof
  footerInfo.value = foot

  for (let x = 0; x < Object.keys(proj).length; x++) {
    if (proj[x].name.toLowerCase() === 'cryptograma') {
      projeto1.value = proj[x]
    } else if (proj[x].name.toLowerCase() === 'agência triângulo') {
      projeto2.value = proj[x]
    } else if (proj[x].name.toLowerCase() === 'oohimuraoo') {
      projeto3.value = proj[x]
    }
  }
})

watch([projectIndex, subProjectindex], createNewTab)
watch([openTabs.value], () => {
  if (openTabs.value.length > 5) {
    ajuste_liberado.value = true
  } else {
    ajuste_liberado.value = false
  }
})

const handleRemoval = (index: number) => {
  openTabs.value = openTabs.value.filter((_, i) => i != index)

  if (openTabs.value.length < 1) {
    tabActive.value = null
    projectIndex.value = -1
    subProjectindex.value = -1
  }
}

const handleActive = (index: number) => {
  if (projectsInfo.value == null) {
    return
  }

  if (openTabs.value.length < 1) {
    tabActive.value = null
    projectIndex.value = -1
    subProjectindex.value = -1
  } else if (openTabs.value[index][1] !== -1) {
    tabActive.value =
      projectsInfo.value[openTabs.value[index][0]].subProjects[openTabs.value[index][1]]
    projectIndex.value = openTabs.value[index][0]
    subProjectindex.value = openTabs.value[index][1]
  } else {
    tabActive.value = projectsInfo.value[openTabs.value[index][0]]
    projectIndex.value = openTabs.value[index][0]
    subProjectindex.value = -1
  }
}

const handleSizeChange = (s: string) => {
  switch (s) {
    case 'maximized':
      size.value = s
      break
    case 'minimized':
      size.value = s
      break
    case 'closed':
      size.value = s
      break
    default:
      size.value = ''
      break
  }
}
</script>

<template>
  <div
    class="container"
    :class="{
      maximized: size === 'maximized',
      minimized: size === 'minimized',
      closed: size === 'closed',
    }"
  >
    <HeaderComponent
      @size="handleSizeChange"
      :projeto1="projeto1"
      :projeto2="projeto2"
      :projeto3="projeto3"
    />
    <div
      class="miolo"
      :class="{
        menu_aberto: selectedMenu !== 'null' && ajuste_liberado === true,
        menu_fechado: selectedMenu === 'null' && ajuste_liberado === true,
      }"
      v-if="projectsInfo && cursosInfo && profileInfo"
    >
      <LeftBarComponent @selected="handleSelected" />
      <leftMenuComponent
        v-if="selectedMenu !== 'null'"
        :selectedMenu="selectedMenu"
        :projects="projectsInfo"
        @projectIndex="handleProjectIndex"
        @subProjectIndex="handleProjectIndex"
        :proj-index="projectIndex"
        :sub-proj-index="subProjectindex"
      />
      <div class="viewport">
        <TabBarComponent
          :projectsOpen="openTabs"
          :projects="projectsInfo"
          @tabRemoved="handleRemoval"
          @tabActive="handleActive"
          :class="{ disabled: tabActive === null }"
        />
        <ViewPortComponent v-if="tabActive !== null" :proj="tabActive" />
        <profileComponent
          v-else
          :cursos="cursosInfo"
          :profile="profileInfo"
          :projetos="projectsInfo"
        />
      </div>
    </div>
    <footerComponent v-if="footerInfo" :info="footerInfo" />
  </div>
</template>

<style scoped lang="scss">
.container {
  border: 1px solid darkgray;
  max-width: 1024px;
  max-height: 100vh;
  margin: 0 auto;

  .disabled {
    display: none;
  }

  .miolo {
    display: flex;
    max-height: calc(100vh - 62px);
    width: 100%;

    .viewport {
      width: 100%;
      height: 100%;
    }
  }

  .menu_aberto {
    max-width: calc(100% - 250px);
  }

  .menu_fechado {
    max-width: calc(100% - 50px);
  }
}

.maximized {
  max-width: 100%;
  max-height: 100%;
}

.minimized {
  color: red;
}

.closed {
  color: blue;
}
</style>
