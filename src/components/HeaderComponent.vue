<script setup lang="ts">
const retornar = './src/assets/images/icones/back-svgrepo-com.svg'
const minimize = './src/assets/images/icones/minimize-window-svgrepo-com.svg'
const maximize = './src/assets/images/icones/maximize-svgrepo-com.svg'
const close = './src/assets/images/icones/close-bold-svgrepo-com.svg'
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
            <a href="#">
              File
            </a>
          </li>
          <li>
            <a href="#">
              Edit
            </a>
          </li>
          <li>
            <a href="#">
              Select
            </a>
          </li>
          <li>
            <a href="#">
              View
            </a>
          </li>
          <li>
            <a href="#" id="retornar">
              <img :src="retornar" alt="retornar">
            </a>
          </li>
          <li>
            <a href="#" id="avancar">
              <img :src="retornar" alt="avançar">
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="bloco_2">
      <div class="title_box">
        <h1>f(H){}</h1>
      </div>
    </div>
    <div class="gran_bloco">
      <div class="bloco_3">
        <ul>
          <li>
            <a href="#">
              <img src="https://via.placeholder.com/15x15" alt="projeto_1">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="https://via.placeholder.com/15x15" alt="projeto_2">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="https://via.placeholder.com/15x15" alt="projeto_3">
            </a>
          </li>
        </ul>
      </div>
      <div class="bloco_4">
        <ul>
          <li>
            <a href="#">
              <img :src="minimize" alt="minimizar">
            </a>
          </li>
          <li>
            <a href="#">
              <img :src="maximize" alt="maximizar">
            </a>
          </li>
          <li>
            <a href="#">
              <img :src="close" alt="fechar">
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

          #retornar, #avancar {
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
