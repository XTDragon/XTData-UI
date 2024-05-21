<template>
  <a-layout>
    <Header>

    </Header>
    <a-layout-content>
      <!--      轮播图组件-->
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
        <div class="overflow-y-hidden blog-container" @scroll="handleScroll">
          <blog-list v-for="(item, key) in blogList" :key="key" :data="item">
          </blog-list>
        </div>

        <div style="position: fixed;top: 10%;left: 70%;width: 20%">
          <!--          天气组件-->
          <!--          <div id="ww_d6a8fcf4845e7" v='1.3' loc='auto' a='{"t":"horizontal","lang":"zh","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'><a href="https://weatherwidget.org/zh/" id="ww_d6a8fcf4845e7_u" target="_blank">天气插件</a></div>-->
          <!--          <component is="script" async src="https://app2.weatherwidget.org/js/?id=ww_d6a8fcf4845e7"></component>-->
          <div style="border: 5px;border-radius: 10px">
            <date style="padding: 20px;"></date>
          </div>
          <div>
            <el-table :data="this.tableData">
              <el-table-column prop="gameName" label="游戏">
                <template #default="scope">
                  <div @click="handleClick(scope.row)">
                    {{ scope.row.gameName }}
                  </div>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>

      </div>
    </a-layout-content>
    <Footer></Footer>
  </a-layout>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue';
import Header from "../components/common/header.vue";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import BlogList from "../components/common/blogList.vue";
import axios from "axios";
import { router } from '../router';
import Footer from "@/components/common/footer.vue";

import { loadOml2d } from 'oh-my-live2d'

loadOml2d({
  models: [
    {
      "path": 'https://model.oml2d.com/cat-black/model.json',
      "scale": 0.15,
      "position": [0, 20],
      "stageStyle": {
        "height": 350
      }
    },
    {
      "path": 'https://model.oml2d.com/cat-white/model.json',
      "scale": 0.15,
      "position": [0, 20],
      "stageStyle": {
        "height": 350
      }
    },
    {
      "path": "https://model.oml2d.com/HK416-1-normal/model.json",
      "position": [-30, 50],
      "scale": 0.08,
      "stageStyle": {
        "height": 450
      }
    }
  ]
  // ...options
});


export default defineComponent({
  components: {
    Footer,
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
        // console.log(response.data.data);
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
      console.log(scope)
      router.push({
        path: 'Game',
        query: {
          game_id: scope.gameId,
        }
      })
    };

    interface Blog {
      id: number;
      title: string;
      img_url: string;
      img_file: string;
      create_time: string;
      look_times: string;
      comments: string;
      content: string;
      last_modified_time: string;
      enable: boolean;
    }

    // let blogList = reactive({
    //   data: [],
    // })
    let blogList: Blog[] = reactive([])
    const getblogList = () => {
      axios.get("/api/getbloglist").then(response => {
        var data = response.data.data;
        for (let dataKey in data) {
          var content = data[dataKey].content
          data[dataKey].summary = content.toString().substring(0, 300)
          blogList.push(data[dataKey]);
        }
      })
      // console.log(blogList);
    };
    getblogList();
    getData();
    return {
      onSwiper,
      onSlideChange,
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
.mySwiper {
  /* width: 70%; height: 200px; */
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

.blog-container {
  margin-top: 4.5%;
  width: 60%;
  margin-left: 10%;
}

.main-container {
  display: flex;
  /* //width: 60%; //overflow: hidden; */
}
</style>
