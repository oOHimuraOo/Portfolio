<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Slide {
  image: string;
  alt: string;
  title: string;
}

const slides = ref<Slide[]>([
  { image: 'http://via.placeholder.com/300x300', alt: 'Slide 1', title: 'Titulo do Slide 1' },
  { image: 'http://via.placeholder.com/400x400', alt: 'Slide 2', title: 'Titulo do Slide 2' },
  { image: 'http://via.placeholder.com/500x500', alt: 'Slide 3', title: 'Titulo do Slide 3' },
]);

const currentIndex = ref(0);
const showingTitle = ref(false);
let titleTimeout: ReturnType<typeof setTimeout> | undefined;
let slideTimeout: ReturnType<typeof setTimeout> | undefined;

const prevSlide = () => {
  currentIndex.value = (currentIndex.value === 0) ? slides.value.length - 1 : currentIndex.value - 1;
  autoPassSlide()
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value === slides.value.length - 1) ? 0 : currentIndex.value + 1;
  autoPassSlide()
};

const autoPassSlide = () => {
  clearTimeout(slideTimeout)
  slideTimeout = setTimeout(() => {
    nextSlide()
  }, 5000)
}

onMounted(() => {
  autoPassSlide()
})

const showTitle = () => {
  showingTitle.value = true;
  clearTimeout(titleTimeout);
  titleTimeout = setTimeout(() => {
    showingTitle.value = false;
  }, 3000);
};

const hideTitle = () => {
  showingTitle.value = false;
  clearTimeout(titleTimeout);
};
</script>

<template>
  <div class="carousel" @mouseover="showTitle" @mouseleave="hideTitle">
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['carousel-item', { active: index === currentIndex }, {disabled: index !== currentIndex}]"
      >
        <img :src="slide.image" :alt="slide.alt">
        <div class="title-overlay" v-if="showingTitle">{{ slide.title }}</div>
      </div>
    </div>
    <button class="carousel-control prev" @click="prevSlide">&#10094;</button>
    <button class="carousel-control next" @click="nextSlide">&#10095;</button>
  </div>
</template>


<style scoped lang="scss">
.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
  overflow: hidden;

  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;

    .carousel-item {
      position: relative;
      min-width: 100%;
      transition: opacity 0.5s ease;
      opacity: 0;

      &.active {
        display: block;
        opacity: 1;
      }
      &.disabled {
        display: none;
      }

      img {
        width: 100%;
        display: block;
      }

      .title-overlay {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        display: none;
      }
    }
  }

  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 24px;
    padding: 10px;
    cursor: pointer;
    display: none;

    &.prev {
      left: 0;
    }

    &.next {
      right: 0;
    }
  }

  &:hover .carousel-control.prev,
  &:hover .carousel-control.next {
    display: block;
  }

  &:hover .carousel-item .title-overlay {
    display: block;
  }
}
</style>
