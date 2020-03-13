<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div class="container">
      <el-card  style="height:280px; width:300px">
        <div slot="header" class="clearfix">
          <span>房屋租赁系统后台管理</span>
        </div>
       <div class="login">
        <div class="user username">
           <div  class="iconfont icon-user user-icon" ></div>
             <el-input style="flex:8;text-align:right" v-model="user.username" placeholder="请输入内容"></el-input>
        </div>
        <div class="user password">
           <div class="iconfont icon-lock user-icon" ></div>
            <el-input type="password" style="flex:8; text-align:right" v-model="user.password" placeholder="请输入内容"></el-input>
   </div>
  
              
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
           
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button class="btn" type="primary"  @click="doLogin">登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
   import qs from 'qs'
   import axios from 'axios'
   
  export default {
 
    //单页面中不支持前面的data:{}方式
    data() {
      //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
      return{
        //之前是在里面直接写username，password等等，但是这里要写return
        //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
        //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
        //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
        //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
        //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
        user:{
          username:'admin',
          password:'201616',
          //为了登录方便，可以直接在这里写好用户名和密码的值
        }
      }
    },
    methods:{
      doLogin(){//一点击登录按钮，这个方法就会执行
      console.log(this.user)
      // console.log(this)
      // console.log(qs.stringify(this.user))
       axios.get('/denglu',{
         
         params:{
           user:qs.stringify(this.user)
         }
       })
       .then(
         res =>{
           if(res.data.success){
             this.$router.push('/index/userInfo')
           }else{
             alert(res.data.meg)
           }
         
           
       })

      //  .catch(res =>{
      //    console.log(res)
      //  })
      }
    }
  }
</script>
<style scoped>
@import '../../assets/iconfont.css';

.container{

    /* height: 100%;
   width: 100%; */
     /* background-color: #393D49; */

display: flex;

justify-content:center;
padding-top: 100px;
}

.user{
display: flex;
}
.user-icon{
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    flex: 2;
    border: 1px solid #ccc;
    border-right: none;
}
.login{
    display: flex;
    flex-direction: column;
    height: inherit;
   
   
  
}

.password{
margin-top: 15px;
}
.btn{
    width: 260px;
    margin: 15px 0px;
}
</style>
