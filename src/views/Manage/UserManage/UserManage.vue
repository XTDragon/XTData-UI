<script lang="ts" setup>

import axios from "axios";

interface User {
  id: string;
  username: string;
  password: string;
  data: string;
}

const  tableData : User[] = reactive([]);
const getData = () => {
  axios.get("/api/user/UserList").then(response => {
    // console.log(response.data.data);
    var data = response.data.data;
    for (let dataKey in data) {
      tableData.push(data[dataKey]);
    }
    console.log(tableData)
  })
}
getData();
const handleClick = () => {
  console.log('click')
}


</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="id" width="150"/>
    <el-table-column prop="username" label="username" width="120"/>
    <el-table-column prop="password" label="password" width="120"/>
    <el-table-column prop="data" label="data" width="120"/>
<!--    <el-table-column prop="address" label="Address" width="600"/>-->
<!--    <el-table-column prop="zip" label="Zip" width="120"/>-->
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<style scoped>

</style>