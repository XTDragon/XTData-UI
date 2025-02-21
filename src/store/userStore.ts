import request from '@/utils/axios/request';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 定义用户信息类型
interface UserInfo {
  id: number;
  username: string;
  roles: string[]; // 用户角色
  satoken: string;
  router: [];

}

export const UserStore = defineStore('user', {


    state: () => {

        return {
            user: null as UserInfo | null,
        }
    },
    actions: {
        async getRouter(){
            request.get('/api/user/user-menus').then(res =>{
                if(res.data.code===200){
                    console.log(res)
                }
            })
        }
    },
});