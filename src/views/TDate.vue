<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Menu>
          </Menu>
        </el-aside>
        <el-container>
          <el-main>
            <Fc>

            </Fc>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Menu from "../components/common/menu.vue";
import Header from "../components/common/header.vue";
import Fc from "../components/games/fc/fc.vue";

export default {
  name: "TDate",
  components: {Fc, Header, Menu},
}
</script>

<style scoped>

</style>