<template>
  <a-layout>
    <Header>

    </Header>
    <a-layout-content>
      <fc :game_id="game_id">
      </fc>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import Header from "../components/common/header.vue";
import Fc from "../components/games/fc/fc.vue";

//首先在setup中定义


export default defineComponent({
  components: {
    Header,
    Fc,
  },
  setup() {

    const route = useRoute()
    const game_id=ref(route.query.game_id);
    return {
      game_id,
      selectedKeys: ref<string[]>(['2']),
    };
  },
});
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
