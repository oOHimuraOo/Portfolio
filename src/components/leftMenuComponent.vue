<script setup lang="ts">
import { project, STATUS } from '@/utils/class/projectClass'
import { computed, ref, defineEmits, watch } from 'vue'

interface Props {
  selectedMenu: string
  projects: project[]
  projIndex: number
  subProjIndex: number
}

const folder = './src/assets/images/icones/folder-svgrepo-com.svg'
const openCloseImage = './src/assets/images/icones/open-disc-svgrepo-com.svg'

const sectionAIsActive = ref(false)
const sectionBIsActive = ref(false)
const sectionCIsActive = ref(false)
const projectSelected = ref(-1)
const subprojecSelected = ref(-1)
const searchQuery = ref<string>('')

const props = defineProps<Props>()
const menuVisible = computed(() => {
  return props.selectedMenu
})

const emit = defineEmits(['projectIndex', 'subProjectIndex'])

const toggleActiveSectionA = (event: Event) => {
  event.preventDefault()
  sectionAIsActive.value = !sectionAIsActive.value
}

const toggleActiveSectionB = (event: Event) => {
  event.preventDefault()
  sectionBIsActive.value = !sectionBIsActive.value
}

const toggleActiveSectionC = (event: Event) => {
  event.preventDefault()
  sectionCIsActive.value = !sectionCIsActive.value
}

const toggleSelectedProject = (index: number) => {
  projectSelected.value = index
  subprojecSelected.value = -1
  emit('projectIndex', projectSelected.value, subprojecSelected.value)
}

const toggleSelectedSubproject = (index: number, idx: number) => {
  subprojecSelected.value = idx
  projectSelected.value = index
  emit('subProjectIndex', projectSelected.value, subprojecSelected.value)
}

const name = ref<string>('Project Not Found')
const description = ref<string>('Nenhum projeto ou subprojeto selecionado ainda. Escolha um para ler mais sobre ele.')
const conclusion = ref<string>('Nenhum projeto ou subprojeto selecionado ainda. Escolha um para ler mais sobre ele.')

const changeNameDescriptionConclusion = () => {
  name.value = findName()
  description.value = findDescription()
  conclusion.value = findConclusion()
}

watch([subprojecSelected, projectSelected], changeNameDescriptionConclusion)
watch(() => [props.projIndex, props.subProjIndex], ([newProjeIndex, newSubProjIndex]) => {
  if (newProjeIndex !== -1) {
    if (newSubProjIndex === -1) {
      toggleSelectedProject(newProjeIndex)
    } else {
      toggleSelectedSubproject(newProjeIndex, newSubProjIndex)
    }
  } else {
    toggleSelectedSubproject(-1, -1)
  }
})

const findName = () => {
  if (subprojecSelected.value === -1) {
    if (projectSelected.value === -1) {
      return 'Project Not Found'
    } else {
      return props.projects[projectSelected.value].name
    }
  } else {
    return props.projects[projectSelected.value].subProjects[subprojecSelected.value].name
  }
}

const findDescription = () => {
  if (subprojecSelected.value === -1) {
    if (projectSelected.value === -1) {
      return 'Nenhum projeto ou subprojeto selecionado ainda. Escolha um para ler mais sobre ele.'
    } else {
      return props.projects[projectSelected.value].description
    }
  } else {
    return props.projects[projectSelected.value].subProjects[subprojecSelected.value].description
  }
}

const findConclusion = () => {
  if (subprojecSelected.value === -1) {
    if (projectSelected.value === -1) {
      return 'Nenhum projeto ou subprojeto selecionado ainda. Escolha um para ler mais sobre ele.'
    } else {
      return props.projects[projectSelected.value].conclusion
    }
  } else {
    return props.projects[projectSelected.value].subProjects[subprojecSelected.value].conclusion
  }
}

const filteredProjects = computed(() => {
  const projectsNames: string[] = []

  for (let x = 0; x < props.projects.length; x++) {
    projectsNames.push(props.projects[x].name)
    for (let y = 0; y < props.projects[x].subProjects.length; y++) {
      projectsNames.push(props.projects[x].subProjects[y].name)
    }
  }

  const filtered = projectsNames.filter((p) =>
  p.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )

  return filtered
})

const findIndexByName = (name: string) => {
  for (let x = 0; x < props.projects.length; x++) {
    for (let y = 0; y < props.projects[x].subProjects.length; y++) {
      if (props.projects[x].subProjects[y].name === name) {
        toggleSelectedSubproject(x, y)
        return
      }
    }

    if (props.projects[x].name === name) {
      toggleSelectedProject(x)
      return
    }
  }
}

const filterByStatus = (status:STATUS) => {
  const projectsarray: project[] = []
  for (let x = 0; x < props.projects.length; x++) {
    if (props.projects[x].status === status) {
      projectsarray.push(props.projects[x])
    }
  }

  return projectsarray
}

function getTitle(): string {
  switch (props.selectedMenu) {
    case 'pro':
      return 'All Projects'
    case 'sea':
      return 'Search Projects'
    case 'git':
      return 'Git Projects'
    default:
      return ''
  }
}
</script>

<template>
  <div class="left_menu_container" :class="menuVisible">
    <h2 class="tab_title">{{ getTitle() }}</h2>
    <div v-if="menuVisible === 'pro'" class="projects">
      <section class="section_list">
        <div class="section_title">
          <a href="#" @click="toggleActiveSectionA">
            <h2>Project List</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: !sectionAIsActive }" />
          </a>
        </div>
        <div v-if="sectionAIsActive" class="section_body">
          <ul class="section_body__list">
            <li
              v-for="(project, index) in props.projects"
              class="section_body__list__item"
              :key="index"
            >
              <a href="#" @click.prevent="toggleSelectedProject(index)">
                <img :src="folder" alt="folder" />
                {{ project.name }}
              </a>
              <ul
                v-if="props.projects[index].subProjects.length > 0"
                class="section_body__list__item__sublist"
              >
                <li
                  v-for="(subproject, idx) in props.projects[index].subProjects"
                  class="section_body__list__item__sublist__subitem"
                  :key="idx"
                >
                  <a href="#" @click.prevent="toggleSelectedSubproject(index, idx)">
                    <img :src="folder" alt="folder" />
                    {{ subproject.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      <section class="section_text">
        <div class="section_title">
          <a href="#" @click="toggleActiveSectionB">
            <h2>Project Description</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: !sectionAIsActive }" />
          </a>
        </div>
        <div v-if="sectionBIsActive" class="section_body">
          <h3>Description of {{ name }}</h3>
          <p>
            {{ description }}
          </p>
        </div>
      </section>
      <section class="section_text">
        <div class="section_title">
          <a href="#" @click="toggleActiveSectionC">
            <h2>Project Conclusion</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: !sectionAIsActive }" />
          </a>
        </div>
        <div v-if="sectionCIsActive" class="section_body">
          <h3>Conclusion of {{ name }}</h3>
          <p>
            {{ conclusion }}
          </p>
        </div>
      </section>
    </div>
    <div v-if="menuVisible === 'sea'" class="search">
      <section class="input_section">
        <div class="input_area">
          <input type="text" placeholder="Procure por um projeto" v-model="searchQuery" />
        </div>
      </section>
      <section class="result_section">
        <div class="section_title">
          <a @click="toggleActiveSectionB" href="">
            <h2>resultado da Pesquisa</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: sectionBIsActive }" />
          </a>
        </div>
        <div v-if="!sectionBIsActive" class="results">
          <ul class="result_list">
            <li v-for="(project, index) in filteredProjects" class="result_list_item" :key="index">
              <a href="#" @click.prevent="findIndexByName(project)">
                <img :src="folder" alt="foder" />
                <h3>{{ project }}</h3>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
    <div v-if="menuVisible === 'git'" class="git">
      <section class="section_completed">
        <div class="section_title">
          <a @click="toggleActiveSectionA" href="#">
            <h2>Completed</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: !sectionAIsActive }" />
          </a>
        </div>
        <div v-if="sectionAIsActive" class="projects_completed">
          <ul class="project_list">
            <li v-for="(project, index) in filterByStatus(STATUS.COMPLETED)" class="project_list_item" :key="index">
              <a href="#" @click.prevent="toggleSelectedProject(index)">
                <img :src="project.icon" :alt="project.name" />
                <h3>{{ project.name }}</h3>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section class="section_indevelopment">
        <div class="section_title">
          <a @click="toggleActiveSectionB" href="#">
            <h2>In development</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: !sectionBIsActive }" />
          </a>
        </div>
        <div v-if="sectionBIsActive" class="projects_indevelopment">
          <ul class="project_list">
            <li v-for="(project, index) in filterByStatus(STATUS.IN_DEVELOPMENT)" class="project_list_item" :key="index">
              <a href="#" @click.prevent="toggleSelectedProject(index)">
                <img :src="project.icon" :alt="project.name" />
                <h3>{{ project.name }}</h3>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section class="section_droped">
        <div class="section_title">
          <a @click="toggleActiveSectionC" href="#">
            <h2>On Hold</h2>
            <img :src="openCloseImage" alt="open/close" :class="{ flipped: !sectionCIsActive }" />
          </a>
        </div>
        <div v-if="sectionCIsActive" class="projects_droped">
          <ul class="project_list">
            <li v-for="(project, index) in filterByStatus(STATUS.DROPPED)" class="project_list_item" :key="index">
              <a href="#" @click.prevent="toggleSelectedProject(index)">
                <img :src="project.icon" :alt="project.name" />
                <h3>{{ project.name }}</h3>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.left_menu_container {
  width: 200px;
  background-color: map-get($map: $leftMenuColors, $key: primary);
  color: map-get($map: $leftMenuColors, $key: font);
  padding: 5px 0 5px 0px;

  .tab_title {
    margin-left: 5px;
    font-size: 12px;
    font-family: $bodyFont;
    color: map-get($map: $leftMenuColors, $key: fontSecondary);
  }

  .flipped {
    transform: scaleY(-1);
  }

  section {
    width: 200px;
    margin-top: 8px;

    .section_title {
      padding: 5px;
      background-color: map-get($map: $leftMenuColors, $key: secondary);

      a {
        display: flex;
        text-decoration: none;
        justify-content: space-between;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;

        h2 {
          font-size: 14px;
          font-family: $bodyFont;
          color: map-get($map: $leftMenuColors, $key: font);
        }

        img {
          height: 15px;
          width: 15px;
        }
      }
    }
  }

  .section_list {
    overflow-y: scroll;
    max-height: 33vh;

    &::-webkit-scrollbar {
      display: none;
    }

    .section_body {
      padding-top: 5px;
      padding-bottom: 8px;
      width: 100%;

      &__list {
        list-style: none;

        &__item {
          padding: 3px 5px;
          a {
            display: flex;
            text-decoration: none;
            align-items: center;
            font-size: 12px;
            font-family: $bodyFont;
            color: map-get($map: $leftMenuColors, $key: fontSecondary);

            &:hover {
              color: map-get($map: $leftMenuColors, $key: font);
            }

            img {
              height: 10px;
              width: 10px;
              margin-right: 3px;
            }
          }
          &__sublist {
            list-style: none;

            &__subitem {
              padding: 3px 15px;

              a {
                display: flex;
                text-decoration: none;
                font-size: 12px;
                font-family: $bodyFont;

                img {
                  height: 10px;
                  width: 10px;
                  margin-right: 3px;
                }
              }
            }
          }
        }
      }
    }
  }

  .section_text {
    .section_body {
      padding: 0 5px;

      h3 {
        font-size: 14px;
        font-family: $bodyFont;
        text-align: center;
        margin-top: 5px;
        margin-bottom: 5px;
        text-transform: uppercase;
        color: map-get($map: $leftMenuColors, $key: fontSecondary);
      }

      p {
        font-size: 12px;
        font-family: $bodyFont;
        color: map-get($map: $leftMenuColors, $key: fontSecondary);
      }
    }
  }

  .input_section {
    .input_area {
      padding: 5px;

      input {
        width: 100%;
        background-color: map-get($map: $leftMenuColors, $key: secondary);
        padding: 4px;
        font-family: $bodyFont;
        color: map-get($map: $leftMenuColors, $key: font);

        &:focus {
          outline: none;
        }
      }
    }
  }
  .result_section {
    overflow-y: scroll;
    max-height: 33vh;

    &::-webkit-scrollbar {
      display: none;
    }

    .results {
      padding: 5px;

      .result_list {
        list-style: none;
        max-height: 100vh;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }

        &_item {
          padding: 8px;
          border: 2px solid map-get($map: $leftMenuColors, $key: secondary);
          margin-bottom: 5px;

          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            width: 100%;
            height: 100%;
            color: map-get($map: $leftMenuColors, $key: fontSecondary);

            &:hover {
              color: map-get($map: $leftMenuColors, $key: font);
            }

            img {
              height: 20px;
              width: 20px;
              margin-right: 5px;
            }

            h3 {
              font-family: $bodyFont;
              font-size: 10px;
              text-decoration: none;
              text-transform: uppercase;
            }
          }
        }
      }
    }
  }

  .section_completed {
    .projects_completed {
      padding: 5px;

      .project_list {
        &_item {
          a {
            color: map-get($map: $leftMenuColors, $key: fontSecondary);

            &:hover {
              color: map-get($map: $leftMenuColors, $key: font);
            }
          }
        }
      }
    }
  }

  .section_indevelopment {
    .projects_indevelopment {
      padding: 5px;

      .project_list {
        &_item {
          a {
            color: map-get($map: $leftMenuColors, $key: fontSecondary);

            &:hover {
              color: map-get($map: $leftMenuColors, $key: font);
            }
          }
        }
      }
    }
  }

  .section_droped {
    .projects_droped {
      padding: 5px;

      .project_list {
        &_item {
          a {
            color: map-get($map: $leftMenuColors, $key: fontSecondary);

            &:hover {
              color: map-get($map: $leftMenuColors, $key: font);
            }
          }
        }
      }
    }
  }

  .project_list {
    list-style: none;
    max-height: 33vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    &_item {
      padding: 8px;
      border: 2px solid map-get($map: $leftMenuColors, $key: secondary);
      margin-bottom: 5px;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        width: 100%;
        height: 100%;

        img {
          height: 20px;
          width: 20px;
          margin-right: 5px;
        }

        h3 {
          font-family: $bodyFont;
          font-size: 10px;
          text-decoration: none;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
