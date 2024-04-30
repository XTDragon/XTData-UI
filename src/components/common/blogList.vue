<script lang="ts">
import {router} from "../../router";

export default {
  props: ['data'],
  setup(props: [{}]) {

    const toBlogContent = (id: any) => {
      router.push("/blog/" + id)
    }

    return {
      toBlogContent
    }
  },
};
</script>

<template>
  <div style="font-size: 14px;padding: 10px 10px;">

    <div style="display: flex;margin: 0; background-color: #FFFFFF;border-radius: 20px;">

      <div style="height: 170px;display: flex;margin: 0px 20px;border-bottom: 0px solid;">

        <div style="margin: 20px 0;width: 200px;">

          <el-image :src="data.imgFile"
                    style="height: 130px;width: 200px;object-fit: cover;cursor: pointer;"></el-image>

        </div>
        <div style="margin: 20px 20px;">
          <div style="font-size: 18px;cursor: pointer;" @click=toBlogContent(data.id)>
            {{ data.title }}
          </div>
          <div style="display: flex;line-height: 40px;">
            <span class="icon-active">
<!--              <i class="el-icon-alarm-clock el-icon&#45;&#45;right"></i>-->
              {{ data.createTime }}
            </span>
            <span class="icon-active" icon="el-icon-link" style="margin-left: 10px;">
<!--              <i class="el-icon-view el-icon&#45;&#45;right"></i>-->
              浏览量:{{ data.lookTimes }}
            </span>
            <span class="icon-active" icon="el-icon-link" style="margin-left: 10px;">
<!--              <i class="el-icon-chat-round el-icon&#45;&#45;right"></i>-->
              评论:{{ data.comments }}
            </span>
          </div>
          <div class="summary">
            {{ data.summary }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.summary {

  overflow-x: hidden;
  overflow-y: hidden;
//white-space: nowrap; word-break: break-all; display: -webkit-box;
  height: 45%;
  text-overflow: ellipsis;
  line-height: 20px;
  font-family: Play, MArima Madurai, Microsoft JhengHei, Georgia, Times, serif, Microsoft Yahei, Open Sans, sans-serif;
}
</style>