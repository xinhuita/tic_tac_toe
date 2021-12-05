import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Board from '../components/Board.vue'
import Play from '../components/Play.vue'
import History from '../components/History.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/login'
  },
  {
    path: '/login', component: Login
  },
  {
    path: '/signup', component: Signup
  },
  {
    path: '/board', component: Board,
    children: [
      {
        path: '/play',
        component: Play
      },
      {
        path: '/history',
        component: History
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
