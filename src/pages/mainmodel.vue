<template>
  <div class='bg'>
         <vheader></vheader>
         <keep-alive exclude="musiclist">
            <router-view></router-view>
         </keep-alive>
         <tab></tab>
         <player></player>
  </div>
</template>

<script>
import vheader from '@/components/vheader';
import tab from '@/components/tab';
import player from '@/components/player';
export default {
    name: 'mainmodel',
    data () {
    return {
      stop: false
    }
  },
  mounted () {
    let m = document.querySelector('#app')
    m.addEventListener('touchend', this.firstPlay)
  },
  methods: {
    firstPlay () {
      let music = document.querySelector('#musicApp')
      music.play()
      if (music.src !== '') {
        this.stop = true
      }
    }
  },
  watch: {
    stop () {
      let m = document.querySelector('#app')
      m.removeEventListener('touchend', this.firstPlay)
    }
  },
    components:{
        vheader,
        tab,
        player
    }
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


</style>
