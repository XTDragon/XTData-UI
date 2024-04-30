<script setup lang="ts">

import axios from "axios";
import request from "@/utils/axios/request";
import {ElNotification} from "element-plus";

interface BlogData {
  id: number;
  title: string;
  imgUrl: string;
  imgFile: string;
  createTime: string;
  lookTimes: string;
  comments: string;
  content: string;
  lastModifiedTime: string;
  enable: boolean;
}

const currentPage = ref(1)
const pageSize = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref()


const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getblogList();
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getblogList();
}


let data = reactive({
  tableData: [] as BlogData[]
});
const getblogList = () => {
  axios.get("/api/getPageBlogList", {
    params: {
      pageSize: pageSize.value,
      currentPage: currentPage.value,
    }
  }).then(response => {
    console.log(response.data.data)
    // var data : Blog = response.data.data.list;
    total.value = response.data.data.total;
    data.tableData = response.data.data.list;
    // for (let key in data) {
    //   tableData.push(data[key]);
    // }
  })
};
getblogList();

const handleClickCommit = (row: any) => {
  request.post('/api/updateBlog', row
  ).then((res: any) => {
    ElNotification({
      type: 'success',
      message: '修改成功！'
    })
  });
}
const handleClickDelete = (row: any) => {
  request.delete('/api/deleteBlog', row
  ).then((res: any) => {
    ElNotification({
      type: 'success',
      message: '修改成功！'
    })
  });
}
const changeEnable = (blog: BlogData) => {
  blog.enable = !blog.enable;
}


</script>

<template>
  <div style="width: 100%;height: 100%;">
    <el-table :data="data.tableData"
              :header-cell-style="{'text-align': 'center'}"
    >
      <!--    <el-table-column prop="id" label="id" width="60"/>-->
      <el-table-column prop="imgFile" align="center" label="图片" width="120">
        <template #default="scope">
          <el-image :src="scope.row.imgFile"></el-image>
        </template>
      </el-table-column>
      <!--    <el-table-column fixed prop="date" label="Date" width="150" />-->
      <el-table-column prop="title" label="标题" align="center" width="140"/>
      <el-table-column :show-overflow-tooltip="true" style="white-space: pre-wrap" prop="imgUrl" label="图片链接"
                       align="center" width="260"/>
      <el-table-column prop="createTime" label="创建时间" align="center" width="140">
        <template #default="scope">
          <el-date-picker
              style="width: 90%"
              v-model=scope.row.createTime
              type="date"
              placeholder="Pick a day"
              size="small"
              value-format="YYYY年MM月DD日"
          />
        </template>
      </el-table-column>
      <el-table-column prop="lastModifiedTime" label="最后修改时间" align="center" width="140">

        <template #default="scope">
          <el-date-picker
              style="width: 90%"
              v-model=scope.row.lastModifiedTime
              type="date"
              placeholder="Pick a day"
              size="small"
              value-format="YYYY年MM月DD日"
          />
        </template>
      </el-table-column>
      <el-table-column prop="lookTimes" label="浏览量" width="80" align="center"/>
      <el-table-column prop="comments" label="评论数" width="80" align="center"/>
      <!--    <el-table-column prop="content" label="content" width="120" />-->
      <el-table-column prop="enable" label="是否展示" align="center" width="80">
        <template #default="scope">
          <div @click="changeEnable(scope.row)">
            <el-tag type="success" v-if="scope.row.enable">{{ scope.row.enable }}</el-tag>
            <el-tag type="danger" v-else-if = "!scope.row.enable">{{ scope.row.enable }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleClickCommit(scope.row)">提交</el-button>
          <el-button link type="primary" size="small" @click="handleClickDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        style="text-align: center;display: flex;justify-content: center;margin-top: 10px"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.center {
  text-align: center;
}

</style>