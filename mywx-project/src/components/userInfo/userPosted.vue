<template>
    <div>
        <section>
            <h1>用户发布信息</h1>
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
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="tel"
      label="电话"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="_city"
      label="城市"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="typearry"
      label="房型"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="location"
      label="地址"
      width="200">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="money"
      label="房租"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="area"
      label="面积"
      width="120">
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="houseGoods"
      label="房屋设施"
      width="200"
      :show-overflow-tooltip='true'
      >
    </el-table-column>
    <el-table-column
     align= 'center'
      prop="cellName"
      label="小区"
      width="120">
    </el-table-column>
    <el-table-column
      fixed='right'
      align= 'center'
      prop="time"
      label="起租时间"
      width="120">
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
      :total="this.houseList.length">
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
            name:'postAuditing',
            params:{
                houseInfo:row
            }
        })
      },
      getUsersPost(auditing){
        axios.get('/userpost',{
            params:{
                auditing
            }
        })
        .then(res => {
            if(res.data.success){
                res.data.data.forEach(item => {
                 let resImg = item.src.split(',')
            // 格式化图片路径
            console.log('resData')
            console.log(resImg)
            let resArr = resImg.map(value => {
              return 'http://127.0.0.1:3002/users/upload/' + value
            })
            item.src = resArr
              })
                this.houseList=res.data.data
                  console.log('this.houseList666')
                console.log(this.houseList)
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
             return this.houseList.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
       
                    
    
    },
    created(){
        this.getUsersPost(1)
    },
    
    data() {
      return {
       houseList: [],
        currentPage:1,
        pageSize:3,
      }
    }

  }
</script>
<style scoped>
   
        
</style>
