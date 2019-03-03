<template>
  <div id='footer' >
      <div class="footer-certification">
        <span class="copyright">李二狗版权所有©2018-2019</span>
        <a href="http://icp.chinaz.com" target="_blank" class="icp">粤ICP备18150338号</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
      msg: 'foot',
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
  watch: {
    showHeight:'inputType'
  },
  methods: {
     inputType() {
        if (!this.timer) {
           this.timer = true
           let that = this
           setTimeout(() => {
              if (that.docmHeight > that.showHeight) {
              //显示class
                 this.hidshow = false;
              } else if (that.docmHeight <= that.showHeight) {
               //显示隐藏
                 this.hidshow = true;
              }
              that.timer = false;
           }, 20)
        }
     },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer{
  width:100%;
  height:35px;
  float:left;
  margin-top:100px;
  font-size:12px
}
</style>
