import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/users/login'
import order from '@/components/userInfo/order'
import Index from '@/components/users/index'
import userInfo from '@/components/userInfo/userInfo'
import userCollected from '@/components/userInfo/userCollected'
import userPost from '@/components/userInfo/userPost'
import userPosted from '@/components/userInfo/userPosted'
import userReserve from '@/components/userInfo/userReserve'
import userOrder from '@/components/userInfo/userOrder'
import postAuditing from '@/components/userInfo/postAuditing'
import reserveAuditing from '@/components/userInfo/reserveAuditing'
import houseInfo from '@/components/houseInfo/houseInfo'
import houseType from '@/components/houseInfo/houseType'
import houseEdit from '@/components/houseInfo/houseEdit'



Vue.use(Router)

export default new Router({
  routes: [
    {path:'/index',
    name:'Index',
    component:Index,
    children:[
      { path:'userInfo',component:userInfo},
      { path:'order',component:order},
      { path:'userPost',component:userPost},
      { path:'houseInfo',component:houseInfo},
      { path:'houseType',component:houseType},
      { path:'userPosted',component:userPosted},
      { path:'userReserve',component:userReserve},
      { path:'userOrder',name:'userOrder',component:userOrder},
      { path:'houseEdit',name:'houseEdit',component:houseEdit},
      { path:'postAuditing',name:'postAuditing',component:postAuditing},
      { path:'userCollected',name:'userCollected',component:userCollected},
      { path:'reserveAuditing',name:'reserveAuditing',component:reserveAuditing}
    ]
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
