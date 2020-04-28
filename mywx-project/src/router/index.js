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
      { path:'userInfo',component:userInfo,meta:['用户','用户信息']},
      { path:'order',component:order,meta:['用户','用户订单']},
      { path:'userPost',component:userPost,meta:['用户','用户发布申请']},
      { path:'houseInfo',component:houseInfo,meta:['房屋','房屋信息']},
      { path:'houseType',component:houseType,meta:['房屋','房屋类型']},
      { path:'userPosted',component:userPosted,meta:['用户','用户发布']},
      { path:'userReserve',component:userReserve,meta:['用户','用户预约']},
      { path:'userOrder',name:'userOrder',component:userOrder},
      { path:'houseEdit',name:'houseEdit',component:houseEdit},
      { path:'postAuditing',name:'postAuditing',component:postAuditing},
      { path:'userCollected',name:'userCollected',component:userCollected,meta:['用户','用户收藏']},
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
