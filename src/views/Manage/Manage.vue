<script setup lang="ts">

import Header from "@/components/common/header.vue";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import Footer from "@/components/common/footer.vue";

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="common-layout" style="height: 100%;">
    <el-container class="container" style="height: 100vh;">
      <el-header>
        <Header></Header>
      </el-header>

      <el-container>
        <el-aside width="16%" >
          <el-menu
              style="height: 100%;"
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router
          >

            <el-menu-item index="1">
              <el-icon>
                <icon-menu/>
              </el-icon>
              <span>博客概览</span>
            </el-menu-item>

            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <location/>
                </el-icon>
                <span>博客管理</span>
              </template>
              <el-menu-item index="/UserManage">人员管理</el-menu-item>
              <el-menu-item index="/BlogManage">博客管理</el-menu-item>
            </el-sub-menu>

<!--            <el-menu-item index="3" disabled>-->
<!--              <el-icon>-->
<!--                <document/>-->
<!--              </el-icon>-->
<!--              <span>Navigator Three</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="4">-->
<!--              <el-icon>-->
<!--                <setting/>-->
<!--              </el-icon>-->
<!--              <span>Navigator Four</span>-->
<!--            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>

          </el-main>
          <el-footer>
            footer
<!--            <Footer>-->

<!--            </Footer>-->
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.container{
  height: 100%;
}
</style>