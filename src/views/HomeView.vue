<script setup lang="ts">
import { ref, watch } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import LeftBarComponent from '@/components/LeftBarComponent.vue';
import leftMenuComponent from '@/components/leftMenuComponent.vue';
import TabBarComponent from '@/components/TabBarComponent.vue';
import ViewPortComponent from '@/components/ViewPortComponent.vue';
import footerComponent from '@/components/footerComponent.vue';
import { genearateProjects } from '@/utils/mock/projectMocks';
import { project, type subProject } from '@/utils/class/projectClass';
import profileComponent from '@/components/profileComponent.vue';
import { generateCurses } from '@/utils/mock/cursoMocks';
import { generateProfile } from '@/utils/mock/profileMock';
import { generateFooterInfos } from '@/utils/calculators/footerCalculators';


const projects = genearateProjects()
const cursos = generateCurses()
const profile = generateProfile()
const footer = generateFooterInfos()

const size = ref<string>('')

const tabActive = ref<project | subProject | null>(null)
const selectedMenu = ref<string>('null')
const handleSelected = (menu:string) => {
  selectedMenu.value = menu
}

const projectIndex = ref<number>(-1)
const subProjectindex = ref<number>(-1)
const handleProjectIndex = (projindex:number, subprojindex:number) => {
  projectIndex.value = projindex
  subProjectindex.value = subprojindex
}

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

watch([projectIndex, subProjectindex], createNewTab)


const handleRemoval = (index:number) => {
  openTabs.value = openTabs.value.filter((_, i) => i != index)

  if (openTabs.value.length < 1) {
    tabActive.value = null
    projectIndex.value = -1
    subProjectindex.value = -1
  }
}

const handleActive = (index:number) => {
  if (openTabs.value.length < 1) {
    tabActive.value = null
    projectIndex.value = -1
    subProjectindex.value = -1
  } else if (openTabs.value[index][1] !== -1) {
    tabActive.value = projects[openTabs.value[index][0]].subProjects[openTabs.value[index][1]]
    projectIndex.value = openTabs.value[index][0]
    subProjectindex.value = openTabs.value[index][1]
  } else {
    tabActive.value = projects[openTabs.value[index][0]]
    projectIndex.value = openTabs.value[index][0]
    subProjectindex.value = -1
  }
}

const handleSizeChange = (s:string) => {
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
    default :
      size.value = ''
      break
  }
}

</script>

<template>
  <div class="container" :class="{maximized: size === 'maximized', minimized: size === 'minimized', closed: size === 'closed'}">
    <HeaderComponent @size="handleSizeChange"/>
    <div class="miolo">
      <LeftBarComponent @selected="handleSelected"/>
      <leftMenuComponent v-if="selectedMenu !== 'null'" :selectedMenu="selectedMenu" :projects="projects" @projectIndex="handleProjectIndex" @subProjectIndex="handleProjectIndex" :proj-index="projectIndex" :sub-proj-index="subProjectindex"/>
      <div class="viewport">
        <TabBarComponent :projectsOpen="openTabs" :projects="projects" @tabRemoved="handleRemoval" @tabActive="handleActive" :class="{disabled: tabActive === null}"/>
        <ViewPortComponent v-if="tabActive !== null" :proj="tabActive"/>
        <profileComponent v-else :cursos="cursos" :profile="profile" :projetos="projects"/>
      </div>
    </div>
    <footerComponent :info="footer" />
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
      max-height: 95vh;
      overflow: hidden;

      .viewport {
        width:100%;
        height: 100%;
      }
    }
  }

  .maximized {
    max-width: 100vw;
    max-height: 100vh;
  }

  .minimized {
    color: red;
  }

  .closed {
    color: blue;
  }
</style>
