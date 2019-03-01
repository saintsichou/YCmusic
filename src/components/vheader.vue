<template>
  <div>
    <van-nav-bar
      title="YCmusic"
      :left-text=this.$store.state.userInfo.user
      right-text="退出系统"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'vheader',
  data () {
    return {
      msg: 'header'
    }
  },
  mounted() {
    
  },
  methods: {
    onClickLeft() {
        this.$router.go(-1)
      // console.log(window.location.href)
      // let url = window.location.href.split('?')[0];
      // let urlArr = url.split('/');
      // let furl = urlArr[urlArr.length-1]
      //   if(furl == "music"){
      //     console.log(this.$route.path)

      //       this.$router.go(-1)
      //   }else{
      //       if(this.$store.state.userInfo.vip == 1){
      //       // Toast(`hello,欢迎超级vip${this.$store.state.userInfo.user}`);
      //       this.$router.push('/home')
      //       }else{
      //         // Toast(`hello,${this.$store.state.userInfo.user}`);
      //         this.$router.push('/home')
      //       }
      //   }
    },
    onClickRight() {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('vip')
      localStorage.removeItem('searchOne')
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
