<script setup lang="ts">

import DPlayer from 'dplayer';
const dplayer = ref()
let dp: any;
const initPlayer = () => {
    dp = new DPlayer({
        container: dplayer.value,
        autoplay: false,
        theme: '#b7daff',
        loop: false,
        lang: navigator.language.toLowerCase(),
        screenshot: false,
        hotkey: true,
        preload: 'auto',
        volume: 0.7,
        mutex: true,
        video: {
            url: 'http://localhost:3000/api/video/get/2',
            type: 'auto',
        },
        subtitle: {
            url: 'dplayer.vtt',
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#b7daff',
        },
        danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://api.prprpr.me/dplayer/',
            token: 'tokendemo',
            maximum: '1000',
            addition: ['https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142'],
            user: 'DIYgod',
            bottom: '15%',
            unlimited: true,
        },
        contextmenu: [
            {
                text: 'custom1',
                link: 'https://github.com/DIYgod/DPlayer',
            },
            {
                text: 'custom2',
            },
        ],
        highlight: [
            {
                time: 20,
                text: '这是第 20 秒',
            },
            {
                time: 120,
                text: '这是 2 分钟',
            },
        ],
    });
}
onMounted(() => {
    initPlayer();
});
onBeforeUnmount(() => {
    dp.destroy();//关闭弹窗后销毁播放器
});
</script>

<template>
    <div class="dplayer" ref="dplayer"></div>
</template>

<style scoped>
.dplayer {
}
</style>