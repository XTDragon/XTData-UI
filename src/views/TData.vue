<template>
  <a-layout>
    <Header>

    </Header>
    <a-layout-content>
      <!--      <el-row>-->
      <!--          <swiper-->
      <!--              :modules="modules"-->
      <!--              :slides-per-view="1"-->
      <!--              :space-between="50"-->
      <!--              navigation-->
      <!--              class="mySwiper"-->
      <!--              :autoplay="{-->
      <!--            delay:2500,-->
      <!--            disableOnInteraction:false-->
      <!--          }"-->
      <!--              :loop="true"-->
      <!--              :centeredSlides="true"-->
      <!--              :pagination="{ clickable: true }"-->
      <!--              :scrollbar="{ draggable: true }"-->
      <!--              @swiper="onSwiper"-->
      <!--              @slideChange="onSlideChange"-->
      <!--          >-->
      <!--            <swiper-slide>-->
      <!--              <img class="image" src="../assets/IMG_20230625_190831.jpg">-->
      <!--            </swiper-slide>-->
      <!--            <swiper-slide>-->
      <!--              <img class="image" src="../assets/IMG_20230730_190941.jpg">-->
      <!--            </swiper-slide>-->
      <!--            <swiper-slide>-->
      <!--              <img class="image" src="../assets/IMG_20230802_190408.jpg">-->
      <!--            </swiper-slide>-->
      <!--          </swiper>-->
      <!--      </el-row>-->
      <div style="display: flex;">
        <div style="width: 90%">
          <blog-list v-for="(item, key) in blogList.data" :key="key" :data="item">
          </blog-list>
        </div>
        <date style="padding: 20px">

        </date>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">

import {defineComponent, ref} from 'vue';
import Header from "../components/common/header.vue";

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import BlogList from "../components/common/blogList.vue";
import axios from "axios";
import Date from '../components/date/date.vue'

export default defineComponent({
  components: {
    BlogList,
    Header,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const route = useRoute()
    const game = ref(route.query.fileName);


    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };

    const blogList = reactive({data: []})
    const getblogList = () => {
      axios.get("/api/get/bloglist").then(response => {
        blogList.data = response.data.data;
      })
    };
    getblogList();
    console.log(blogList)
    return {
      // date: new Date(),
      onSwiper,
      onSlideChange,
      game,
      blogList,
      modules: [Navigation, Pagination, Scrollbar, A11y],
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

.mySwiper {
//width: 70%; height: 200px;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.item img {
  width: 100%;
  height: auto;
  transform: scale(1);
  transition: transform 1s ease 0s;
}

.item:hover img {
  transform: scale(1.1);
}

.image {
  width: 100%;
  height: 100%;
  /*background-image: url("src/assets/XTDragon.png");*/
}

</style>
