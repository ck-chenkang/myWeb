import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AreYouOk from '@/components/AreYouOk'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/areYouOk"
    },
    {
      path: '/hello',
      component:HelloWorld
    },
    {
      path: '/areYouOk',
      component:AreYouOk
    }
  ]
})
