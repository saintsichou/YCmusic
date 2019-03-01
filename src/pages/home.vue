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
    loading-text='马上好...'
    loosing-text='猿正在拉取中...' 
    @refresh="onRefresh">
    <div class='vcard'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class='vscard' v-for='(list,index) in playlist' :key='index' @click='jumpPlaylist(list.id)'>
            <van-card
              :desc="list.description"  
              :title="list.name"
              :thumb="list.coverImgUrl  || imgs "
              :tag="list.tags[0]"
            >
                <div slot="tags">
                  <van-tag style='background:#fff' class='van-tag van-tag--plain van-hairline--surround' v-for='(tag,index) in list.tags' :key='index'>{{tag}}</van-tag>
                </div>
                <div slot="footer">
                </div>
            </van-card>
        </div>
      </van-list>
      
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
      imgs: require('@/assets/h1.jpg'),
      user:'',
      items:[],
      playlist:[],
      isLoading: false,
      count:5,
      loading: false,
      finished: false,
      list:[]
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
    // api.playList(5).then(res => {
    //   this.playlist = res.data.playlists
    // })
  },
  methods: {
     onLoad() {
      // 异步更新数据
      setTimeout(() => {
        api.playList(this.count++).then(res => {
          // this.playlist = res.data.playlists
          this.playlist = this.playlist.slice(this.count).concat(res.data.playlists)
          if (this.playlist.length >= res.data.total) {
            this.finished = true;
          }
        })
        this.loading = false;  
      }, 500);
    },
    jumpBanner(id){
      // this.$router.push({ path: '/musiclist', query: { songID: id }});
    },
    jumpPlaylist(id){

      this.$router.push({ path: '/musiclist', query: { songID: id }});
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count = this.count;
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
    .van-card__thumb img{
      
        border-radius:5px;
      
    }
  }
  
</style>
