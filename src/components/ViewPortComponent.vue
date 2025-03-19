<script setup lang="ts">
import codeBoxSubcomponent from '@/subcomponents/codeBoxSubcomponent.vue'
import type { project, subProject } from '@/utils/class/projectClass'
import { ref, watch } from 'vue'

interface Props {
  proj: project | subProject | null
}

const props = defineProps<Props>()
const activeProject = ref<boolean>(false)

watch(
  () => props.proj,
  () => {
    activeProject.value = false
  },
)
</script>

<template>
  <div class="viewport_container">
    <div v-if="!activeProject" class="viewport_subcontainer">
      <section class="bloco_b">
        <div class="code_box_holder">
          <codeBoxSubcomponent :text="props.proj?.code_ex" :keywords="['casa', 'essa']" />
        </div>
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
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: calc(100vh - 102px);
    background-color: map-get($map: $viewPortColors, $key: secondary);
    padding: 23px;
    border-radius: 0 0 14px 0;

    .bloco_b {
      margin-left: 15px;
      width: 100%;
      height: 100%;
      max-height: 100vh;

      .code_box_holder {
        width: 100%;
        height: 100vh;
        max-height: 75%;
        border: 2px solid map-get($map: $viewPortColors, $key: primary);
        margin-bottom: 32px;
      }
    }
  }
}

@media (max-height: 555px) and (min-width: 1024px) {
  .viewport_container {
    .viewport_subcontainer {
      .bloco_b {
        height: calc(100% - 85px);
      }
    }
  }
}
</style>
