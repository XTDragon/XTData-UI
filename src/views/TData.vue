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

      <div class="main-container">
        <div class="blog-container overflow-y-hidden"  @scroll="handleScroll">
          <blog-list v-for="(item, key) in blogList.data" :key="key" :data="item">
          </blog-list>
        </div>

        <!--        <InfiniteList-->
        <!--            :data="blogList.data"-->
        <!--            :width="'90%'"-->
        <!--            :height="500"-->
        <!--            :itemSize="90"-->
        <!--            v-slot="item,index"-->
        <!--        >-->
        <!--          <div class="li-con"> 111 </div>-->
        <!--          <div class="li-con"> {{item}} </div>-->
        <!--          <div class="li-con"> {{index}} </div>-->
        <!--        </InfiniteList>-->
        <div>
          <div style="border: 5px;border-radius: 10px">
            <date style="padding: 20px;"></date>
          </div>
          <dev style="border-radius: 10px">
            <el-table :data="this.tableData" style="background: aqua;">
              <el-table-column prop="gameName" label="游戏" width="280">
                <template #default="scope">
                  <div @click="handleClick(scope.row)">
                    {{ scope.row.gameName }}
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </dev>
        </div>
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
import {router} from '../router';



export default defineComponent({
  components: {
    BlogList,
    Header,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const route = useRoute()

    // const game = ref(route.query.fileName);

    interface TableItem {
      gameName: string;
    }

    const tableData = ref<TableItem[]>([]);

    const handleScroll = () => {

    }

    const getData = () => {
      axios.get("/api/GameList").then(response => {
        console.log(response.data.data);
        var data = response.data.data;
        tableData.value = data;
      })
    }

    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };

    const handleClick = (scope: any) => {
      console.log(1111)
      console.log(scope)
      router.push({
        path: 'Game',
        query: {
          game_id: scope.gameId,
        }
      })
    };

    const blogList = reactive({data: []})
    const getblogList = () => {
      axios.get("/api/get/bloglist").then(response => {
        blogList.data = response.data.data;
      })
    };
    getblogList();
    getData();
    console.log(blogList)
    return {
      // date: new Date(),
      onSwiper,
      onSlideChange,
      // game,
      blogList,
      getData,
      modules: [Navigation, Pagination, Scrollbar, A11y],
      tableData,
      handleClick,
      handleScroll,
      selectedKeys: ref<string[]>(['2']),
    };
  },
});
</script>
<style scoped>
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

.blog-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.main-container{
  display: flex;
  width: 100%;
  overflow: hidden;
}
</style>
