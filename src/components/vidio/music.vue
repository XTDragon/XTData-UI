<script setup lang="ts">
const audioRef = ref<HTMLAudioElement>()

// 播放
function handlePlay() {
  audioRef.value!.src = `http://baicizhan.qiniucdn.com/word_audios/${word?.value?.word}.mp3`
  // 播放 暂停也同理
  audioRef.value?.play()
}
</script>

<template>
  <audio ref="audioRef"></audio>
</template>

<style scoped>

</style>