<template>
  <div id='footer'>
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
      msg: 'foot'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer{
  width:100%;
  height:35px;
  position:fixed;
  bottom:0;
  font-size:12px
}
</style>
