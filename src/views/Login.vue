<template>
  <div>
    <div style="width: 400px; margin: 200px auto;">
      <h1 style="text-align: center; margin-bottom: 30px">登 录</h1>
      <el-form :model="user" :rules="rules" ref="ruleFormRef" size="large">
        <el-form-item prop="username">
          <el-input v-model="user.username" :prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" :prefix-icon="Lock" show-password/>
        </el-form-item>
        <el-form-item>
          <el-col>
            <el-button type="primary" style="width: 50%" @click="login">登 录</el-button>
          </el-col>
          <el-col>
            <el-button type="primary" style="width: 50%" @click="get">Get</el-button>
          </el-col>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {Lock, User} from '@element-plus/icons-vue'
import {ElNotification} from "element-plus";
// import request from "../utils/axios/request";
import request from "/src/utils/axios/request"
import {router} from "/src/router/index";

const {proxy} = getCurrentInstance()

const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ],
})

const user = reactive({
  name: '张三',
  passwird: 123
})
const changeUser = (name) => {
  user.name = name   // 通过这种方式来赋值
}

const login = () => {
  proxy.$refs.ruleFormRef.validate((valid) => {
    if (valid) {
      request.post('/api/user/login').then(res => {
        console.log(res)
        if (res.code === 200) {// 请求成功
          router.push("/2")
          ElNotification({
            type: 'success',
            message: '用户名或密码错误'
          })
        } else {  // 请求失败
          ElNotification({
            type: 'error',
            message: res.msg
          })
        }
      })
    } else {
      ElNotification({
        type: 'error',
        message: '用户名或密码错误'
      })
    }
  })
}

const get = () => {
  request.get('/api/user/get').then(res => {
    console.log(res)
  })
}
</script>