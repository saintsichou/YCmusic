<template>

    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/home" :active='0'>
                首页              
        </van-tabbar-item>
        <van-tabbar-item icon="search" dot to="/search" :active='1'>搜索</van-tabbar-item>
        <van-tabbar-item icon="friends-o" info="5" to="/mymsg" :active='2'>
                  留言板
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/personal" :active='3'>我的主页</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
        active:0
    }
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#footer{
  width:100%;
  overflow:hidden;
  // height:35px;
  // position:fixed;
  // bottom:0;
  // font-size:12px;
}
</style>
