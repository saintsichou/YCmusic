<template>
  <div class='container'> 
    <div class='musicBox'>
       <div class= 'boxHeader'>
            <div class='innerbox'>
                <div class='boxleft'>
                    <img :src='imgs'>
                </div>
                <div class='boxright'>
                    <span class='box_title'>{{title}}</span>
                    <span class='box_name'>{{creater}}</span>
                </div>
            </div>
       </div> 
       <div class= 'boxInfo'>
            <p class='tags' v-for='item in tags'>
                <van-tag  plain type="danger">{{item}}</van-tag>
            </p>
            <div>
                <van-collapse v-model="activeNames">
                    <van-collapse-item title="歌单简介" name="1">
                       {{des}}
                    </van-collapse-item>
                </van-collapse>
            </div>
       </div> 
       <div class= 'boxMusic'>
            <h3>歌曲列表</h3>
            <div class='result'>
            <ul
               v-for='(item,index) in songlist'
               :key='item.id'
            >
                <li @click='jumpSong(item.id,item.name,item.ar[0].name)'>
                    <span class='songId'>{{index+1}}</span>
                    <span class='songT'>
                       {{item.name}}--
                       {{item.ar[0].name}}
                    </span>
                    <span class='songLogo'><van-icon name="play" size='.6rem'/></span>
                </li>
            </ul>
        </div>
       </div> 
    </div>
  </div>
</template>

<script>
import vheader from '@/components/vheader';
import tab from '@/components/tab';
import api from '../api/api.js';
import {mapGetters,mapMutations,mapState,mapActions} from 'vuex';
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
import {time,converTime} from '../util/index.js'
export default {
  name: 'musiclist',
  data () {
    return {
        activeNames: ['0'],
        imgs:'' || require("../assets/h2.jpg"),
        title:'',
        creater:'',
        des:'',
        tags:[],
        songlist:[]
    }
  },
  computed: {

  },
  mounted() {
    //   console.log(this.$route.query.songID)
      api.songDetail(this.$route.query.songID).then(res => {
        //   console.log(res.data.playlist)
          let datas = res.data.playlist;
          this.imgs = datas.coverImgUrl;
          this.title = datas.name;
          this.creater = datas.creator.nickname;
          this.des = datas.description;
          this.tags = datas.tags;
          this.songlist = datas.tracks
        //    console.log(datas.tracks)
      })
  },
  methods: {
     jumpSong(id,name,art){
        //   this.$router.push({ path: '/music', query: { songID: id,songName: name,artists:art}});
        //   this.$router.push({ path: '/music', query: { songID: id,songName: encodeURIComponent(name),artists:encodeURIComponent(art)}});
          this.$store.dispatch('songurl',{
              'id':id,
              'title':name,
              'singer':art
          })
        //  console.log(id)songPlay
     },
     ...mapActions(['songurl'])
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
    // background:#fff2d7
  }
  .musicBox{
      width:100%;
      overflow:hidden;
      .boxHeader{
        background:#473c5d;
     }
    .innerbox{
        padding:12px;
        box-sizing:border-box;
        display:flex;
        .boxleft{
            flex:1;
            img{
                width:114px;
                height:114px;
            }
        }
        .boxright{
            flex:1;
            .box_title{
                padding-top: 5px;
                font-size: 17px;
                line-height: 1.3;
                color: #fefefe;
                height: 44px;
                display: block;
            }
            .box_name{
                padding-top: 1px;
                font-size: 12px;
                line-height: 44px;
                color: #fefefe;
                height: 44px;
                display: block;
            }
        }
    }
    .boxInfo{
        background:#473c5d;
        .van-tag{
            float:left;
            display:block;
            margin: 10px;
            
        }
    }
    .boxMusic{
        h3{
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            background-color: #eeeff0;
            text-align:left;
        }
    }
        .result{
            width:100%;
            overflow:hidden;
            padding-bottom:1px;
            ul{
                width:100%;
                overflow:hidden;
                li{  
                    background:#473c5d;
                    // opacity:0.5;
                    line-height:46px;
                    color:#fff;
                    font-size:12px;
                    text-align:left;
                    box-sizing:border-box;
                    padding:10px;
                    border-top: 1px solid #ccc;
                    display:flex;
                    .songId{
                        flex:1;
                        font-size: 17px;
                        color: #fff;
                    }
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
    }
  
</style>
