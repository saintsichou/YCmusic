<template>
  <div id="app">
      <vheader></vheader>
      <router-view></router-view>
      <tab></tab>
  </div>
</template>

<script>
import vheader from '@/components/vheader';
import tab from '@/components/tab';
export default {
  name: 'App',
  components:{
    vheader,
    tab
  },
}
</script>

<style>
@import 'common/css/reset.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
