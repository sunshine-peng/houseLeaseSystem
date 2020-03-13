<template>
    <div>
      <div class="contain">
       <el-form ref="form" :model="orderInfo" label-width="80px" >
  <el-form-item label="租客姓名" required>
    <el-input v-model="orderInfo.user_name" ></el-input>
     </el-form-item>
  <el-form-item label="租客电话" required>
    <el-input v-model="orderInfo.user_tel"></el-input>
     </el-form-item>
  <el-form-item label="租房编号">
    <el-input v-model="orderInfo.from_id"></el-input>
     </el-form-item>
  <el-form-item label="租房时长" style="width:290px;">
    <el-input v-model="orderInfo.lease_term" ></el-input>
    
     </el-form-item>

  <el-form-item label="起租时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="orderInfo.start_time" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="结束时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="orderInfo.end_time" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
 
   <el-row style="text-align:left;margin-left:80px">
      <el-button type="primary" @click="onSubmit" v-if="!isshow">提交</el-button>
        <el-button type="success" @click="agree" v-if='isshow'>确定</el-button>
        <el-button type="danger" @click="reject" v-if='isshow'>取消</el-button>
      </el-row>
  </el-form>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data(){
        return{
            orderInfo:{
                user_name:'',
                user_tel:'',
                from_id:'',
                lease_term:'',
                start_time:null,
                end_time:null
                },
                isshow:false
       
        }
    },
    created(){
    var orderInfo=this.$route.params.row
    var isshow=this.$route.params.isshow
    
    if(typeof(isshow) == 'undefined'){
      isshow=localStorage.getItem('isshow')
      // this.isshow=JSON.parse(isshow)
    }else{
     this.isshow=isshow
      if(!isshow){
        orderInfo= {
                user_name:'',
                user_tel:'',
                from_id:'',
                lease_term:'',
                start_time:null,
                end_time:null
                },
       localStorage.setItem('orderInfo',orderInfo)
    }
    //  isshow=JSON.stringify(isshow)
    
     localStorage.setItem('isshow',isshow)
    }
   
    if(typeof(orderInfo) == 'undefined'){
      orderInfo=localStorage.getItem('orderInfo')
      this.orderInfo=JSON.parse(orderInfo)
    }else{
       orderInfo.start_time=orderInfo.edit_start_time
    orderInfo.end_time=orderInfo.edit_end_time
    
      this.orderInfo=orderInfo
      orderInfo=JSON.stringify(orderInfo)
      localStorage.setItem('orderInfo',orderInfo)
    }
    },
        methods: {
      //      handleChange(value) {
      //   this.house_type=value.join('-')
      //   console.log(this.value)
      // },
            agree(){
              var orderInfo={}
              console.log(this.orderInfo)
              orderInfo.id=this.orderInfo.id
              orderInfo.user_name=this.orderInfo.user_name
              orderInfo.user_tel=this.orderInfo.user_tel
              orderInfo.from_id=this.orderInfo.from_id
              orderInfo.lease_term=this.orderInfo.lease_term
             
              orderInfo.start_time=moment(this.orderInfo.start_time)._d.getTime()
               
              orderInfo.end_time=moment(this.orderInfo.end_time)._d.getTime()
              console.log(orderInfo)
              axios.get('/editOrder',{
                params:{
                  orderInfo
                }
              })
              .then(res => {
                if(res.data.success){
                   this.$router.push('/index/order')
                  this.$message({
                    type:'success',
                    message:'编辑成功'
                  })
                }
              })
              .catch(res => {
                console.log(err)
              })
            },
            reject(){
               this.$confirm('确定放弃本次编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push('/index/order')
          this.$message({
            type: 'success',
            message: '取消编辑!'
          });
        }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        });
            },
            onSubmit(){
              
            console.log('555')
                this.orderInfo.start_time=this.orderInfo.start_time.getTime()
                this.orderInfo.end_time=this.orderInfo.end_time.getTime()
                
             axios.post('/order',{
                 params:{
                     orderInfo:this.orderInfo
                 }
             })
             .then(res => {
                 if(res.data.success){
                  this.$router.push('/index/order')
                  this.$message({
                    type:'success',
                    message:'提交成功'
                  })
                 }
             })
            }

        },
       
}
</script>
<style scoped>
  .contain{
    width: 50%;
    height: auto;
  }
</style>