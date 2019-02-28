<template>

    <van-tabbar v-model="active"  v-show="hidshow" >
        <van-tabbar-item icon="home-o" to="home" :active='0'>
                首页              
        </van-tabbar-item>
        <van-tabbar-item icon="search" dot to="search" :active='1'>搜索</van-tabbar-item>
        <van-tabbar-item icon="friends-o"  to="mymsg" :active='2'>
                  留言板
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o"  to="singers" :active='3'>
                  歌手
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="personal" :active='4'>我的主页</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
        active:0,
        hidshow:true,
        docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
        showHeight:  document.documentElement.clientHeight,  //实时屏幕高度
        isResize:false //默认屏幕高度是否已获取
    }
  },
  mounted() {
    window.onresize = () =>{
      return(
        ()=>{
          if(!this.isResize){
            //默认屏幕高度                               
            this.docmHeight=document.documentElement.clientHeight                                
            this.isResize = true
          }
           this.showHeight = document.body.clientHeight 
        }
      )()
    }
  },
  watch:{
    showHeight:'changeHeight'
  },
  methods: {
    changeHeight() {        
        if(this.docmHeight > this.showHeight){         
             this.hidshow=false       
        }else{            
          this.hidshow=true       
         }    
    },
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
