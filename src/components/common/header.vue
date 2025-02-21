<template>
  <header>
    <a-row class="headerRow">
      <div style="display: flex; width: 80%;margin: auto">
        <a-col class="headerSpan" :span="4">
          <img src="/src/assets/XTDragon.png" @click="GoXTData()" class="logo">
        </a-col>
        <a-col :span="20">
          <a-menu @select="handleSelect" :openKeys="[openKeys]" theme="light" mode="horizontal"
            :style="{ lineHeight: '64px', minWidth: '300' }">
            <!--              <a-menu-item key="1" @click="GoXTDragon()">博客</a-menu-item>-->
            <a-menu-item key="2" @click="GoGameList()">游戏</a-menu-item>
            <a-menu-item key="3" @click="GoManage()">管理</a-menu-item>
            <a-menu-item key="4" @click="GoVideoList()">视频</a-menu-item>
            <a-menu-item key="5" @click="GoTest()">推荐</a-menu-item>
            <a-menu-item  style="width:30% ;" class="searchItem" >
              <div style="width: 100%;">
                    <el-input v-model="input" placeholder="Please input" clearable
                  style=" width: 75% ; margin-right: 5%;" />
                  <el-button style="width: 20%; "  @click="Search()">搜索</el-button>
              </div>
            </a-menu-item>
          </a-menu>
        </a-col>
      </div>
    </a-row>

  </header>
</template>
<script lang="ts" setup>
import { router } from "../../router";
import axios from "axios";

const openKeys = ref('aaa')

const input = ref('')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  openKeys.value=key;

}

const pageback = function () {
  router.back();
}

const GoXTDragon = function () {
  window.open('https://www.xtdragon.info', '_blank');
}

const GoXTData = function () {
  router.push("/")
}
const GoGameList = function () {
  router.replace("/GameList")
}


const GoManage = function () {
  router.replace("/Manage")
}

const GoVideoList = function () {
  router.push("VideoList")
}

const GoTest = function () {
  router.push("Test")
}

const Search = () => {
  axios.get("/api/Search/", {
    params: {
      input: input.value,
    }
  }).then(response => {
    var data = response.data.data;
    // tableData.value = data;
  })
}


</script>

<style scoped>
.logo {
  width: 100%;
  height: 64px;
  /*background-image: url("src/assets/XTDragon.png");*/
}

.headerSpan {
  height: 64px;
  margin-top: -2px;
}

.headerRow {
  position: fixed;
  background: #FFFFFF;
  z-index: 100;
  height: 64px;
  width: 100%;
}

.searchItem {
    background-color: #bccce0 !important;
    color: #fff !important;
}

</style>
