<template>
  <div style="background: #535bf2">
    <div id="echartsGlobe" ref="myChart" :style="{ width: '1000px', height: '800px' }">

    </div>
    <canvas>

    </canvas>

  </div>
</template>

<script lang="ts">
import {ref} from "vue";
import * as echarts from "echarts";

export default {
  name: "Home",
  setup() {
    const myChart = ref<any>();
    setTimeout(() => {
      // 绘制图表
      echarts.init(myChart.value).setOption(
          {
            globe: {
              show: true,
              backgroundColor: "#000",
              globeRadius: 100,
              // 配置为纯黑色的背景
              environment: 'auto',
              width: 100,
              height: 100,
            }
          }
      );
    }, 1000);
    console.log(myChart)
    return {
      myChart,
    };
  },
};
</script>