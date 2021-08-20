import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../views/Greeter.vue'),
  },
  {
    path: '/personInfo',
    name: 'PersonInfo',
    component: ()=>import('../views/PersonInfo.vue'),
  },
  {
    path: '/mine',
    name: 'Mine',
    component: ()=>import('../views/Mine/Mine.vue'),
    children:[
      {
        path:'questionnaires',
        component: ()=> import('../views/Mine/Children/Questionnaires.vue')
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
