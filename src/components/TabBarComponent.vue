<script setup lang="ts">
import type { project } from '@/utils/class/projectClass'
import { ref, computed } from 'vue'

interface Props {
  projectsOpen: [number, number][]
  projects: project[]
}

const close = './src/assets/images/icones/close-bold-svgrepo-com.svg'
const props = defineProps<Props>()

const findOpenedProject = computed(() => {
  const arrayDeProjectsAbertos = []
  for (let x = 0; x < props.projectsOpen.length; x++) {
    if (props.projectsOpen[x][1] === -1) {
      arrayDeProjectsAbertos.push(props.projects[props.projectsOpen[x][0]])
    } else {
      arrayDeProjectsAbertos.push(
        props.projects[props.projectsOpen[x][0]].subProjects[props.projectsOpen[x][1]],
      )
    }
  }

  return arrayDeProjectsAbertos
})

const activeTabIndex = ref<number>(0)
const handleActivTab = (index: number) => {
  activeTabIndex.value = index
  getOverallIndex(index, false)
}

const changeActive = (idx: number) => {
  if (findOpenedProject.value.length <= 1) {
    handleActivTab(0)
  } else if (findOpenedProject.value.length === activeTabIndex.value) {
    handleActivTab(activeTabIndex.value - 1)
  }

  if (idx === activeTabIndex.value) {
    handleActivTab(activeTabIndex.value)
    return true
  }

  return false
}

const emit = defineEmits(['tabRemoved', 'tabActive'])
const getOverallIndex = (index: number, remove: boolean) => {
  const TargetProject = findOpenedProject.value[index]
  let indexOpen: number = -1
  for (let x = 0; x < props.projectsOpen.length; x++) {
    if (props.projectsOpen[x][1] === -1) {
      if (props.projects[props.projectsOpen[x][0]].name === TargetProject.name) {
        indexOpen = x
      }
    } else {
      if (
        props.projects[props.projectsOpen[x][0]].subProjects[props.projectsOpen[x][1]].name ===
        TargetProject.name
      ) {
        indexOpen = x
      }
    }
  }

  if (indexOpen < 0) {
    return
  }

  if (remove) {
    emit('tabRemoved', indexOpen)
    return
  }

  emit('tabActive', indexOpen)
}
</script>

<template>
  <div class="tab_bar_container">
    <ul class="list">
      <li
        v-for="(project, index) in findOpenedProject"
        class="list__item"
        :key="index"
        :class="{ active: changeActive(index) }"
      >
        <a href="#" @click.prevent="handleActivTab(index)">
          <img :src="project.icon" :alt="project.name" />
          <h3>{{ project.name }}</h3>
        </a>
        <a href="#" @click.prevent="getOverallIndex(index, true)">
          <img :src="close" alt="close" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.tab_bar_container {
  background-color: map-get($map: $tabBarColors, $key: primary);
  width: 100%;
  height: 30px;
  overflow: hidden;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .list {
    list-style: none;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    overflow-x: scroll;

    &__item {
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 150px;
      width: 100%;
      height: 30px;
      border-top: 2px solid map-get($map: $tabBarColors, $key: primary);
      border-right: 2px solid map-get($map: $tabBarColors, $key: borderSecondary);

      &:hover {
        background-color: lighten($color: map-get($map: $tabBarColors, $key: primary), $amount: 3);
      }

      a {
        display: flex;
        font-size: 12px;
        max-width: 120px;
        text-decoration: none;
        font-family: $bodyFont;
        color: map-get($map: $tabBarColors, $key: fontSecondary);
        align-items: center;

        img {
          height: 15px;
          width: 15px;
          margin-right: 5px;
        }

        h3 {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 30px;
          align-content: center;
          overflow: hidden;
        }
      }
    }

    .active {
      background-color: map-get($map: $tabBarColors, $key: secondary);
      border-top: 2px solid map-get($map: $tabBarColors, $key: borderPrimary);
      box-shadow: 2px 0px 0px map-get($map: $tabBarColors, $key: borderSecondary);

      a {
        h3 {
          color: map-get($map: $tabBarColors, $key: fontPrimary);
        }
      }
    }
  }
}

</style>
