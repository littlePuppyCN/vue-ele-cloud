import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/player',
    name: 'Player',
    component: () => import('../views/Player.vue'),
    children: [
      {
        path: '/collection',
        name: 'Collection',
        component: () => import(/* webpackChunkName: "about" */ '@/components/songlist/collection.vue')
      },
      {
        path: '/lyric',
        name: 'Lyric',
        component: () => import(/* webpackChunkName: "about" */ '@/components/songlist/lyric.vue')
      },
      {
        path: '/input',
        name: 'Input',
        component: () => import(/* webpackChunkName: "about" */ '@/components/songlist/input.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) {
    if (to.path === '/login') {
      next('Player')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
