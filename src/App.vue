<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import 'common/css/reset.scss';
#app {
  position: relative;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
