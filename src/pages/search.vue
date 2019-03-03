<template>
<transition name="van-fade">
  <div class='container'>
    <div class='mainContent'>
        <van-search
        v-model="songName"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class='hotSearch' v-show='!songName'>
            <p class="title">热门搜索:</p>
            <van-button round class='van-tag' v-for='(item,index) in hotlist' :key='index' type="danger" @click='hotSong(item.first)'>{{item.first}}</van-button>
        </div>
        <!--<div class='result' v-show='!songName'>
            <ul
                v-for="item in list"
                :key="item.id"
            >
                <li  @click='jumpSong(item.id,item.name,item.artists[0].name)'>
                    <span class='songT'>
                        {{item.name}}--{{item.artists[0].name}}
                    </span>
                    <span class='songLogo'><van-icon name="play" size='.8rem'/></span>
                </li>
            </ul>
        </div>-->
        <div class='suggestSong' v-show='songName && list2.length>0'>
              <ul
                v-for="item in list2"
                :key="item.id"
            >
                <li  @click='jumpSong(item.id,item.name,item.artists[0].name)'>
                    <span class='songT'>
                        {{item.name}}--{{item.artists[0].name}}
                    </span>
                    <span class='songLogo'><van-icon name="play" size='.8rem'/></span>
                </li>
            </ul>
        </div>
    </div>
  </div>
</transition>
</template>

<script>
import vheader from '@/components/vheader';
import tab from '@/components/tab';
import api from '../api/api.js';
import {mapGetters,mapMutations,mapState} from 'vuex';
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
import { debounce } from '../util/index.js';
export default {
  name: 'search',
  data () {
    return {
      songName:'',
      list: [],
      list2: [],
      hotlist:[],
      loading: false,
      finished: false
    }
  },
  computed: {

  },
  created() {
    //热门搜索
    api.searchhot().then(res => {
        this.hotlist = res.data.result.hots
    }),
    this.$watch('songName',debounce((newVal)=>{
      this.suggest(newVal)
    },300))
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem('searchOne')) || ''
    //  this.$router.push({ path: '/music', query: { songID: id }});
    
  },
  methods: {
    onSearch(){
        let keywords = this.songName;
        api.searchList(keywords,10,1).then((res) => {
                let data = res.data.result.songs
                let dataLength = res.data.result.songCount
                this.list = data;
                localStorage.setItem('searchOne',JSON.stringify(this.list))
        })
    },
    jumpSong(id,name,art){
          // this.$router.push({ path: '/music', query: { songID: id,songName: encodeURIComponent(name),artists:encodeURIComponent(art)}});
        //  console.log(id)songPlay
        this.$store.dispatch('songurl',{
              'id':id,
              'title':name,
              'singer':art
        })
     },
     hotSong(name){
         console.log(123)
         this.songName = name;
         this.onSearch()
     },
     suggest(newVal){
        if(newVal){
          api.searchSuggest(newVal).then((res)=>{
              let data = res.data.result.songs
              let dataLength = res.data.result.songCount
              this.list2 = data;
        })
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
     
  }
  .mainContent{
      width:100%;
      overflow:hidden
  }
  .hotSearch{
      width:100%;
      overflow:hidden;
      .title {
            font-size: 12px;
            line-height: 12px;
            color: #323233;
            padding:10px;
            text-align:left;
            border-bottom:1px solid #F2F3F4;
        }
      .van-tag{
          padding:10px;
          display:block;
          float:left;
          margin:10px;
      }
  }
  .result{
      width:100%;
      overflow:hidden;
      background: url('../../static/imgs/bg.jpg') center center no-repeat;
      background-size:cover;
      // padding-bottom:60px;
      ul{
          width:100%;
          overflow:hidden;
          li{  
            //   background:red;
            //   opacity:0.5;
              line-height:50px;
              color:#fff;
              font-size:12px;
              text-align:left;
              box-sizing:border-box;
              padding:10px;
              border-top: 1px solid #ccc;
              display:flex;
             .songT{
                 flex:6;
                 overflow:hidden;
                 white-space: nowrap;
                 text-overflow : ellipsis
             }
             .songLogo{
                 flex:1;
                 padding:10px 0 0 15px;
             }
          }
      }
  }
  .suggestSong{
      width:100%;
      overflow:hidden;
      background: #f44;
      background-size:cover;
      // padding-bottom:60px;
      ul{
          width:100%;
          overflow:hidden;
          li{  
            //   background:red;
            //   opacity:0.5;
              line-height:38px;
              color:#fff;
              font-size:12px;
              text-align:left;
              box-sizing:border-box;
              padding:10px;
              border-top: 1px solid #ccc;
              display:flex;
             .songT{
                 flex:6;
                 overflow:hidden;
                 white-space: nowrap;
                 text-overflow : ellipsis
             }
             .songLogo{
                 flex:1;
                 padding:10px 0 0 15px;
             }
          }
      }
  }
</style>
