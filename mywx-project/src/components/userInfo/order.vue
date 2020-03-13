<template>
  <div>
    <section class="user_title">
      <h1>用户订单信息</h1>
    </section>
    <el-form  style="text-align:left;">
      <el-input style="width:150px;" placeholder="请输入用户编号" v-model="user.id_input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input style="width:150px;" placeholder="请输入房屋编号" v-model="user.from_id_input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input style="width:120px;" placeholder="请输入姓名" v-model="user.name_input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input style="width:120px;" placeholder="请输入电话" v-model="user.tel_input">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" @click="selectOrder">查询</el-button>
      <el-button type="primary" @click="add" style="float:right;">添加订单</el-button>
    </el-form>
    <!-- <section style="text-align:left">
          <el-button type="success" @click="complete">全部用户 </el-button>
           <el-button type="primary" plain @click="nomalUser">正常用户</el-button>
          <el-button type="warning" plain @click="blacklistUser">黑名单用户</el-button>
    </section>-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" type="index" width="50" label="序号"></el-table-column>
      <el-table-column align="center" prop="from_id" label="房屋编号" width="100"></el-table-column>
      <el-table-column align="center" prop="user_name" label="用户姓名" width="100"></el-table-column>
      <el-table-column align="center" prop="user_tel" label="用户电话" width="120"></el-table-column>
      <el-table-column align="center" prop="lease_money" label="所交租金" width="80"></el-table-column>
      <el-table-column align="center" prop="lease_term" label="续租时长" width="80"></el-table-column>
      <el-table-column align="center" prop="lease_term" label="租期时长" width="80"></el-table-column>
      <el-table-column align="center" prop="how_long" label="续租时长" width="80"></el-table-column>
      <el-table-column align="center" prop="create_time" label="订单创建时间" width="140"></el-table-column>
      <el-table-column align="center" prop="start_time" label="起租时间" width="140"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间" width="140"></el-table-column>
      <el-table-column align="center" prop="lease_time" label="房屋到租时间" width="140"></el-table-column>
      <el-table-column align="center" prop="pay_time" label="交租租时间" width="140"></el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="110">
        <div slot-scope="scope">
          <i class="el-icon-edit" @click="eidt(scope.row)"></i>
          <i class="el-icon-delete" @click="delet(scope.row.id)" style="margin-left:6px;"></i>
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
        :total="this.OrderInfo.length"
      ></el-pagination>
    </div>
  </div>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      OrderInfo: [],
      currentPage: 1,
      pageSize: 3,
      status: 0,
      user: {
        id_input: null,
        name_input: "",
        tel_input: "",
        from_id_input:null
      }
    };
  },
  computed: {
    tableData() {
      return this.OrderInfo.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },

  methods: {
    add(){
       this.$router.push({
        name: "userOrder",
        params: {
          isshow:false
        }
      });
    },
    selectOrder(){
    var user=this.user
    axios.get('/findOrder',{
      params:{
        user
      }
    })
    .then( res => {
      if(res.data.success){
        this.OrderInfo=res.data.data
      }
    })
    },
    getOrderInfo(status, user) {
      axios
        .get("/getUsersOrder", {
          params: {
            status: status,
            user: user
          }
        })
        .then(res => {
          if (res.data.success) {
            console.log(res.data);
            this.OrderInfo = res.data.data;
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    eidt(row) {
      console.log("editrow");
      console.log(row);
      this.$router.push({
        name: "userOrder",
        params: {
          row,
           isshow:true
        }
      });
    },
    delet(id) {
      console.log("detetrow");

      axios
        .get("/deteteOrder", {
          params: {
            id
          }
        })
        .then(res => {
          if (res.data.success) {
            this.getOrderInfo(this.status);
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        });
    },
   
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  created() {
    this.getOrderInfo(this.status);
  }
};
</script>

    
