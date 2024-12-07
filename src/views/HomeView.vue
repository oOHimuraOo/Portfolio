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
  const cords: [number, number] = [projectIndex.value, subProjectindex.value]
  if (openTabs.value.includes(cords)) {
    return
  }
  openTabs.value.push(cords)
}

watch([projectIndex, subProjectindex], createNewTab)

const projects = genearateProjects()

const handleRemoval = (index:number) => {
  openTabs.value = openTabs.value.filter((_, i) => i != index)
}

const tabActive = ref<project | subProject | null>(null)
const handleActive = (index:number) => {
  console.log(projects[0])
  tabActive.value = projects[openTabs.value[index][0]].subProjects[openTabs.value[index][1]]
}

</script>

<template>
  <div class="container">
    <HeaderComponent />
    <div class="miolo">
      <LeftBarComponent @selected="handleSelected"/>
      <leftMenuComponent v-if="selectedMenu !== 'null'" :selectedMenu="selectedMenu" :projects="projects" @projectIndex="handleProjectIndex" @subProjectIndex="handleProjectIndex"/>
      <div class="viewport">
        <TabBarComponent :projectsOpen="openTabs" :projects="projects" @tabRemoved="handleRemoval" @tabActive="handleActive" />
        <ViewPortComponent v-if="handleActive !== null" :proj="tabActive"/>
        <div v-else style="background-color: #000; width: 100%; height: 100%; font-family: sans-serif;">Carregando!</div>
      </div>
    </div>
    <footerComponent />
  </div>
</template>

<style scoped lang="scss">
  .container {
    border: 1px solid darkgray;
    max-width: 1024px;
    max-height: 100vh;
    margin: 0 auto;

    .miolo {
      display: flex;
      max-height: 90vh;
      overflow: hidden;

      .viewport {
        width:100%;
        height: 100%;
      }
    }
  }
</style>
