<template>
    <div>
    <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :router="true">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>用户</template>
          <el-menu-item index="1-1"  route="/index/userInfo">用户信息</el-menu-item>
          <el-menu-item index="1-2" route="/index/userCollected">用户收藏</el-menu-item>       
          <el-menu-item index="1-3" route="/index/userReserve">用户预约</el-menu-item>  
          <el-menu-item index="1-4" route="/index/order">用户订单</el-menu-item>  
          <el-menu-item index="1-5" route="/index/userPosted">用户发布</el-menu-item>  
          <el-menu-item index="1-6" route="/index/userPost">用户发布申请</el-menu-item>  
       
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-home"></i>房屋</template>
      
        
          <el-menu-item index="2-1" route="/index/houseInfo">房屋信息</el-menu-item>
          <el-menu-item index="2-2" route="/index/housetype">房屋类型</el-menu-item>

   
          <el-menu-item index="2-3">选项3</el-menu-item>
      
       
      </el-submenu>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
     <div class="header">
         <h1 class="sysTitle">房屋租赁系统后台管理</h1>
          <span class="quit" @click="quit">退出</span>
        
     </div>
      
    </el-header>
    
    <el-main>
       <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

    </div>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .sysTitle{
       height: inherit;
      text-align: left;
      line-height: 60px;
      flex:1;
      margin: 0px;
      font-size: 25px;
  }
  .header{
      width: inherit;
      height: inherit;
      display: flex;
      justify-content: space-around;
  }
  .quit{
      font-size: 16px;
      flex: 1;
  }
</style>

<script>
  export default {
    data() {
     
     
      return {
      
      }
    },
    methods:{
        quit(){
            this.$router.push('/')
        }
    }
  };
</script>