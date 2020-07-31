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
    component: () => import('../views/Login.vue')
  },
  {
    path: '/player',
    name: 'Player',
    redirect: '/input',
    component: () => import('../views/Player.vue'),
    children: [
      {
        path: '/collection',
        name: 'Collection',
        component: () => import('@/components/songlist/collection.vue')
      },
      {
        path: '/lyric',
        name: 'Lyric',
        component: () => import('@/components/songlist/lyric.vue')
      },
      {
        path: '/input',
        name: 'Input',
        component: () => import('@/components/songlist/input.vue')
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/components/songlist/personal.vue')
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
    next()
    // if (to.path === '/login') {
    //   next()
    // } else {
    //   next('/login')
    // }
  }
})

export default router
