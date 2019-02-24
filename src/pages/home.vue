<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for='(item,index) in items' :key='item.id' >
         <img :src="item.imageUrl " class='banner' @click='jumpBanner(item.encodeId)'/>
      </van-swipe-item>
    </van-swipe>
    <h2 class='van-nav-bar__title'>推荐歌单</h2>
    <van-pull-refresh 
    v-model="isLoading" 
    loading-text='擦屁股中...'
    loosing-text='李乾睿正在拉屎中...' 
    @refresh="onRefresh">
    <div class='vcard'>
      <div class='vscard' v-for='(list,index) in playlist' :key='list.id' @click='jumpPlaylist(list.id)'>
          <van-card
            :desc="list.description"  
            :title="list.name"
            :thumb="list.coverImgUrl "
            :tag="list.tags[0]"
          >
            <div slot="tags">
              <van-tag style='background:#fff' class='van-tag van-tag--plain van-hairline--surround' v-for='(tag,index) in list.tags' :key='index'>{{tag}}</van-tag>
            </div>
            <div slot="footer">
            </div>
          </van-card>
        </div>
    </div>
    </van-pull-refresh>
  </div>
</template>

<script>

import api from '../api/api.js';
import {mapGetters,mapMutations,mapState} from 'vuex';
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';
export default {
  name: 'home',
  data () {
    return {
      msg: 'home',
      user:'',
      items:[],
      playlist:[],
      isLoading: false,
      count:5
    }
  },
  computed: {
          
  },
  mounted() {
    api.home().then(res => {
      // 解析成功
      if(res.data.code ===1){
         this.user = sessionStorage.getItem('user')
      }else{
        this.$router.push('/')
      }
    }).catch(err => {
      console.log(`错误 - ${err}`)
    })
    api.banner().then(res => {
      // 解析成功
      this.items= res.data.banners;
      // console.log(this.items)
    }).catch(err => {
      console.log(`错误 - ${err}`)
    })
    api.playList(this.count).then(res => {
      this.playlist = res.data.playlists
    })
  },
  methods: {
    jumpBanner(id){
      // this.$router.push({ path: '/musiclist', query: { songID: id }});
    },
    jumpPlaylist(id){
      console.log(id)
      this.$router.push({ path: '/musiclist', query: { songID: id }});
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count = this.count+5;
        api.playList(this.count).then(res => {
          this.playlist = res.data.playlists
        })
      }, 500);
    }
  },
  ...mapMutations({
    count:'ADD_COUNT'
  }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  .banner{
    width:100%;
  }
  .van-tag{
    color: rgb(255, 68, 68);
  }
  .van-nav-bar__title{
    padding:20px 0;
  }
  .vcard{
    width:100%;
    overflow:hidden;
    padding-bottom:60px;
  }
  .vscard{
    width:100%;
    overflow:hidden;
    margin:5px 0;
  }
  .van-card{
    .van-card__content{
      div {
        margin:6px 0;
      }
    }
  }
  
</style>
