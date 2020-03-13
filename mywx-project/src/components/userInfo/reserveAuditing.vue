<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="reserveInfo">
      <el-form-item label="姓名">
        <el-input v-model="reserveInfo.user_name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="reserveInfo.user_tel"></el-input>
      </el-form-item>
     
      <el-form-item label="预约房屋">
        <el-input v-model="reserveInfo.location"></el-input>
      </el-form-item>
     
      <el-form-item label="小区">
        <el-input v-model="reserveInfo.cellName"></el-input>
      </el-form-item>
      <el-form-item label="业主">
        <el-input v-model="reserveInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="业主电话">
        <el-input v-model="reserveInfo.tel"></el-input>
      </el-form-item>
      <el-form-item label="起租日期">
        <el-input v-model="reserveInfo.time"></el-input>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-input v-model="reserveInfo.reserve_time"></el-input>
      </el-form-item>
      <!-- <div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="reserveInfo.src" 
    :preview-src-list="srcList">
  </el-image>
      </div>-->
      <el-row style="text-align:left;margin-left:80px">
        <el-button type="danger" @click="reject">审核拒绝</el-button>
        <el-button type="success" @click="agree">审核通过</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      reserveInfo: {},
      srcList: []
    };
  },
  methods: {
    agree() {
      var id = this.reserveInfo.id;
      console.log(id)
      var reserve_state = 0;
      axios
        .get("/reserveAuditing", {
          params: {
            id,
            reserve_state
          }
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.success) {
              this.$message('操作成功')
              this.$router.push('/index/userReserve')

            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    reject() {
        var id = this.reserveInfo.id;
      var reserve_state = 2;
      axios
        .get("/reserveAuditing", {
          params: {
             id,
            reserve_state
          }
        })
        .then(res => {
            console.log(res)
          if (res.data.success) {
             
             this.$message('操作成功')
              this.$router.push('/index/userReserve')
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // deleteAuditing(id){
    //     axios.get('deleteAuditing',{
    //         params:{
    //             id:id
    //         }
    //     })
    //     .then(res => {
    //         if(res.data.success){
    //             this.$message('操作成功')
    //         }
    //     })
    // }
  },
  created() {
    var reserveInfo = this.$route.params.reserveInfo
   if(typeof(reserveInfo)=='undefined'){
    var reserInfo=localStorage.getItem('reserInfo')
    this.reserveInfo=JSON.parse(reserInfo)
   }else{
     this.reserveInfo = reserveInfo;
    var reserveInfo1=JSON.stringify(reserveInfo)
    console.log('reserveInfo1')
    console.log(reserveInfo1)
    localStorage.setItem('reserInfo',reserveInfo1)
   }
    
   
    
  },
  mounted(){
   
  }
};
</script>
<style scoped>
</style>