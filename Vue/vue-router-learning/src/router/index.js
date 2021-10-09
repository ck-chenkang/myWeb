import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from "@/components/home.vue"
import about from "@/components/about.vue"
import user from "@/components/user.vue"
import phone from "@/components/phone.vue"
import tablet from "@/components/tablet.vue"
import computer from "@/components/computer.vue"


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: "/home",
      component: home,
      // 子路由
      children: [
        {
          path: "phone",
          component: phone
        },
        {
          path: "tablet",
          component: tablet
        },
        {
          path: "computer",
          component: computer
        },    // 当进入到home时，下面的组件显示
        {
            path: "",
            component: computer
        }
      ]
    },
    {
      path: "/about",
      component: about
    },
    {
      path: "/",
      redirect: "/home"
    },
     {
      path: "/user/:id",
      component: user
    }

  ]
})
