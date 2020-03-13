var db=require('../models/mysql');
// 查询实例
db.query('select * from student', [],function(result,fields){
    console.log('查询结果：');
    console.log(result);
});
//添加实例
