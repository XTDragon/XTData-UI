<template>
  <div style="display: flex;">
    <Header>
    </Header>

    <div class="my-blog">
      <div>
        <el-link href="/blogs">主页</el-link>
        <el-divider direction="vertical"></el-divider>
        <span>
          <el-link type="success" href="/blog/add" :disabled="!hasLogin">发表文章</el-link>
        </span>
        <el-divider direction="vertical"></el-divider>
        <span v-show="!hasLogin">
          <el-link type="primary" href="/login">登陆</el-link>
        </span>
        <span v-show="hasLogin">
          <el-link type="danger" @click="logout">退出</el-link>
        </span>
      </div>
      <!--      <h2>{{ blog.data.title }}</h2>-->
      <!--      <el-link icon="el-icon-edit" ><router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link></el-link>-->
      <!--      <el-divider></el-divider>-->
      <div class="content markdown-body" v-html="blog.data.content"></div>
    </div>
  </div>
  <Footer>

  </Footer>
</template>

<script lang="ts">
import 'github-markdown-css/github-markdown.css'
import {defineComponent} from 'vue';
import Header from "../components/common/header.vue";
import axios from "axios";
import MarkdownIt from 'markdown-it';

export default defineComponent({
  components: {Header},
  setup() {
    const {query, params} = useRoute()
    const blog = reactive({
      data: {
        content: {}
      }
    })
    const getblogList = () => {
      console.log(params)
      axios.get("/api/blog/" + params.blogid).then(response => {
        blog.data = response.data.data;
      })
    };


    const getblogMarkDown = () => {
      console.log(params)
      const md = new MarkdownIt()
      axios.get("/api/blog/" + params.blogid).then(response => {
        blog.data = response.data.data;
        var result = md.render(response.data.data.content);
        blog.data.content = result;
      })
    };

    getblogMarkDown();

    return {
      blog
    }
  },

  props: {},
});
</script>

<style scoped>
.my-blog {
  width: 60%;
  margin: 5% auto auto;
}
</style>
