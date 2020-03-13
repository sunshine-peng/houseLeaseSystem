<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="houseInfo">
    
      <el-form-item label="房型">
        <el-input v-model="houseInfo.typearry"  ></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="houseInfo._city"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="houseInfo.location" ></el-input>
      </el-form-item>
       <el-form-item label="小区">
        <el-input v-model="houseInfo.cellName" ></el-input>
      </el-form-item>
      <el-form-item label="房租">
        <el-input v-model="houseInfo.money" ></el-input>
      </el-form-item>
      <el-form-item label="面积">
        <el-input v-model="houseInfo.area"  ></el-input>
      </el-form-item>
      <el-form-item label="房屋设施">
        <el-input v-model="houseInfo.houseGoods" ></el-input>
      </el-form-item>
     
        <el-form-item label="业主姓名">
        <el-input v-model="houseInfo.name" ></el-input>
      </el-form-item>
      <el-form-item label="业主电话">
        <el-input v-model="houseInfo.tel" ></el-input>
      </el-form-item>
      <el-form-item label="起租日期">
        <el-input v-model="houseInfo.time" ></el-input>
      </el-form-item>
      <!-- <div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="houseInfo.src" 
    :preview-src-list="srcList">
  </el-image>
      </div>-->
    
      <el-row style="text-align:left;margin-left:80px">
        <el-button type="danger" @click="reject">取消</el-button>
        <el-button type="success" @click="agree()">确定</el-button>
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
      houseInfo: {},
      List: []
    };
  },
  methods: {
      changed(name,value){
           console.log(name)
    //     this.List=this.List.concat({name:value})
    //     var json = JSON.parse(JSON.stringify(this.List).replace(/name/g,name));
    //    this.List=json
       
       
      },
    agree() {
        var houseInfo=this.houseInfo
     axios.get('/updeHouseInfo',{
         params:{
             houseInfo
         }
     })
     .then(res => {
         if(res.data.success){
              this.$router.push('/index/houseInfo')
             this.$message({
                 type:"success",
                 message:'编辑成功'
             })
         }
     })
    },
    reject() {
         this.$confirm('确定放弃本次编辑?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$router.push('/index/houseInfo')
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
    var houseInfo = this.$route.params.row;
    if(typeof(houseInfo)=='undefined'){
       var houseInfo1=localStorage.getItem('houseInfo1')
    this.houseInfo=JSON.parse(houseInfo1)
    console.log(this.houseInfo)
    }else{
       houseInfo.money = houseInfo.money + "元";
    houseInfo.area = houseInfo.area + "㎡";

    this.houseInfo = houseInfo;
    var houseInfo1=JSON.stringify(houseInfo)
    localStorage.setItem('houseInfo1',houseInfo1)
   
    }
   
  },
  mounted(){
   
  }
};
</script>
<style scoped>
</style>