<script setup lang="ts">

import axios from "axios";
import 'video.js/dist/video-js.css'
import { VideoPlayer } from 'vue-video-player'

const file = ref()
const changeFile = (uploadFile: any) => {
  file.value = uploadFile;
}

const submitUpload = () => {
  const params = new FormData()
  params.append("fileName", file.value.name);
  params.append("multipartFile", file.value.raw);
  console.log(params.get("fileName"));
  axios.post("/api/upload", params).then(response => {
    if (response.data.code === 200) {
      ElNotification({
        type: 'success',
        message: '上传成功'
      })
    } else {  // 请求失败
      ElNotification({
        type: 'error',
        message: response.data.message
      })
    }

  })
}

import type { UploadContext } from 'element-plus'
const uploadRef = ref<UploadContext>()

const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref()

const playerOptions = {
  playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
  autoplay: false, //如果true,浏览器准备好时开始回放。
  muted: false, // 默认情况下将会消除任何音频。
  loop: false, // 导致视频一结束就重新开始。
  // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: 'zh-CN',
  aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  sources: [
    // {
    //   type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
    //   src: "http://vjs.zencdn.net/v/oceans.mp4" // url地址
    // },
    {
      type: "video/mp4",// 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
      src: "http://localhost:3000/api/video/get/2" // url地址
    },
  ],
  // poster: "https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=600y500", // 你的封面地址
  notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,    //当前时间和持续时间的分隔符
    durationDisplay: true,  //显示持续时间
    remainingTimeDisplay: false,   //是否显示剩余时间功能
    fullscreenToggle: true,  //全屏按钮
    playToggle: true, //播放暂停按钮
    volumeMenuButton: false,  //音量控制
    currentTimeDisplay: true, //当前播放时间
  }
};

const videos = ref();

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getVideoPage();
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getVideoPage();
}

const getVideoPage = () => {
  axios.get("/api/video/page", {
    params: {
      pageSize: pageSize.value,
      currentPage: currentPage.value,
    }
  }).then(response => {
    console.log(response.data.data)
    total.value = response.data.data.total;
    videos.value = response.data.data.list;

  })
};
getVideoPage();

const getVideoById = (param: String) => {
  return "http://localhost:9090/video/get/" + param
  axios.get("/api/video/" + param).then(response => {
  })
};

</script>

<template>
  <Header></Header>

  <main class="main-view">
    <section>
      <ul>
        <li v-for="(item, index) in videos" :key="index">
          <div class="border-container">
            <div class="img-container">
              <a :href="getVideoById(item.id)" target="_blank">
                <img :src="'https://pic.imgdb.cn/item/64a77dec1ddac507ccc7c590.jpg'" alt="" loading="lazy">
              </a>
            </div>
            <a :href="'https://kotokawa-akira-mywife.site/web/Video/' + item.id" target="_blank">
              <div class="main-recommend-li-title" :title="item.fileName">
                {{ item.fileName }}
              </div>
            </a>
            <div class="main-recommend-li-detail-container">
              <div class="main-recommend-li-detail" :title="item.fileSize">
                <a :href="'https://kotokawa-akira-mywife.site/web/Mine/' + item.up" target="_blank">
                  <div class="upName_span">
                    {{ item.fileSize }}
                  </div>
                </a>
              </div>
              <div style="width:50%" class="main-recommend-li-detail ">
                <div class="main-recommend-li-detail-play">
                  <el-icon>
                    <VideoPlay />
                  </el-icon>
                  <span>
                    {{ item.fileSize }}
                  </span>

                </div>
                <div class="main-recommend-li-detail-play">
                  <el-icon>
                    <Clock />
                  </el-icon>
                  {{ item.fileType }}
                </div>
              </div>
            </div>
          </div>

        </li>
      </ul>
      <!-- <div class="loadmore" v-show="isLoading" ref="loadmore">正在加载···</div> -->
    </section>
  </main>


  <!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
  </video-player> -->
  <div style="display: flex;justify-content: center;align-items: center">
    <el-upload ref="uploadRef" :on-change="changeFile" :auto-upload="false">
      <!-- <template #trigger>
          <el-button style="display: inline-flex;border: 0cap;" type="primary">select file</el-button>
        </template>
<div>
  <el-button type="success" style="display: inline-flex;border: 0cap;" @click="submitUpload"> upload to server
  </el-button>
</div> -->
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
      <!-- <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template> -->
    </el-upload>
  </div>


  <el-pagination style="text-align: center;display: flex;justify-content: center;margin-top: 10px"
    :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10, 20, 40]" :small="small" :disabled="disabled"
    :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />

</template>

<style scoped lang="css">
.border-container {
  padding: 5px;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all .3s ease;
}

.border-container:hover {
  border: 1px solid var(--ava);
}

.load-more {
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: tb;
  width: 38px;
  padding: 12px 5px 12px 5px;
  cursor: pointer;
  user-select: none;
  border-radius: 10px;
  border: 1px solid var(--line_regular);
  position: fixed;
  right: 30px;
  top: 40%;
  background-color: rgba(255, 255, 255, 0.6);
  transition: all .3s ease;
  letter-spacing: 2px;
}

.load-more:hover {
  background-color: rgb(225, 225, 225, 0.6);
}

.btn-hold {
  transform: scale(0.9);
}

.main-view ul {
  margin-top: 4.5%;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
}

.main-view li {
  aspect-ratio: 16/11;
  width: 20%;
  padding: 5px;
  box-sizing: border-box;
}

.main-view li img {
  object-fit: cover;
  aspect-ratio: 16/9;
  width: 100%;
  cursor: pointer;
}

.img-container {
  border-radius: 6px;
  overflow: hidden;
}

.main-view {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.main-view section {
  padding-top: 20px;
  width: 80%;
}


.main-recommend-li-title {
  height: 8vh;
  overflow: hidden;
  /* 对英文有效，在溢出处换行 */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 18px;
  text-align: left;
  transition: color .3s ease;
  cursor: pointer;
  color: #000;
}

.main-recommend-li-detail {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 53%;
  justify-content: flex-start;
  align-items: flex-start;
  color: rgb(129, 129, 129);
  transition: color .3s ease;
  cursor: pointer;
  text-align: left;
}

.upName_span {
  text-align: left;
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

.main-recommend-li-detail svg {
  fill: rgb(129, 129, 129);
  transition: fill .3s ease;
}

.main-recommend-li-detail-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
}

.main-recommend-li-detail-container span {
  margin-left: 5px;
}

.main-recommend-li-detail-play {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  padding-right: 5px;
  white-space: nowrap;
}

.main-recommend-li-detail:hover {
  color: var(--ava);
}

.main-recommend-li-detail:hover svg {
  fill: var(--ava);
}

.main-recommend-li-title:hover {
  color: var(--ava);
}

.loadmore {
  font-size: 25px;
  padding: 5px 0px 20px 0px;
}

.aside {
  position: fixed;
  right: 50px;
  bottom: 50px;
}

.backtopShow-enter-active,
.backtopShow-leave-active {
  transition: all .3s ease;
}

.backtopShow-enter-from,
.backtopShow-leave-to {
  opacity: 0.0 !important;
}

.backtopShow-enter-to,
.backtopShow-leave-from {
  opacity: 1.0 !important;
}

@media screen and (max-width:550px) {
  .main-view section {
    width: 100%;
  }

  .main-view li {
    width: 50%;
    padding: 10px;
  }

  .aside {
    bottom: 65px;
    right: 30px;
  }

  .main-recommend-li-detail {
    font-size: 14px;
  }

  .main-recommend-li-detail span {
    font-size: 10px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 10px;
    width: 10px;
  }

  .load-more {
    display: none;
  }

  .options-li {
    margin: 0 !important;
  }
}

@media screen and (550px<width<=800px) {
  .main-recommend-li-detail {
    font-size: 14px;
  }

  .main-recommend-li-detail span {
    font-size: 10px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 10px;
    width: 10px;
  }

  .main-view li {
    width: 33%;
  }
}

@media screen and (800px<width<=1100px) {
  .main-recommend-li-detail {
    font-size: 14px;
  }

  .main-recommend-li-detail span {
    font-size: 10px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 10px;
    width: 10px;
  }

  .main-view li {
    width: 25%;
  }
}

@media screen and (1100px<width<=1500px) {
  .main-recommend-li-detail {
    font-size: 16px;
  }

  .main-recommend-li-detail span {
    font-size: 12px;
    margin-left: 5px;
  }

  .main-recommend-li-detail svg {
    height: 12px;
    width: 12px;
  }
}
</style>