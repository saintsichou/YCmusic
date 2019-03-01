<template>
  <div>
    <h2 class='van-nav-bar__title'>社会最新热点</h2>
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
        <div class='vscard' v-for='(list,index) in newslist' :key='index' v-if='list.havePic==true' @click='jumpPlaylist(list.link)'>
            <van-card 
              :desc="list.desc"  
              :title="list.title"
            >
                <div slot="tags">
                  <van-tag style='background:#fff' class='van-tag van-tag--plain van-hairline--surround' v-for='(tag,index) in list.feedback_tag' :key='index'>{{tag.name}}</van-tag>
                </div>
                <div slot="thumb" v-for='(img,index) in list.imageurls.slice(0,1)' :key='index'>
                    <img :src='img.url' id='imgbox'/>
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
  name: 'news',
  data () {
    return {
      msg: 'news',
      imgs: require('@/assets/h1.jpg'),
      user:'',
      items:[],
      playlist:[],
      isLoading: false,
      count:5,
      loading: false,
      finished: false,
      list:[],
      newslist:[]
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
    // let ps ={
    //     // "showapi_timestamp": this.formatterDateTime(),
    //     "showapi_appid": '88145', //这里需要改成自己的appid
    //     "showapi_sign": '4733623d0bda47a3972810731356fb80',  //这里需要改成自己的应用的密钥secret
    //     "channelId":"5572a10bb3cdc86cf39001f8",
    //     "page":this.count,
    //     "maxResult":"20"
    // }
    // api.getNews(ps).then(res => {
    //   console.log(res.data.showapi_res_body.pagebean.contentlist)
    // })
  },
  methods: {
    formatterDateTime() {
            var date=new Date()
            var month=date.getMonth() + 1
                    var datetime = date.getFullYear()
                            + ""// "年"
                            + (month >= 10 ? month : "0"+ month)
                            + ""// "月"
                            + (date.getDate() < 10 ? "0" + date.getDate() : date
                                    .getDate())
                            + ""
                            + (date.getHours() < 10 ? "0" + date.getHours() : date
                                    .getHours())
                            + ""
                            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                                    .getMinutes())
                            + ""
                            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                                    .getSeconds());
                    return datetime;
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
          let ps ={
                // "showapi_timestamp": this.formatterDateTime(),
                "showapi_appid": '88145', //这里需要改成自己的appid
                "showapi_sign": '4733623d0bda47a3972810731356fb80',  //这里需要改成自己的应用的密钥secret
                "channelId":"5572a10bb3cdc86cf39001f8",
                "page":this.count++,
                "maxResult":"20"
            }
            api.getNews(ps).then(res => {
                this.newslist =  this.newslist.concat(res.data.showapi_res_body.pagebean.contentlist)
                if (this.newslist.length >= res.data.showapi_res_body.pagebean.allNum) {
                    this.finished = true;
                }
            })
        this.loading = false;
      }, 500);
    },
    jumpBanner(id){
      // this.$router.push({ path: '/musiclist', query: { songID: id }});
    },
    jumpPlaylist(link){
      console.log(link)
    //   this.$router.push(link);
       window.location.href= link
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count = this.count;
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
  .vcard{
    width:100%;
    overflow:hidden;
    margin:5px 0;
    text-align:left;
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
  #imgbox{
      width:80px;
      height:80px;
  }
</style>
                        