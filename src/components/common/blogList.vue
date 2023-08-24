<script lang="ts">
import {router} from "../../router";

export default {
  props: ['data'],
  setup(){
    const toBlogContent = (id: any) => {
      console.log("blog"+id)
      router.push("/blog/"+id)
    }

    return{
      toBlogContent
    }

  },

};
</script>

<template>
  <div style="width: 100%;background-color: #eee;font-size: 14px;padding: 20px 0;" >
    <div style="display: flex;width: 70%;margin: 0 auto;background-color: #FFFFFF;border-radius: 20px;">

      <div style="height: 170px;display: flex;margin: 10px 20px;border-bottom: 0px solid #cccccc;" class="item">
        <div style="margin: 20px 0;width: 200px;">
          <el-image :src="data.imgUrl"
                    style="height: 130px;width: 200px;object-fit: cover;cursor: pointer;"></el-image>
        </div>
        <div style="margin: 30px 20px;">
          <div style="font-size: 18px;color: #000000;cursor: pointer;"   @click=toBlogContent(data.id) >{{ data.title }}</div>
          <div style="display: flex;color: #cccccc;line-height: 40px;">
            <span class="icon-active"><i class="el-icon-alarm-clock el-icon--right"></i>{{ data.createTime }}</span>
            <span class="icon-active" icon="el-icon-link" style="margin-left: 10px;"><i
                class="el-icon-view el-icon--right"></i>{{ data.lookTimes }}</span>
            <span class="icon-active" icon="el-icon-link" style="margin-left: 10px;"><i
                class="el-icon-chat-round el-icon--right"></i>47次吐槽</span>
          </div>
          <div style="overflow: hidden;text-overflow: ellipsis;line-height: 20px;color: gray;">
            一个小时前我还觉得写月底小结是很困难的事情，现在写六月月底小结却觉得很轻松了。原本以为整个人在整个月都沉迷在工作中，细细回想起来，我是经历了很多的事情。六月...
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>