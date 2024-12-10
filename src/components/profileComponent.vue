<script setup lang="ts">
import type { curso } from '@/utils/class/cursoClass';
import type { profile } from '@/utils/class/profileClass';
import type { project } from '@/utils/class/projectClass';
import { STATUS } from '@/utils/class/projectClass';
import { computed } from 'vue';

interface Props {
  cursos: curso[]
  projetos: project[]
  profile: profile
}

const props = defineProps<Props>()

const counterCoursesOrProjects = (course:boolean, status:STATUS) => {
  if (course) {
    let cont = 0
    for (let x = 0; x < props.cursos.length; x++) {
      if (props.cursos[x].status === status) {
        cont++
      }
    }
    return cont
  }

  let cont = 0
  for (let x = 0; x < props.projetos.length; x++) {
    if (props.projetos[x].status === status) {
      cont++
    }
  }
  return cont
}

const handleCourses = computed(() => {
  const novoArray: curso[] = []
  for (let x = 0; x < props.cursos.length; x++) {
    if (props.cursos[x].status === STATUS.COMPLETED) {
      novoArray.push(props.cursos[x])
    }
  }
  return novoArray
})

const handleProjects = computed(() => {
  const novoArray: project[] = []
  for (let x = 0; x < props.projetos.length; x++) {
    if (props.projetos[x].status === STATUS.COMPLETED) {
      novoArray.push(props.projetos[x])
    }
  }

  return novoArray
})
</script>

<template>
  <div class="profile_container">
    <div class="title_section">
      <img :src="props.profile.image" alt="profile" />
      <h1>{{ props.profile.name }}</h1>
      <h2>@{{ props.profile.nickname }}</h2>
      <h3>{{ props.profile.proffesion }}</h3>
    </div>
    <div class="contador_de_projetos">
      <ul class="contador_lista">
        <li class="contador_lista_item">
          <h5>{{ counterCoursesOrProjects(false, STATUS.COMPLETED) }}</h5>
          <h4>concluidos</h4>
        </li>
        <li class="contador_lista_item center">
          <h5>{{ counterCoursesOrProjects(false, STATUS.IN_DEVELOPMENT) }}</h5>
          <h4>em desenvolvimentos</h4>
        </li>
        <li class="contador_lista_item">
          <h5>{{ counterCoursesOrProjects(false, STATUS.DROPPED) }}</h5>
          <h4>em espera</h4>
        </li>
      </ul>
    </div>
    <div class="container_de_miolo">
      <div class="container_de_cursos">
        <ul class="lista_cursos">
          <li v-for="(curso, index) in handleCourses" class="lista_cursos_item" :key="index" :class="{final: index === (handleCourses.length - 1)}">
            <img :src="curso.icon" :alt="curso.name" />
            <div>
              <h4>{{ curso.name }}</h4>
              <h5>{{ curso.entidade }} | {{ curso.tecnologia }} | {{ curso.codigoCertificado }}</h5>
              <p>
                {{ curso.descricao }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="container_de_projetos">
        <ul class="lista_projetos">
          <li v-for="(projeto, index) in handleProjects" class="lista_projetos_item" :key="index" :class="{final: index === (handleProjects.length - 1)}">
            <img :src="projeto.icon" :alt="projeto.name" />
            <div>
              <h4>{{ projeto.name }}</h4>
              <h5>{{ projeto.tech }}</h5>
              <p>
                {{ projeto.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.profile_container {
  background-color: map-get($map: $viewPortColors, $key: primary);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
  padding: 50px;

  &::-webkit-scrollbar {
    display: none;
  }

  .title_section {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 35px;

    img {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      border: 4px solid map-get($map: $viewPortColors, $key: secondary);
    }

    h1 {
      font-family: $logoFont;
      color: map-get($map: $viewPortColors, $key: font);
      font-size: 32px;
      margin-top: 8px;
    }

    h2 {
      font-family: $bodyFont;
      font-size: 26px;
    }

    h3 {
      font-family: $codeFont;
      text-transform: uppercase;
      font-size: 16px;
      color: darken($color: map-get($map: $headerColors, $key: font), $amount: 15);
    }
  }

  .contador_de_projetos {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 16px;

    .contador_lista {
      list-style: none;
      display: flex;
      justify-content: space-between;

      &_item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 10px;
        border-bottom: 4px solid map-get($map: $viewPortColors, $key: primary);

        h4 {
          align-content: center;
          font-size: 24px;
          text-align: center;
          height: 100%;
          font-family: $bodyFont;
          text-transform: uppercase;
        }

        h5 {
          font-size: 32px;
          font-weight: bolder;
          font-family: $codeFont;
        }

        &:hover {
          border-bottom: 4px solid map-get($map: $tabBarColors, $key: borderPrimary);
        }
      }

      .center {
        border-left: 4px solid map-get($map: $viewPortColors, $key: secondary);
        border-right: 4px solid map-get($map: $viewPortColors, $key: secondary);
      }
    }
  }

  .container_de_miolo {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .container_de_cursos, .container_de_projetos {
      border: 2px solid map-get($map: $viewPortColors, $key: primary);
      box-shadow: inset 0px 0px 4px map-get($map: $viewPortColors, $key: shadow);
      margin-right: 10px;
      padding: 10px;
      width: 100%;
      height: 100%;
      background-color: map-get($map: $viewPortColors, $key: secondary);
      max-height: 500px;
      overflow: hidden;
      overflow-y: scroll;

      &::-webkit-scrollbar{
        display: none;
      }

      .lista_cursos, .lista_projetos {
        list-style: none;

        &_item {
          display: flex;
          border: 2px solid map-get($map: $viewPortColors, $key: secondary);
          box-shadow: 0px 0px 4px map-get($map: $viewPortColors, $key: shadow);
          padding: 10px;
          background-color: map-get($map: $viewPortColors, $key: primary);
          align-items: center;
          margin-bottom: 15px;

          img {
            height: 50px;
            width: 50px;
            margin-right: 8px;
          }

          div {
            h4 {
              overflow: hidden;
              max-width: 200px;
              font-size: 14px;
              font-weight: bolder;
              font-family: $codeFont;
              text-transform: uppercase;
              color: map-get($map: $viewPortColors, $key: font);
            }

            h5 {
              font-size: 10px;
              font-style: italic;
              font-family: $codeFont;
              text-transform: uppercase;
            }

            p {
              font-size: 12px;
              font-family: $bodyFont;
              margin-top: 5px;
            }
          }

          &:hover {
            background-color: lighten($color: map-get($map: $viewPortColors, $key: primary), $amount: 5);
          }
        }

        .final {
          margin-bottom: 0;
        }

      }
    }
  }
}
</style>
