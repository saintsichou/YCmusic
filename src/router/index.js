import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/pages/login'],resolve)
    },
    {
      path: '/mainmodel',
      name: 'mainmodel',
      component: resolve => require(['@/pages/mainmodel'],resolve),
      children:[
        
        {
          path: '/mainmodel/',
          name: 'myhome',
          component: resolve => require(['@/pages/home'],resolve),
          meta: {Auth: true},
        },
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/pages/home'],resolve),
          meta: {Auth: true},
        },
        {
          path: '/search',
          name: 'search',
          component: resolve => require(['@/pages/search'],resolve),
          meta: {Auth: true},
        },
        {
          path: '/mymsg',
          name: 'mymsg',
          component: resolve => require(['@/pages/mymsg'],resolve),
          meta: {Auth: true},
        },
        {
          path: '/personal',
          name: 'personal',
          component: resolve => require(['@/pages/personal'],resolve),
          meta: {Auth: true},
        },
        {
          path: '/musiclist',
          name: 'musiclist',
          component: resolve => require(['@/pages/musiclist'],resolve),
          meta: {Auth: true},
        },
        {
          path: '/singers',
          name: 'singers',
          component: resolve => require(['@/pages/singers'],resolve),
        },
        {
          path: '/news',
          name: 'news',
          component: resolve => require(['@/pages/news'],resolve),
        },
        {
          path: '/gmap',
          name: 'gmap',
          component: resolve => require(['@/pages/gmap'],resolve),
        },
      ],
      meta: {Auth: true},
    },
    {
      path: '/music',
      name: 'music',
      component: resolve => require(['@/pages/music'],resolve),
      meta: {Auth: true},
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/register'],resolve),
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
