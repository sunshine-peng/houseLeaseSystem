<template>
    <div>
       <section style="text-align:left">
           <h1  style="text-align:left"> 房屋类型</h1>
 
       <!-- <section style="text-align:left">
          <el-button type="success" @click="complete">全部用户 </el-button>
           <el-button type="primary" plain @click="nomalUser">正常用户</el-button>
          <el-button type="warning" plain @click="blacklistUser">黑名单用户</el-button>
       </section> -->
       <el-button type="primary" @click="addHouseType">添加房屋类型</el-button>
       </section>
       <el-table
    :data="tableData"
    style="width: 100%"
   >
    <el-table-column
     align='center'
        type="index"
        width="300"
        label="序号"
    ></el-table-column>
    <el-table-column
     align='center'
      prop="type_name"
      label="房屋类型"
      width="400">
    </el-table-column>
    
    <el-table-column
    
    align='center'
      label="操作"
      width="350">
      <div slot-scope="scope">
      <i class="el-icon-edit" @click="eidt(scope.row)"></i>
      <i class="el-icon-delete" @click="delet(scope.row)"  style="margin-left:6px;"></i>
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
      :total="this.houseType.length">
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
        
        houseType:[],
        currentPage:1,
        pageSize:4,
  
      }
    },
    computed:{
      tableData(){
        return this.houseType.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
      },
    
    },
   
    methods:{
        getHouseTypeInfo(){
            
            axios.get('/users/type',{
                params:{
                    status:0
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
                    console.log(res.data.data)
                    
                     this.houseType=res.data.data
                    

                }
               
            })
            .catch(res => {
                console.log(res)
            })
        },
        eidt(row){
            console.log('row')
            console.log(row)
            var id=row.type_id
            this.$prompt('房屋类型', '编辑房屋类型', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:row.type_name,
          center:'center'
        }).then(({ value }) => {
         axios.get('/editHouseType',{
                params:{
                   id,
                   value
                }
            })
            .then(res => {
               if(res.data.success){
                   
                this.getHouseTypeInfo()
                   this.$message({
                       type:'success',
                       message:'编辑成功'
                       })
                    
               }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消编辑'
          });       
        });
           
        },
        delet(row){
            var id=row.type_id
             this.$confirm('此操作将删除该行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
            axios.get('/deleteHousetype',{
                params:{
                    id
                }
            })
            .then(res => {
                if(res.data.success){
                   this.getHouseTypeInfo()
                      this.$message({
            type: 'success',
            message: '删除成功!'
          })
           
                }
            })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
             
        },
        addHouseType(){
             this.$prompt('房屋类型', '添加房屋类型', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
       
          center:'center'
        }).then(({ value }) => {
         axios.get('/addHouseType',{
                params:{
                  
                   value
                }
            })
            .then(res => {
               if(res.data.success){
                  this.getHouseTypeInfo()
                   this.$message({
                       type:'success',
                       message:'添加成功'
                       })
                       
               }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消编辑'
          });       
        });
           
        },
        handleSizeChange(val) {
        this.pageSize=val
      },
      handleCurrentChange(val) {
        this.currentPage=val
      }
   
    
        
    },
    created() {
       
            this.getHouseTypeInfo()
        }
  }
</script>

    
