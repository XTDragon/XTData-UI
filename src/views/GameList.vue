<template>
  <div>
    <Header>

    </Header>
    <div style="background: aquamarine;">

        <el-row>
<!--            <el-col :span="18">-->
<!--                <el-input v-model="input" placeholder="Please input" clearable style="width: 80% ; margin-left: 15%;margin-right: 10%;"/>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--                <el-button @click="Search()">搜索</el-button>-->
<!--            </el-col>-->
        </el-row>
        <el-row style="margin-top: 5.5%">
            <dev style="margin: auto;">
                <el-table :data="tableData"
                          style="background: aqua;">
                    <el-table-column prop="gameName" label="游戏" width="280"/>
                    <el-table-column prop="gameSize" label="大小" width="120"/>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button link type="primary" size="small" @click="handleClick(scope.row)">开始</el-button>
                            <el-button link type="primary" size="small">Edit</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </dev>

        </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {router} from "../router";
import Header from "../components/common/header.vue";

const input = ref('')

interface TableItem {
    gameId: number;
    gameName: string;
    gameSize: string;
    gameFile: Blob;
}

const tableData = ref<TableItem[]>([]);

const getData = () => {
    axios.get("/api/GameList").then(response => {
        console.log(response.data.data);
        var data = response.data.data;
        tableData.value = data;
    })
}

const Search = () => {
    axios.get("/api/Search/", {
        params: {
            input: input.value,
        }
    }).then(response => {
        console.log(response.data.data);
        var data = response.data.data;
        tableData.value = data;
    })
}
getData();

const handleClick = (scope: TableItem) => {
    console.log(scope)
    router.push({
        path: 'Game',
        query: {
            gameId: scope.gameId,
        }
    })
}
</script>

<style scoped>

</style>