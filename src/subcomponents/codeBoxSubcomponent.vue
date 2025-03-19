<script setup lang="ts">
import { computed } from 'vue'
import { escapeHTML, highlight } from '@/utils/base/keywords'

interface Props {
  text: string
  keywords: string[]
}

const props = defineProps<Props>()

const highlightedText = computed<string>(() => {
  let text = props.text
  text = highlight(text)
  return text
})
</script>

<template>
  <div class="text-box">
    <pre v-html="highlightedText"></pre>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;
.text-box {
  border: 2px solid map-get($map: $codeBoxColor, $key: border);
  padding: 10px;
  background-color: map-get($map: $codeBoxColor, $key: primary);
  font-size: 12px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
  font-family: $codeFont;

  &::-webkit-scrollbar {
    display: none;
  }

  pre {
    font-family: $codeFont;
    width: 10px;
    height: 10px;
    color: map-get($map: $codeColor, $key: code);
  }
}
</style>
