<template>
  <div class='container'>
    <div class='form'>
          <div>
              <img :src="headSrc" class='hdsrc'>
          </div>
          <div class='title'>昵称:{{msg}}</div>
          <div class='list'>
             <van-cell-group>
              <van-cell icon="fire" title="看天气"  is-link  to='/gmap' />
              <van-cell icon="like" title="看新闻" is-link  to='/news'/>
              <van-cell icon="setting" title="修改密码" is-link  @click = 'fixpwd'/>
            </van-cell-group>
          </div>
    </div>
    <van-dialog
      v-model="show2"
      show-cancel-button
      @confirm = 'confirm'
    >
      <van-field
        v-model="oldpwd"
        label="旧密码"
        placeholder="请输入旧密码"
      />
      <van-field
        v-model="newpwd"
        type="password"
        label="新密码"
        placeholder="请输入新密码"
      />
    </van-dialog>
  </div>
  
</template>

<script>
import vheader from '@/components/vheader';
import tab from '@/components/tab';
import api from '../api/api.js';
import {mapGetters,mapMutations,mapState} from 'vuex';
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
import {time,converTime} from '../util/index.js'
export default {
  name: 'personal',
  data () {
    return {
      headSrc:require('@/assets/h6.jpg'),
      msg: sessionStorage.getItem('user'),
      show: false,
      show2: false,
      oldpwd: '',
      newpwd: ''
    }
  },
  computed: {

  },
  mounted() {
    
  },
  methods: {
    opens(){
      this.show = true
    },
    fixpwd(){
      this.show2 = true
    },
    confirm(){
      if(this.newpwd && this.oldpwd){
        let ps = {
          'id':sessionStorage.getItem('id'),
          'newpwd':this.newpwd,
          'oldpwd':this.oldpwd
        }
        api.fixpwd(ps).then((res)=>{
          console.log(res)
          if(res.data.code=== 1){
             Toast(res.data.msg+'请重新登录')
             setTimeout(()=>{
               this.$router.push('/')
             },3000)
          }else{
            if(res.data.code === 999){
               Toast(res.data.msg+'，请重试！！！')
               return
            }else{
               Toast('网络错误，请稍后再试试')
            }
           
          }
        })
      }else{
        Toast('不能有空项')
      }
      
    }
  },
  components:{
    vheader,
    tab
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .container{
    background: #f8f8f8
  }
  .form{
  width:100%;
  overflow:hidden;
  position:absolute;
  top:80px;
    .hdsrc{
      width:64px;
      height:64px;
      border-radius:50%;
    }
    .title{
      margin-top:20px;
      font-size:20px;
      color:#eb6818;
    }
    .list{
      width:100%;
      overflow:hidden;
      // display:flex;
      // flex-direction:column;
      margin-top:20px;
     
    }
  }
</style>
