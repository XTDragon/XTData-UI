<script setup lang="ts">

const tdataTime = ref();

const getRunTime = () => {
  let webNowDate = new Date().getTime();
  let webRunDate = webNowDate - new Date("2024-06-17 00:00:00").getTime();
  
  tdataTime.value = Math.floor(webRunDate / (1000 * 60 * 60 * 24));
};


getRunTime();

onMounted(() => {
  setInterval(() => {
    getRunTime()
  }, 1000)
})

onBeforeUnmount(() => {

})

</script>

<template>

  <a-layout-footer :style="{ textAlign: 'center' }">
    <div class="dashboard-editor-container">
      <div>
        Copyright © 2024 XTData <el-tag>本站已不稳定的运行了 {{ tdataTime }} 天</el-tag>
      </div>
    </div>

  </a-layout-footer>

</template>

<style scoped></style>