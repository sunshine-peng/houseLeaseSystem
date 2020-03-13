<template>
    <div>
       <section class="user_title">
           <h1 > 用户信息</h1>
       </section >
       <section style="text-align:left">
          <el-button type="success" @click="complete">全部用户 </el-button>
           <el-button type="primary" plain @click="nomalUser">正常用户</el-button>
          <el-button type="warning" plain @click="blacklistUser">黑名单用户</el-button>
       </section>
       <el-table
    :data="tableData"
    style="width: 100%"
     :row-class-name="tableRowClassName">
    <el-table-column
     align='center'
        type="index"
        width="50"
        label="序号"
    ></el-table-column>
    <el-table-column
     align='center'
      prop="nickname"
      label="姓名"
      width="140">
    </el-table-column>
    <el-table-column
    align='center'
      prop="tel"
      label="电话"
      width="140">
    </el-table-column>
    <el-table-column
    align='center'
      prop="gender"
      label="性别"
      width="80">
      <template slot-scope="scope">
               <span>{{scope.row.gender==0?"男":"女"}}</span>
             </template>
    </el-table-column>
    <el-table-column
    align='center'
      prop="birthday"
      label="出生日期"
      width="140">
    </el-table-column>
    <el-table-column
    align='center'
      prop="occupation"
      label="职业"
      width="140">
    </el-table-column>
    <el-table-column
    align='center'
      prop="register_time"
      label="注册时间"
      width="140">
    </el-table-column>
    <el-table-column
    align='center'
      prop="update_time"
      label="更新时间"
      width="140">
    </el-table-column>
    
    <el-table-column
    fixed="right"
    align="center"
      prop="state"
      label="状态"
      width="140">
      <div slot-scope="scope">
      <el-switch
  style="display: block"
 v-model='scope.row.state'
  :active-value=1
  :inactive-value=0
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-text="正常"
  inactive-text="拉黑"
  @change="clickSwitch(scope.row.user_id,scope.row.state)">
</el-switch>
</div>
    </el-table-column>
    <el-table-column
    fixed="right"
    align='center'
      label="用户收藏"
      width="130">
      <div slot-scope="scope">
      <el-button type="info" size="mini" @click="userCollect(scope.row.openid)">用户收藏</el-button>
      </div>
    </el-table-column>
  </el-table>
  <div class="block" style="text-align:left;margin-top:6px">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.userInfo.length">
    </el-pagination>
  </div>
    </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  
 
</style>

<script>
import axios from 'axios'
  export default {
    
    data() {
      return {
        
        userInfo:[],
        currentPage:1,
        pageSize:3,
  
      }
    },
    computed:{
      tableData(){
        return this.userInfo.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
      },
    
    },
   
    methods:{
        getUserInfo(status){
            axios.get('/getUsers',{
              params:{
                status:status
              }
            })
            .then(res => {
                if(res.data.success){
                    // res.data.data.forEach(item => {
                    //     if(item.state==1){
                    //         this.value=true
                    //         console.log(this.value)
                    //     }else{
                    //         this.value=false
                    //               console.log(this.value)
                            
                    //     }
                    // })
                    res.data.data.forEach( item =>{
                      item.register_time=this.date.dateFormat(item.register_time)
                      item.update_time=this.date.dateFormat(item.update_time)
                    })
                     this.userInfo=res.data.data
                    

                }
               
            })
            .catch(res => {
                console.log(res)
            })
        },
        userCollect(id){
          localStorage.setItem('openid',id);
          this.$router.push({
            name:'userCollected',
            params:{
              openid:id
            }
          })
        },
       blacklistUser(){
          var status=0
          this.getUserInfo(status)
        },
        nomalUser(){
          var status=1
          this.getUserInfo(status)
        },
        complete(){
          var status=3
          this.getUserInfo(status)
        },
        tableRowClassName({row, rowIndex}) {
          console.log(row)
          console.log('row.state')
          console.log(row.state)
        if (row.state==0) {
            
           return 'warning-row';
        } else {
          return '';
        }
      
      },
      clickSwitch(userID,state){
        
        axios.get('updateUser',{
            params:{
                user_id:userID,
                state:state
            }
        })
        .then(res => {
            if(res.data.success){
                this.$message('操作成功')
            }else{
                this.$message('操作失败')
            }
        })
        .catch( res => {
            console.log(res)
        })
      },
        handleSizeChange(val) {
        this.pageSize=val
      },
      handleCurrentChange(val) {
        this.currentPage=val
      }
   
    
        
    },
    created() {
            this.getUserInfo(this.status)
        }
  }
</script>

    
