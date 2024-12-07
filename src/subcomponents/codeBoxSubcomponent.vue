<script setup lang="ts">
import { computed } from 'vue';
import { applyHighlighting, isCallableString, isDeclaration, isUrlString, simpleStringChecker, compoundStringChecker, negationChecker, numericChecker, keywordRules } from '@/utils/base/keywords';

interface Props {
  text: string;
  keywords: string[];
}

const props = defineProps<Props>();

const highlightedText = computed(() => {
  let text = props.text;
  text = applyHighlighting(text, compoundStringChecker)
  text = applyHighlighting(text, simpleStringChecker)
  text = applyHighlighting(text, keywordRules)
  text = applyHighlighting(text, numericChecker)
  text = applyHighlighting(text, negationChecker)
  text = applyHighlighting(text, isCallableString)
  text = applyHighlighting(text, isDeclaration)
  text = applyHighlighting(text, isUrlString)

  return text
});

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
    color: map-get($map: $codeColor, $key: code)
  }
}


</style>
