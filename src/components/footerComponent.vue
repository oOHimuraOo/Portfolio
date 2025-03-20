<script setup lang="ts">
import type { footer } from '@/utils/class/siteInfoClass';


interface Props {
  info: footer
}

const calendar = "./src/assets/images/icones/calendar-small-svgrepo-com.svg"
const graduate = "./src/assets/images/icones/graduate-certificate-svgrepo-com.svg"
const certificate = "./src/assets/images/icones/education-certificate-with-letters-cpe-and-a-ribbon-svgrepo-com.svg"
const totalEducation = "./src/assets/images/icones/graduate-svgrepo-com.svg"
const Fullstack = "./src/assets/images/icones/stack2-svgrepo-com.svg"
const gamedev = "./src/assets/images/icones/game-controller-svgrepo-com.svg"
const views = "./src/assets/images/icones/globe-svgrepo-com.svg"

const props = defineProps<Props>()
</script>

<template>
  <div class="footer_container">
    <div class="status" :class="{offline: props.info.status}">
      <h1>{H}</h1>
    </div>
    <div class="bars">
      <div class="left_bar">
        <div>
          <img :src="calendar" alt="last Updated at">
          <span>{{ props.info.lastUpdate }}</span>
        </div>
        <div>
          <img :src="views" alt="views">
          <span>{{ props.info.views }}</span>
        </div>
        <div>
          <img :src="totalEducation" alt="Quantity of certificates and diplomas">
          <span>{{ props.info.totalCourses }}</span>
        </div>
        <div>
          <img :src="certificate" alt="Quantity of certificates">
          <span>{{ props.info.certificates }}</span>
        </div>
        <div>
          <img :src="graduate" alt="Quantity of diplomas">
          <span>{{ props.info.graduations }}</span>
        </div>
      </div>
      <div class="center_bar">
        <div>
          <img :src="Fullstack" alt="">
          <span>{{ props.info.author }}</span>
        </div>
        <div>
          <img :src="gamedev" alt="">
          <span>{{ props.info.madeIn }}</span>
        </div>
      </div>
      <div class="right_bar">
        <div>
          <img v-for="(url, index) in props.info.expertise" :src="url" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.footer_container {
  display: flex;
  background-color: map-get($map: $footerColors, $key: primary);

  .status {
    background-color: map-get($map: $footerColors, $key: secondary);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 16px;
      font-family: $logoFont;
      color: map-get($map: $footerColors, $key: font);
    }
  }

  .offline {
    background-color: map-get($map: $footerColors, $key: terciary);
  }

  .bars {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
    margin-left: 8px;

    .left_bar {
      display: flex;

      div {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 10px;
          margin-left: 4px;
          margin-right: 12px;
          font-family: $codeFont;
          color: map-get($map: $footerColors, $key: font);
        }

        img {
          height: 15px;
          width: 15px;
        }
      }
    }

    .center_bar {
      display: flex;
      justify-content: center;

      div {
        display: flex;
        align-items: center;

        span {
          font-size: 10px;
          margin-left: 4px;
          margin-right: 12px;
          font-family: $codeFont;
          color: map-get($map: $footerColors, $key: font);
        }

        img {
          height: 15px;
          width: 15px;
        }
      }
    }

    .right_bar {
      display: flex;
      justify-content: flex-end;
      margin-right: 8px;

      div {
        display: flex;
        align-items: center;

        img {
          height: 15px;
          width: 15px;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
