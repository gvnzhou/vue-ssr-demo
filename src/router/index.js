// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../components/Home.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/item/:id', component: () => import('../components/Item.vue') }
    ]
  })
}