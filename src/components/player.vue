<template>
  <div class='back'>
      <!--<transition name='normal' >
          <div  @mousedown.stop="down" @touchstart.stop="down"
          @mousemove.stop="move" @touchmove.stop="move"
          @mouseup.stop="end" @touchend.stop="end"
          class='container' id='player'  v-show='this.$store.state.songUrl.title'>
              <div class='broast' @touchstart.once="firstPlay">
                    <div class='cd'  @click='toggle'>
                        <img :src = 'imgUrl'  :class='cdCls'/>
                        <van-icon name="play" size='.8rem' class='plogo' color='#fff' @click.stop='toggle' v-show='playIcon'/>
                    </div>
              </div>
          </div>
      </transition> -->
      <transition name='mini' >
          <div class="mini-player"  v-show='this.$store.state.songUrl.title'>
            <div class="icon" @click='toggle'>
              <img :class="cdCls"  :src="imgUrl" width="40" height="40">
              <van-icon name="play" size='.8rem' class='plogo2' color='#fff' @click.stop='toggle' v-show='playIcon'/>
            </div>
            <div class="text">
              <h2 class="name">{{this.$store.state.songUrl.title}}</h2>
              <div class="desc">{{this.$store.state.songUrl.singer}}</div>
            </div>
            <van-icon name="close"  class='close' size='.8rem' @click.stop='close'/>
          </div>
      </transition>
      <audio :src='url' ref='player' preload="auto" controls autoplay loop id='musicApp' @click='toggle' @ended='end'></audio>
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
  name: 'player',
  data () {
    return {
       url:'',
       imgUrl:require("../assets/h1.jpg"),
       songs:'',
       flags: false,
       position: { x: 0, y: 0 },
       nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: ''
    }
  },

  created() {

  },
  mounted() {
      
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playing',
      'songUrl'
    ]),
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? false : true
    },
    
  },
  watch: {
    //以下两种方法均可行
    //  '$store.state.songUrl.id':function(newVal,oldVal){
    //    this.getSong(newVal)
    //  },
   songUrl(n,o){
    //  console.log(n.id)
    if(n.id){
      this.getSong(n.id)
      this.setPlayingState(true)
    }
      
   }
   
  },
  methods: {
    getSong (id) {
        api.songPlay(id).then(res =>{
            if(res.data.data[0].url !== null && res.data.data[0].url !==  ''){
                this.url = res.data.data[0].url
            }else{
                Toast('歌曲已经下架');
                this.$router.push('/home')
            }

        })
    },
    firstPlay () {
      console.log('firstPlay')
      this.$refs.player.play()
    },
    toggle(){
      const audio = this.$refs.player
      this.playing ? audio.pause(): audio.play()
      this.setPlayingState(!this.playing)
    },
    end(){
      return this.playing = 'play pause'
    },
    open(){
        console.log(666)
    },
    close(){
        this.setPlayingState(false);
        this.$refs.player.pause();
        this.$store.dispatch('songurl',{id:'',title:''})
    },
    //拖拽小图标
    down(){
        this.flags = true;
        var touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = player.offsetLeft;
        this.dy = player.offsetTop;
      },
      move(){
        if(this.flags){
          var touch ;
          if(event.touches){
              touch = event.touches[0];
          }else {
              touch = event;
          }
          this.nx = touch.clientX - this.position.x;
          console.log(this.nx)
          // if(this.nx<0){
          //   this.nx=0
          // }
          // if(this.ny>100){
          //   this.ny = 100
          // }
          this.ny = touch.clientY - this.position.y;
          console.log(this.ny)

          this.xPum = this.dx+this.nx;
          this.yPum = this.dy+this.ny;
          player.style.left = this.xPum+"px";
          player.style.top = this.yPum +"px";
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          document.addEventListener("touchmove",function(){
              event.preventDefault();
              console.log(123)
          },false);
        }
      },
    //鼠标释放时候的函数
      end(){
        this.flags = false;
      },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
    }),
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
  .back{
  
  }
  .container{
    width:60px;
    height:60px;
    position:absolute;
    top:80px;
    left:15px;
    background:transparent;

    // background: url('../../static/imgs/bg5.jpg') center center no-repeat;
    // overflow:hidden;
    z-index:9999
  }
  .songTitle{
    color:#fff;
    font-size:16px;
    margin:20px 0;
  }
  .songArt{
    color:#fff;
    font-size:14px;

  }
  .broast{
    width:100%;
    height:100%;
    position:relative;
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
    width:30px;
    height:30px;
    position:absolute;
    z-index:10;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
  }
  .plogo2{
    width:30px;
    height:30px;
    position:absolute;
    z-index:10;
    top:20px;
    left:25px;
    right:0;
    bottom:0;
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 50px;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.85);
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s
    }
    &.mini-enter, &.mini-leave-to {
      opacity: 0
    }
    .close{
      padding:12px;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 10px 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: mymove 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      .name {
       margin-bottom: 2px;
       line-height: 14px;
       font-size: 14px;
       color: #000;
      }
      .desc {

        font-size: 14px;
        color: #000;
      }
    }
  }
  .cd{
      width:100%;
      height:100%;
      position:absolute;
      border:1px solid #000;
      border-radius:50%;
      top:0;
      left:0;
      right:0;
      bottom:0;
      margin:auto;
      z-index:2;
      // animation: mymove 7s linear infinite;
        .play {
          animation: mymove 10s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
    }
   @keyframes mymove
  {
  from{transform:rotate(0deg)}
  to{transform:rotate(360deg)}
  }
</style>
