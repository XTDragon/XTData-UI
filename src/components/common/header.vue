<template>
  <header>
    <a-row class="headerRow" :style="{height:64}">
      <a-col class="headerSpan">
        <img src="/src/assets/XTDragon.png" class="logo">
      </a-col>
      <a-col :style="{}">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="light"
            mode="horizontal"
            :style="{lineHeight: '64px',minWidth:'300'}"
        >
          <a-menu-item key="1">博客</a-menu-item>
          <a-menu-item key="2">游戏</a-menu-item>
          <a-menu-item key="3">推荐</a-menu-item>
        </a-menu>
      </a-col>
    </a-row>
  </header>
</template>
<script lang="ts" setup>
import {router} from "../../router";

const pageback = function () {
  router.back();
}

</script>

<style scoped>
.logo {
  width: 200px;
  height: 64px;
  /*background-image: url("src/assets/XTDragon.png");*/
}

.headerSpan {
  height: 64px;
  margin-top: -2px;
}

.headerRow {
  height: 64px;
  width: 100%;
}
</style>
