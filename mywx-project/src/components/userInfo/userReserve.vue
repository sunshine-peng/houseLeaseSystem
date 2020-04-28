<template>
    <div>
        <section>
            <h1>用户预约信息</h1>
        </section>
          <el-table
    :data="houseData"
    border
    style="width: 100%">
    <el-table-column
      fixed
       align= 'center'
     type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
       align= 'center'
      prop="user_name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="user_tel"
      label="用户电话"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="location"
      label="预约房屋"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="cellName"
      label="小区"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="name"
      label="业主"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="tel"
      label="业主电话"
      width="120">
    </el-table-column>
    <el-table-column
      align= 'center'
      prop="time"
      label="起租时间"
      width="120">
    </el-table-column>
    <el-table-column
      align= 'center'
      prop="reserve_time"
      label="预约时间"
      width="120">
    </el-table-column>


    
    <el-table-column
     align= 'center'
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="warning" size="small">审核</el-button>
       
      </template>
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
      :total="this.reserveList.length">
    </el-pagination>
  </div>
    </div>
</template>
<script>
import axios from 'axios'
  export default {
    
    methods: {
      handleClick(row) {
        console.log(row);
        this.$router.push({
            name:'reserveAuditing',
            params:{
                reserveInfo:row
            }
        })
      },
      getUsersReserve(){
          var reserve_state=1
        axios.get('/userReserve',{
          params:{
           reserve_state
          }
        })
        .then(res => {
            if(res.data.success){
                this.reserveList=res.data.data
                console.log('res.data.dat666a')
                console.log(res.data.data)
            }else{
                this.$message('获取信息失败')
            }
           
        })
        .catch(res => {

        })
    },
     handleSizeChange(val) {
        this.pageSize=val
      },
      handleCurrentChange(val) {
        this.currentPage=val
      }
    },
    computed:{
        houseData(){
             return this.reserveList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
       
                    
    
    },
    created(){
        this.getUsersReserve()
    },
    
    data() {
      return {
       reserveList: [],
        currentPage:1,
        pageSize:3,
      }
    }

  }
</script>
<style scoped>
   
        
</style>
