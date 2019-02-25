<template>
  <div class='bg'>
    <van-notice-bar
      text="热烈庆祝中华人民共和国70华诞！！！！"
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
              <van-button type="default" size="large" class='btn' @click='loginUser'>登录</van-button>
              <router-link to="/register">
                  <van-button class="btn-default" type="default" size="large">注册</van-button>
              </router-link>
          </div>
    </div>
    <foot v-show="hidshow"></foot>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import http from '../api/api.js';
import { Toast } from 'vant';
import foot from '@/components/foot';
import {mapMutations} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      headSrc:require('@/assets/h1.jpg'),
      msg: '用户登录',
      username:'',
      password:'',
      hidshow:true,
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight:  document.documentElement.clientHeight,  //实时屏幕高度
      isResize:false //默认屏幕高度是否已获取
    }
  },
  mounted() {
    window.onresize = () =>{
      return(
        ()=>{
          if(!this.isResize){
            //默认屏幕高度                               
            this.docmHeight=document.documentElement.clientHeight                                
            this.isResize = true
          }
           this.showHeight = document.body.clientHeight 
        }
      )()
    }
  },
  watch:{
    showHeight:'changeHeight'
  },
  methods: {
    // ...mapMutations(['LOGIN']),
    changeHeight() {        
        if(this.docmHeight > this.showHeight){         
             this.hidshow=false       
        }else{            
          this.hidshow=true       
         }    
    },

    loginUser(){
      let params = {'user_name':this.username,'password':this.password}
      if(params.user_name && params.password){
            http.loginUser(params).then((res)=>{
            console.log(res)
            if(res.data.status === 200){
                this.$store.dispatch('login',{
                    token:res.data.token,
                    user:res.data.user,
                    vip:res.data.vip
                })
                sessionStorage.setItem('vip', res.data.vip)
                sessionStorage.setItem('token', res.data.token) //存储token
                sessionStorage.setItem('user', res.data.user) //存储用户
                Toast.success('登录成功');
                this.username='';
                this.password='';
                this.$router.push('/mainmodel')
                
            }else{
                Toast('账号或密码错误');
            }
          })
      }else{
        Toast('账号或密码不能为空');
      }
    }
  },
  components:{
    foot
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$background:#fff;
.bg{
  position:relative;
  width:100%;
  height:100%;
  background:$background;
  text-align:center;
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
