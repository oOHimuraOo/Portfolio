<script setup lang="ts">
import CarousselSubcomponent from '@/subcomponents/CarousselSubcomponent.vue';
import codeBoxSubcomponent from '@/subcomponents/codeBoxSubcomponent.vue';
import type { project, subProject } from '@/utils/class/projectClass';
import { codeSnippet } from '@/utils/models/codeModel';
import { ref, watch } from 'vue';

interface Props {
  proj: project | subProject | null
}

const props = defineProps<Props>()
const activeProject = ref<boolean>(false)

watch(
  () => props.proj, () => {
    activeProject.value = false
  }
)

</script>

<template>
  <div class="viewport_container">
    <div v-if="!activeProject" class="viewport_subcontainer">
      <section class="bloco_a">
        <div class="page_title">
          <h1>{{ props.proj?.name }}</h1>
        </div>
        <div class="caroussel">
          <CarousselSubcomponent />
        </div>
        <div class="specs_tools">
          <div class="title">
            <h2>Tecnoligias e Algoritimos</h2>
          </div>
          <div class="corpo">
            <div class="text_a">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo earum voluptates consequuntur tempore ad exercitationem quam! Minima aut ullam nulla quam nesciunt corrupti, distinctio quibusdam nihil, inventore nam adipisci sit.</p>
            </div>
            <div class="text_b">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam officia, voluptates amet vitae optio doloribus sit expedita porro reiciendis aperiam nisi voluptate dolore repellendus, deleniti tempora mollitia aut autem recusandae.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bloco_b">
        <div class="code_box_holder">
          <codeBoxSubcomponent :text="codeSnippet" :keywords="['casa', 'essa']"/>
        </div>
        <button>run project</button>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.viewport_container {
  width: 100%;
  height: 100%;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: map-get($map: $viewPortColors, $key: primary);

  .viewport_subcontainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 100%;
    max-height: 100%;
    background-color: map-get($map: $viewPortColors, $key: secondary);
    padding: 23px;
    border-radius: 0 0 14px 0;

    .bloco_a {
      display: flex;
      flex-direction: column;
      align-items: center;

      .page_title {
        color: map-get($map: $viewPortColors, $key: font);
        font-size: 18px;
        font-family: $bodyFont;
        text-transform: uppercase;
      }

      .caroussel {
        width: 320px;
        height: 320px;
        border: 1px solid black;
        margin-bottom: 10px;
      }

      .specs_tools {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 320px;
        height: 100%;

        .title {
          color: map-get($map: $viewPortColors, $key: font);
          background-color: map-get($map: $viewPortColors, $key: primary);
          width: 100%;
          padding: 4px;

          h2 {
            text-align: center;
            font-size: 16px;
            font-family: $bodyFont;
            text-transform: capitalize;
          }
        }

        .corpo {
          display: flex;
          border: 3px solid map-get($map: $viewPortColors, $key: primary);
          box-shadow: inset 2px 0 4px map-get($map: $viewPortColors, $key: shadow);
          height: 100%;

          .text_a {
            padding: 8px;
            border-right: 2px solid map-get($map: $viewPortColors, $key: primary);
            box-shadow: inset 0 0 4px map-get($map: $viewPortColors, $key: shadow);

            p {
              overflow-y: scroll;
              height: 100%;
              font-family: $bodyFont;

              &::-webkit-scrollbar {
                display: none;
              }
            }
          }

          .text_b {
            padding: 8px;
            border-left: 2px solid map-get($map: $viewPortColors, $key: primary);
            box-shadow: inset 0 0 4px map-get($map: $viewPortColors, $key: shadow);
            height: 100%;

            p {
              overflow-y: scroll;
              height: 100%;
              font-family: $bodyFont;

              &::-webkit-scrollbar {
                display: none;
              }
            }
          }
        }
      }
    }

    .bloco_b {
      display: flex;
      flex-direction: column;
      margin-left: 15px;

      .code_box_holder {
        width: 100%;
        height: 100%;
        border: 2px solid map-get($map: $viewPortColors, $key: primary);
        margin-bottom: 32px;
      }

      button {
        border-radius: 10px;
        background-color: map-get($map: $viewPortColors, $key: primary);
        font-size: 32px;
        border: none;
        outline: none;
        box-shadow: 1px 2px 3px map-get($map: $viewPortColors, $key: shadow);
        color: map-get($map: $viewPortColors, $key: font);
        cursor: pointer;

        &:active {
          box-shadow: 3px 2px 1px map-get($map: $viewPortColors, $key: shadow);
        }

      }
    }
  }
}
</style>
