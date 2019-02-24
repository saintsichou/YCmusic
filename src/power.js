import Vue from 'vue'
import App from './App'
import router from './router'

const interRouter = function(){
    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.Auth)) {
            console.log(record)
          // this route requires auth, check if logged in
          // if not, redirect to login page.
          if (!auth.loggedIn()) {
            next({
              path: '/login',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next() // 确保一定要调用 next()
        }
      })
}
export default interRouter