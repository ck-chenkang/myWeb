import Vue from 'vue'
import Router from 'vue-router'
import Bind from '@/components/Bind'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Bind
    }
  ]
})
