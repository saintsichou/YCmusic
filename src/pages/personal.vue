<template>
  <div class='container'>
    <div class='form'>
          <div>
              <img :src="headSrc" class='hdsrc'>
          </div>
          <div class='title'>昵称:{{msg}}</div>
          <div class='list'>
             <van-cell-group>
              <van-cell icon="fire" title="天气" is-link />
              <van-cell icon="like" title="我的信息" is-link />
              <van-cell icon="setting" title="修改密码" is-link />
            </van-cell-group>
          </div>
         
    </div>
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
    }
  },
  computed: {

  },
  mounted() {
    
  },
  methods: {
    
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
