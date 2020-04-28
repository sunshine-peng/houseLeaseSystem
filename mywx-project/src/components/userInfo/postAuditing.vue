<template>
  <div>
    <section class="form-style">
    <el-form :label-position="labelPosition" label-width="80px" :model="houseInfo">
      <el-form-item label="姓名">
        <el-input v-model="houseInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="houseInfo.tel"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="houseInfo._city"></el-input>
      </el-form-item>
      <el-form-item label="房型">
        <el-input v-model="houseInfo.typearry"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="houseInfo.location"></el-input>
      </el-form-item>
      <el-form-item label="房租">
        <el-input v-model="houseInfo.money"></el-input>
      </el-form-item>
      <el-form-item label="面积">
        <el-input v-model="houseInfo.area"></el-input>
      </el-form-item>
      <el-form-item label="房屋设施">
        <el-input v-model="houseInfo.houseGoods"></el-input>
      </el-form-item>
      <el-form-item label="小区">
        <el-input v-model="houseInfo.cellName"></el-input>
      </el-form-item>
      <el-form-item label="起租日期">
        <el-input v-model="houseInfo.time"></el-input>
      </el-form-item>
      <el-form-item label="房屋图片" style="text-algin:left;">
       <div class="demo-image__preview demo-image__position " >
         <!-- <div class="image-position"> -->
  <el-image 
    style="width: 150px; "
    :src="mainImg" 
    :preview-src-list="srcList"
    class="image-position"
    >
  </el-image>
  <!-- </div> -->
</div>
</el-form-item>
      <!-- <div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="houseInfo.src" 
    :preview-src-list="srcList">
  </el-image>
      </div>-->
      <el-row style="text-align:left;margin:20px 80px">
        <el-button type="danger" @click="reject">审核拒绝</el-button>
        <el-button type="success" @click="agree">审核通过</el-button>
      </el-row>
    </el-form>
    
    </section>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      labelPosition: "right",
      houseInfo: {},
     
    };
  },
   computed:{
   mainImg:function(){
      let url= this.houseInfo.src.slice(0,1)
     
      return url[0]
    },
    srcList:function(){
      return this.houseInfo.src.slice(0)
    }
  },
  methods: {
    agree() {
      var id = this.houseInfo.from_id;
      console.log(id)
      var auditing = 1;
      axios
        .get("/auditing", {
          params: {
            from_id: id,
            auditing: auditing
          }
        })
        .then(res => {
          if (res.data.success) {
            if (res.data.success) {
              this.$message('操作成功')
              this.$router.push('/index/userPost')

            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    reject() {
        var id = this.houseInfo.from_id;
      var auditing = 2;
      axios
        .get("/auditing", {
          params: {
            from_id: id,
            auditing: auditing
          }
        })
        .then(res => {
            console.log(res)
          if (res.data.success) {
             
             this.$message('操作成功')
              this.$router.push('/index/userPost')
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
    var houseInfo = this.$route.params.houseInfo;
    if(typeof(houseInfo)=='undefined'){
      var houseInfoAuditing=localStorage.getItem('houseInfoAuditing')
      this.houseInfo=JSON.parse(houseInfoAuditing)
    }else{
       houseInfo.money = houseInfo.money + "元";
       houseInfo.area = houseInfo.area + "㎡";
       this.houseInfo = houseInfo;
       var houseInfoAuditing=JSON.stringify(houseInfo)
       localStorage.setItem('houseInfoAuditing',houseInfoAuditing)
    }
   
  }
};
</script>
<style scoped>
.form-style{
  margin: auto;
  width: 500px;
  height: auto;
  padding: 20px;
  border: 2px solid #ccc;
  box-shadow: 2px 2px 5px #ccc,-2px -2px 5px #ccc;}
  .demo-image__position{
    
    padding: 0 20px;
    width: 150px;
    height: 150px;
    position: relative;
    left: -113px;
    margin: 0;
    display: inline-block;
    border: 1px solid #ccc;
  }
  .image-position{
   
   
    /* position: absolute;
   
    top: 50%;
    transform: translateY(-50%); */
    margin-top: 15px;
  }
</style>