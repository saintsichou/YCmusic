<template>
  <div class='bg'>
    <van-notice-bar
      text="热烈庆祝李乾睿同志的作业完成一半，请再接再厉！！！"
      left-icon="volume-o"
      background='#276dfd'
      color='#fff'
    />
    <div class='form'>
          <div>
              <img :src="headSrc" class='hdsrc'>
          </div>
          <div class='title'>{{msg}}</div>
          <div>
              <van-cell-group>
                <van-field
                  v-model="username"
                  required
                  clearable
                  label="用户名"
                  icon="question-o"
                  placeholder="请输入用户名"
                  error-message=''
                  @click-icon="$toast('用户名不能使用特殊符号！')"
                />
                <van-field
                  v-model="password"
                  label="密码"
                  placeholder="请输入密码"
                  required
                  clearable
                   type="password"
                />
              </van-cell-group>
              <van-button type="default" size="large" class='btn' @click='resister'>注册</van-button>
               <router-link to="/">
                  <van-button class="btn-default" type="default" size="large">登录</van-button>
              </router-link>
          </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import store from '../store/store.js';
import {mapState} from 'vuex';
import {mapMutations} from 'vuex';
import http from '../api/api.js';
import { Toast } from 'vant';
import foot from '@/components/foot'
export default {
  name: 'register',
  data () {
    return {
        msg: '用户注册',
        headSrc:require('@/assets/h6.jpg'),
        username:'',
        password:''
        }
    },
    methods: {
      resister(){
        let params = {'user_name':this.username,'password':this.password}
         if(params.user_name && params.password){
              http.registerUser(params).then((res)=>{
              console.log(res)
              if(res.data.code === 1){
                 Toast.success('注册成功');
                 this.username='';
                 this.password='';
              }else{
                  if(res.data.code == 0){
                    Toast('账号已存在');
                  }else{
                    Toast('账号或密码错误');
                  }
              }
            })
        }else{
          Toast('账号或密码不能为空');
        }
      }
    },
    components:{
      foot
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$background:#fff;
.bg{
  position:relative;
  width:100%;
  height:100%;
  background:$background
}
.form{
  width:100%;
  overflow:hidden;
  position:absolute;
  top:120px;
  .hdsrc{
    width:64px;
    height:64px;
    border-radius:50%;
  }
  .title{
    font-size:20px;
    margin:10px 0;

  }
  .btn{
     background:#276dfd;
     color:#fff;
     margin: 10px 0;
  }
  .btn-default{
    color:#3182D9;
    background:#EAF2FB
  }
}

</style>
