// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store/store';
//高德地图

// main.js
import 'lib-flexible'
//vant ui
import Vant from 'vant';
import 'vant/lib/index.css';
//添加到原型链
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
import power from '../src/power'
Vue.prototype.qs = QS;
Vue.use(Vant);

Vue.config.productionTip = false
fastclick.attach(document.body)
/* eslint-disable no-new */
const whiteList = ['/home', '/music']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1 && sessionStorage.getItem("token")) {
    next();
  }else{
    if (to.matched.some(record => record.meta.Auth)) {
      if (sessionStorage.getItem("token")) { // 判断当前的token是否存在
            next();
        }
        else {
            next({
            path: '/',
            query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    } else {
      next() // 确保一定要调用 next()
    }
  }
})


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
