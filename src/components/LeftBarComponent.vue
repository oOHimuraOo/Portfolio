<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import projects from "../assets/images/icones/files-svgrepo-com.svg"
import pSelected from "../assets/images/icones/files-svgrepo-com copy.svg"
import search from "../assets/images/icones/search-2-svgrepo-com.svg"
import sSelected from "../assets/images/icones/search-2-svgrepo-com copy.svg"
import git from "../assets/images/icones/git-svgrepo-com.svg"
import gSelected from "../assets/images/icones/git-svgrepo-com copy.svg"

const projectIsActive = ref(false)
const searchIsActive = ref(false)
const gitIsActive = ref(false)

const emit = defineEmits(['selected'])

const toggleActive = (name:string) => {
  if (name == 'pro') {
    projectIsActive.value = !projectIsActive.value
    searchIsActive.value = false
    gitIsActive.value = false

    if (projectIsActive.value) {
      emit('selected', name)
    } else {
      emit('selected', 'null')
    }

  } else if (name == 'sea'){
    projectIsActive.value = false
    searchIsActive.value = !searchIsActive.value
    gitIsActive.value = false

    if (searchIsActive.value) {
      emit('selected', name)
    } else {
      emit('selected', 'null')
    }

  } else if (name == 'git') {
    projectIsActive.value = false
    searchIsActive.value = false
    gitIsActive.value = !gitIsActive.value

    if (gitIsActive.value) {
      emit('selected', name)
    } else {
      emit('selected', 'null')
    }

  } else {
    projectIsActive.value = false
    searchIsActive.value = false
    gitIsActive.value = false
  }
}

</script>

<template>
<div class="left_bar_container">
  <div>
    <ul>
      <li>
        <a href="#" :class="{ active: projectIsActive }" @click="toggleActive('pro')">
          <img v-if="projectIsActive" :src="pSelected" alt="projetos selecionados">
          <img v-else :src="projects" alt="projetos">
        </a>
      </li>
      <li>
        <a href="#" :class="{ active: searchIsActive }" @click="toggleActive('sea')">
          <img v-if="searchIsActive" :src="sSelected" alt="projetos selecionados">
          <img v-else :src="search" alt="projetos">
        </a>
      </li>
      <li>
        <a href="#" :class="{ active: gitIsActive }" @click="toggleActive('git')">
          <img v-if="gitIsActive" :src="gSelected" alt="projetos selecionados">
          <img v-else :src="git" alt="projetos">
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.left_bar_container {
  display: flex;

  div {
    width: 50px;
    height: 100%;
    background-color: map-get($map: $leftBarColors, $key: primary);

    ul {
      list-style: none;
      width: 50px;
      padding-top: 8px;
      padding-bottom: 8px;

      li {
        width: 50px;
        height: 50px;
        margin-bottom: 8px;

        a {
          display: block;
          text-decoration: none;
          width: 50px;
          height: 46px;
          border-left: 2px solid map-get($map: $leftBarColors, $key: primary);

          img {
            width: 46px;
            height: 46px;
          }

          &:hover {
            background-color: map-get($map: $leftBarColors, $key: selected);
            border-left: 2px solid map-get($map: $leftBarColors, $key: iconSelected);
          }
        }

        .active {
          background-color: map-get($map: $leftBarColors, $key: selected);
          border-left: 2px solid map-get($map: $leftBarColors, $key: iconSelected);
        }

      }
    }
  }
}
</style>
