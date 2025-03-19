<script setup lang="ts">
import type { project } from '@/utils/class/projectClass'
import { ref } from 'vue'

interface Props {
  projeto1: project | null
  projeto2: project | null
  projeto3: project | null
}

const retornar = './src/assets/images/icones/back-svgrepo-com.svg'
const minimize = './src/assets/images/icones/minimize-window-svgrepo-com.svg'
const maximize = './src/assets/images/icones/maximize-svgrepo-com.svg'
const close = './src/assets/images/icones/close-bold-svgrepo-com.svg'

const windowSize = ref<string>('null')
const props = defineProps<Props>()
const emit = defineEmits(['size'])

const handleWindowSize = (size: string) => {
  switch (size) {
    case 'maximized':
      if (windowSize.value === 'maximized') {
        windowSize.value = 'null'
      } else {
        windowSize.value = size
      }

      sendSize()
      break
    case 'minimized':
      if (windowSize.value === 'minimized') {
        windowSize.value = 'null'
      } else {
        windowSize.value = size
        alert(
          'A funcionalidade minimizar e fechar ainda não foram implementadas. Por enquanto apenas executará uma troca de cor de alguns caracteres.',
        )
      }

      sendSize()
      break
    case 'closed':
      if (windowSize.value === 'closed') {
        windowSize.value = 'null'
      } else {
        windowSize.value = size
        alert(
          'A funcionalidade minimizar e fechar ainda não foram implementadas. Por enquanto apenas executará uma troca de cor de alguns caracteres.',
        )
      }

      sendSize()
      break
    default:
      windowSize.value = 'null'
      sendSize()
      break
  }
}

const sendSize = () => {
  emit('size', windowSize.value)
}

const nullValueHandler = (valor: number, icon: boolean) => {
  if (valor === 1) {
    if (props.projeto1 === null) {
      return ''
    }
    if (icon) {
      return props.projeto1.icon
    } else {
      return props.projeto1.name
    }
  } else if (valor === 2) {
    if (props.projeto2 === null) {
      return ''
    }
    if (icon) {
      return props.projeto2.icon
    } else {
      return props.projeto2.name
    }
  } else {
    if (props.projeto3 === null) {
      return ''
    }
    if (icon) {
      return props.projeto3.icon
    } else {
      return props.projeto3.name
    }
  }
}

const abreviateName = (nome: string) => {
  if (nome.toLowerCase() === 'cryptograma') {
    return 'CRPT'
  } else if (nome.toLowerCase() === 'agência triângulo') {
    return 'AGTR'
  } else if (nome.toLowerCase() === 'oohimuraoo') {
    return '{H}'
  }
}
</script>

<template>
  <div class="header_container">
    <div class="bloco_1">
      <nav>
        <div id="logo">
          <h1>{H}</h1>
        </div>
        <ul>
          <li>
            <a href="#"> File </a>
          </li>
          <li>
            <a href="#"> Edit </a>
          </li>
          <li>
            <a href="#"> Select </a>
          </li>
          <li>
            <a href="#"> View </a>
          </li>
          <li>
            <a href="#" id="retornar">
              <img :src="retornar" alt="retornar" />
            </a>
          </li>
          <li>
            <a href="#" id="avancar">
              <img :src="retornar" alt="avançar" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="bloco_2">
      <div class="title_box">
        <h1>F (H) { }</h1>
      </div>
    </div>
    <div class="gran_bloco">
      <div class="bloco_3">
        <ul>
          <li v-if="projeto1 !== null">
            <a href="https://timeazul.itch.io/cryptograma" target="_blank">
              <img :src="nullValueHandler(1, true)" :alt="nullValueHandler(1, false)" />
              <span>{{ abreviateName(nullValueHandler(1, false)) }}</span>
            </a>
          </li>
          <li v-if="projeto2 !== null">
            <a href="https://agencia-triangulo.vercel.app/" target="_blank">
              <img :src="nullValueHandler(2, true)" :alt="nullValueHandler(2, false)" />
              <span>{{ abreviateName(nullValueHandler(2, false)) }}</span>
            </a>
          </li>
          <li v-if="projeto3 !== null">
            <a href="https://github.com/oOHimuraOo/" target="_blank">
              <img :src="nullValueHandler(3, true)" :alt="nullValueHandler(3, false)" />
              <span>{{ abreviateName(nullValueHandler(3, false)) }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="bloco_4">
        <ul>
          <li>
            <a href="#" @click.prevent="handleWindowSize('minimized')">
              <img :src="minimize" alt="minimizar" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="handleWindowSize('maximized')">
              <img :src="maximize" alt="maximizar" />
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="handleWindowSize('closed')">
              <img :src="close" alt="fechar" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/sasss/variables.scss' as *;

.header_container {
  height: 30px;
  background-color: map-get($map: $headerColors, $key: primary);
  display: flex;
  justify-content: space-between;
  padding: 3px 14px;

  .bloco_1 {
    nav {
      display: flex;
      width: 223px;
      height: 20px;
      align-items: center;

      #logo {
        margin-right: 26px;
        height: 20px;
        width: 20px;
        border: 1px solid map-get($map: $headerColors, $key: font);
        border-radius: 3px;
        display: flex;
        align-items: center;

        h1 {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 20px;
          width: 20px;
          font-size: 12px;
          font-family: $logoFont;
        }
      }

      ul {
        display: flex;
        justify-content: space-between;
        width: 100%;
        list-style: none;

        li {
          display: flex;
          font-family: $logoFont;
          font-size: 12px;
          height: 20px;
          align-items: center;

          a {
            display: flex;
            width: 35px;
            height: 20px;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: map-get($map: $headerColors, $key: font);

            &:hover {
              text-decoration: overline;
            }
          }

          #retornar,
          #avancar {
            height: 20px;
            width: 20px;
            text-decoration: none;

            img {
              height: 20px;
              width: 20px;
            }
          }

          #avancar {
            img {
              transform: scaleX(-1);
            }
          }
        }
      }
    }
  }

  .bloco_2 {
    height: 20px;
    width: 255px;

    .title_box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 2px 0;
      border-radius: 20px;
      background-color: map-get($map: $headerColors, $key: secondary);
      width: 100%;
      height: 100%;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        box-shadow: inset 0 0 2px map-get($map: $headerColors, $key: font);
        pointer-events: none;
      }

      h1 {
        font-size: 12px;
        font-family: $logoFont;
      }
    }
  }

  .gran_bloco {
    display: flex;
    .bloco_3 {
      height: 20px;
      margin-right: 10px;
      margin-top: auto;

      ul {
        display: flex;
        list-style: none;
        height: 20px;

        li {
          margin-left: 10px;

          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 20px;
            width: 20px;
            text-decoration: none;
            transition: all 0.5s ease;

            &:hover {
              img {
                height: 10px;
                width: 10px;
              }

              span {
                opacity: 1;
                visibility: visible;
                color: map-get($map: $headerColors, $key: fontSecondary);
              }
            }

            img {
              height: 20px;
              width: 20px;
              transition:
                height 0.5s ease,
                width 0.5s ease;
            }

            span {
              opacity: 0;
              visibility: hidden;
              justify-content: center;
              align-items: center;
              font-size: 8px;
              font-family: $logoFont;
              color: map-get($map: $headerColors, $key: font);
              font-weight: bold;
              transition:
                opacity 0.5s ease,
                visibility 0.5s ease;
            }
          }
        }
      }
    }

    .bloco_4 {
      height: 20px;

      ul {
        display: flex;
        list-style: none;
        height: 20px;

        li {
          margin-left: 5px;

          a {
            height: 20px;
            width: 20px;

            img {
              height: 20px;
              width: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
