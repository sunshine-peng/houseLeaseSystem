<template>
    <div>
        <section>
            <h1>用户收藏表</h1>
        </section>
         <el-table
    :data="userCollectedInfo"
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
     
      align= 'center'
      prop="time"
      label="起租时间"
      width="120">
    </el-table-column>
    <el-table-column
      fixed='right'
      align= 'center'
      prop="collecttime"
      label="收藏日期"
      width="110">
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
      :total="this.userCollectedInfo1
      .length">
    </el-pagination>
  </div>
  <el-button type="primary" @click="back">返回</el-button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            collectInfo:[],
            userCollectedInfo1:[],
           
            currentPage:1,
        pageSize:3,
        }
    },
    methods:{
        handleSizeChange(val) {
        this.pageSize=val
      },
      handleCurrentChange(val) {
        this.currentPage=val
      },
      getcollected(openid){
        axios.get('Collected',{
            params:{
                openid
            }
        })
        .then( res => {
            if(res.data.success){
                console.log(res.data.data)
                console.log(this)
           
               localStorage.setItem('time',res.data.time)
              this.getCollectInfo(res.data.data)

                
            }
        })
        .catch( res => {
            console.log(res)
        })
    },
    back(){
        this.$router.push('/index/userInfo')
    },
    getCollectInfo(from_id){
        axios.get('collectInfo',{
            params:{
                from_id
            }
        })
        .then( res => {
            if(res.data.success){
                console.log('res.data.data')
                console.log(res.data.data)
                var timearr=localStorage.getItem('time').split(',')
                console.log('timearr')
                console.log(timearr)
                res.data.data.forEach( (item,index) => {
                    console.log(index)
                      item.collecttime=this.date.timeFormat(parseInt(timearr[index]))
                })
                    console.log('res.data555.data')
                    console.log(res.data.data.collecttime)
                this.userCollectedInfo1=res.data.data
            }
        })
        .catch(res => {
            console.log(res)
        })
    },
    
    },
    computed:{
        userCollectedInfo(){
             return this.userCollectedInfo1.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
       
                    
    
    },
    created(){
        var openid=localStorage.getItem('openid');
        this.getcollected(openid)
    },
  mounted(){
  }
}
</script>