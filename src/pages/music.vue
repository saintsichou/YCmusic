<template>
  <div class='container'>
    <vheader></vheader>
    <h2 class='songTitle'>歌名:{{decodeURIComponent(this.$route.query.songName)}}</h2>
    <h3 class='songArt'>演奏:{{decodeURIComponent(this.$route.query.artists)}}</h3>
    <div class='center2'  @click='toggle'>
        <img :src = 'imgUrl'  :class='[flage?active:noactive]'/>
        <van-icon name="play" size='190px' class='plogo' color='#fff' @click.stop='toggle' v-if='!flage'/>

    </div>
    <audio :src='url' ref='player' preload="auto" controls autoplay id='musicApp' @click='toggle' @ended='end'></audio>

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
  name: 'musiclist',
  data () {
    return {
       url:'',
       imgUrl:require("../assets/h1.jpg"),
       flage:'',
       active:'active',
       noactive:'center',
       playing:true
    }
  },
  computed: {

  },
  mounted() {
    this.flage =true;
    api.songPlay(this.$route.query.songID).then(res =>{
      console.log(res.data.data[0].url)
      if(res.data.data[0].url !== null && res.data.data[0].url !==  ''){
          this.url = res.data.data[0].url
      }else{
          Toast('歌曲已经下架');
          this.$router.push('/home')
      }

    })
  },
  methods: {
    startMusic(){
      this.$refs.player.play()
      this.flage = true

    },
    stopMusic(){
      this.$refs.player.pause()
      this.flage = false
    },
    toggle(){
      console.log(123)
      const audio = this.$refs.player
      
      this.playing ? audio.pause(): audio.play()
      this.playing = !this.playing
      this.flage = !this.flage
    },
    end(){
      this.flage = !this.flage;
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
    width:100%;
    height:100%;
    position:absolute;
    // background:#fff2d7
    background: url('../../static/imgs/bg5.jpg') center center no-repeat;
    background-size:cover;
  }
  .songTitle{
    color:#fff;
    font-size:22px;
    margin:20px 0;
  }
  .songArt{
    color:#fff;
    font-size:20px;

  }
  .center2{
    width:100%;
    height:250px;
    position:relative;
  }
  .center{
    width:150px;
    height:150px;
    position:absolute;
    border:20px solid #000;
    border-radius:50%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:2;

    img{
      width:100%;
      border-radius:50%;
    }
  }
  #musicApp{
    width:100%;
    // height:100px;
    position:absolute;
    z-index:1;
    // top:0;
    left:0;
    // right:0;
    bottom:10px;
    margin:0 auto;
    display:none
  }
  .plogo{
    width:50px;
    height:50px;
    position:absolute;
    z-index:10;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
  .active{
    width:150px;
    height:150px;
    position:absolute;
    border:20px solid #000;
    border-radius:50%;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:2;
    animation: mymove 7s linear infinite ;
  }
   @keyframes mymove
  {
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
  }
</style>
