var express = require('express');
var router = express.Router();
var URL = require('url');
var User = require('./user');
var db = require('../models/mysql');
var date=require('../date/dateFormat')
var success = {
  'success': 'true'
}
//插入房屋信息
/* GET users listing. */
router.post('/houseRediste', (req, res, next) => {
  var houseInfo = req.body
  // console.log('houseInfo')
  // console.log(houseInfo)
  var date=Date.now()
  houseInfo.date=date
 
  let sql = "INSERT INTO houseresource SET ?"
  db.query(sql, houseInfo, (result) => {
    if (result) {
     
      res.json({
        success:true
      })
    } else {
     
      res.json({
        success:false,
       
      })
    }
   
  })


  // console.log("1111"+JSON.parse(JSON.stringify(userinfo)))



});
//微信显示房屋信息
router.get('/show', function (req, res, next) {
  var urlObj = URL.parse(req.url, true)

  console.log(urlObj.query)

  var qurey = urlObj.query.currentPage
  var _city = urlObj.query._city
  var money = urlObj.query.money.split('-')
  var housetype = urlObj.query.housetypes
  var houseway = urlObj.query.houseways
  if(money[0]==1500){
    money[0]=0
    money[1]=1500
  }else if(money[0]==10000){
    money[0]=10000
    money[1]=1000000
  }
  let sql
  if (_city == 0 && money == 0) {
    if (houseway == 0 && housetype == 0) {
      sql = `SELECT * FROM houseresource WHERE auditing=1 limit 0, ${qurey*5}`
    }
  }
  if (_city != 0 && money != 0) {
    if (houseway != 0 && housetype != 0) {
      sql = `SELECT * FROM houseresource WHERE typearry 
     like '%${houseway}-${housetype}%' and auditing=1 and
     _city like'${_city}%' and 
     money BETWEEN ${money[0]} and ${money[1]} limit 0, ${qurey*5} `
    }
  }
  if (_city == 0 && money == 0) {
    if (houseway != 0 && housetype != 0) {
      sql = `SELECT * FROM houseresource 
      WHERE typearry like '%${houseway}-${housetype}%' and auditing=1 
      limit 0, ${qurey*5}`
    }
  }
  if (_city == 0 && houseway == 0) {
    if (money != 0 && housetype != 0) {
      sql = `SELECT * FROM houseresource WHERE 
     typearry like '%${housetype}%' 
     and money BETWEEN ${money[0]} and 
     ${money[1]} and auditing=1 limit 0, ${qurey*5}`
    }
  }
  if (_city == 0 && housetype == 0) {
    if (money != 0 && houseway != 0) {
      sql = `SELECT * FROM houseresource WHERE
     typearry like '%${houseway}%' 
     and money BETWEEN ${money[0]} and 
     ${money[1]} and auditing=1 limit 0, ${qurey*5}`
    }
  }
  if (houseway == 0 && housetype == 0) {
    if (money != 0 && _city != 0) {
      sql = `SELECT * FROM houseresource WHERE 
     _city like '${_city}%' 
     and money BETWEEN ${money[0]} and ${money[1]} 
     and auditing=1
     limit 0, ${qurey*5}`
    }
  }
  if (money == 0 && housetype == 0) {
    if (houseway != 0 && _city != 0) {
      sql = `SELECT * FROM houseresource WHERE 
     _city like '${_city}%' 
     and typearry like '%${houseway}%' 
     and auditing=1
     limit 0, ${qurey*5}`
    }
  }
  if (money == 0 && houseway == 0) {
    if (housetype != 0 && _city != 0) {
      sql = `SELECT * FROM houseresource WHERE 
     _city like '${_city}%' 
     and typearry like '%${housetype}%' 
     and auditing=1
     limit 0, ${qurey*5}`
    }
  }
  if (_city == 0 && money == 0) {
    if (houseway == 0) {
      if (housetype != 0) {
        sql = `SELECT * FROM houseresource WHERE 
       typearry like '%${housetype}%' 
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }
  if (_city == 0 && money == 0) {
    if (housetype == 0) {
      if (houseway != 0) {
        sql = `SELECT * FROM houseresource WHERE 
       typearry like '%${houseway}%' 
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }
  if (_city == 0 && money == 0) {
    if (housetype == 0) {
      if (houseway != 0) {
        sql = `SELECT * FROM houseresource WHERE 
       typearry like '%${houseway}%' 
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }
  if (housetype == 0 && houseway == 0) {
    if (_city == 0) {
      if (money != 0) {
        sql = `SELECT * FROM houseresource WHERE 
       money BETWEEN ${money[0]} and ${money[1]} 
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }

  if (housetype == 0 && houseway == 0) {
    if (money == 0) {
      if (_city != 0) {
        sql = `SELECT * FROM houseresource WHERE 
       _city like'${_city}%' 
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }
  if (housetype != 0 && houseway != 0) {
    if (money != 0) {
      if (_city == 0) {
        sql = `SELECT * FROM houseresource WHERE 
       typearry like '%${houseway}-${housetype}%' and 
       money BETWEEN ${money[0]} and ${money[1]}  
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }
  if (housetype != 0 && houseway != 0) {
    if (_city != 0) {
      if (money == 0) {
        sql = `SELECT * FROM houseresource WHERE 
       typearry like '%${houseway}-${housetype}%' and 
       _city like'${_city}%'
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }

  if (_city != 0 && money != 0) {
    if (housetype != 0) {
      if (houseway == 0) {
        sql = `SELECT * FROM houseresource WHERE 
     typearry like '%${housetype}%' and 
     _city like'${_city}%' and
     money BETWEEN ${money[0]} and ${money[1]}  
     and auditing=1
     limit 0, ${qurey*5} `
      }
    }
  }
  if (_city != 0 && money != 0) {
    if (houseway != 0) {
      if (housetype == 0) {
        sql = `SELECT * FROM houseresource WHERE 
       typearry like '%${houseway}%' and 
       _city like'${_city}%' and
       money BETWEEN ${money[0]} and ${money[1]}  
       and auditing=1
       limit 0, ${qurey*5} `
      }
    }
  }



  console.log('qurey1')
  console.log('qurey')
  console.log(qurey.currentPage)
  console.log(urlObj.query._city)
  var houseInfo = {
    success: true,
    status: true

  }

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      if (result.length % 5 == 0) {
        houseInfo.data = result
      } else {
        houseInfo.data = result
        houseInfo.status = false
      }

      // console.log(result)
    }
    // console.log(houseInfo)
    res.send(houseInfo);

  })


  // console.log("1111"+JSON.parse(JSON.stringify(userinfo)))



});
//单个房屋的具体页面请求数据
router.get('/thing/findOne', function (req, res, next) {
  var urlobj = URL.parse(req.url, true)
  var from_id = urlobj.query.from_id
  var houseInfo = {}
  let sql = `SELECT * FROM houseresource WHERE from_id=${from_id}`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {

      // console.log(result[0])
    }
    houseInfo = JSON.stringify(result[0])
    res.send(houseInfo);

    // console.log(from_id)

    // console.log('hello')
  })

});

//房屋类型请求数据
router.get('/type', function (req, res, next) {
  // console.log('req')
  // console.log(req)
  var urlobj=URL.parse(req.url,true)
  var status=urlobj.query.status
  var typearr = []
  let sql
  if(status==0){
    sql = 'SELECT * FROM housetype'
  }else{
  sql = 'SELECT type_name FROM housetype'
  }
  
  db.query(sql, (err, result) => {
    if (err) {

    } else {
      if(status==0){
        res.json({
          success:true,
          data:result
        })
      }else{
        result.forEach(element => {
          typearr.push(element.type_name)
          success.data = typearr
          console.log(success)
          res.send(success)
        });
      }

    }
   
  })
});
//我的发布界面请求数据
router.get("/findPost", (req, res, next) => {
  var houseInfo = {
    success: true
  }
  var urlObj = URL.parse(req.url, true)
  var query1 = urlObj.query.openid
  console.log(typeof (query1))
  console.log(query1)
  let sql = `SELECT * FROM houseresource WHERE user_id='${query1}'`
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      houseInfo.data = data
      console.log(data)
    }
    res.send(houseInfo)
  })
})

//注册用户信息
router.post('/register', (req, res, next) => {
  // var urlObj=URL.parse(req.url,true).query

  var myinfo = req.body
  console.log('urlObj')
  console.log(myinfo)
  var register_time=Date.now()
  
  myinfo.register_time=register_time
  var success = {

  }
  let sql = "INSERT INTO user SET ?"
  db.query(sql, myinfo, (data, err) => {
    if (data) {
      success.success = true
    } else {
      success.success = false
    }
    res.send(success)
  })
})
router.post('/updateInfo', (req, res, next) => {
  // var urlObj=URL.parse(req.url,true).query

  var myinfo = req.body
  console.log('urlObj')
  console.log(myinfo)
  
  var update_time=Date.now()
  console.log('update_time')
  console.log(update_time)
  myinfo.update_time=update_time
  console.log(myinfo)
  var success = {

  }
  let sql = "UPDATE user SET ?"
  db.query(sql, myinfo, (data, err) => {
    if (data) {
      success.success = true
    } else {
      success.success = false
    }
    res.send(success)
  })
})

router.get('/finduser', (req, res, next) => {
  var urlObj = URL.parse(req.url, true)
  var openid = urlObj.query.openid
  // console.log('openid')
  // console.log(openid)
  var data = {}
  let sql = `SELECT * FROM user WHERE openid='${openid}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 0) {
        data.success = false
        data.data = result
        // console.log('data')
        // console.log(data)
        res.send(data)
      } else {
        data.success = true
        data.data = result[0]
        // console.log('data')
        // console.log(data)
        res.send(data)
      }

    }
  })
})

router.post('/reserve', (req, res, next) => {
  var data = req.body
  console.log(data)

  let sql = "INSERT INTO user_reserve SET ?"
  db.query(sql, data, (result) => {
    if (result) {
      res.send({
        'success': "true"
      })
    }


  })
})

//收藏功能
router.post('/collect', (req, res, next) => {
  var data = req.body
  console.log(data)
  data.time=Date.now()

  let sql = "INSERT INTO user_collect SET ?"
  db.query(sql, data, (result) => {
    if (result) {
      res.send({
        'success': "true"
      })
    }


  })
})

router.get('/findcollect', (req, res, next) => {
  var urlObj = URL.parse(req.url, true)
  var openid = urlObj.query.openid
  var data = {

  }
  let sql = `SELECT * FROM user_collect WHERE openid='${openid}'`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      data.data = result
      res.send(data)
    }
  })
})
router.get('/findCollectHouse', (req, res, next) => {
  var urlObj = URL.parse(req.url, true)
  var from_id = urlObj.query.from_id
  if(from_id.length==0){
    res.json({
      
    })
  }
  var data = {

  }
  let sql = `SELECT * FROM houseresource WHERE from_id in (${from_id})`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      // console.log(result)
      data.data = result
      res.send(data)
    }
  })
})

//取消收藏功能
router.get('/delCollected', (req, res, next) => {
  var urlObj = URL.parse(req.url, true)
  var house_id = urlObj.query.house_id
  console.log('house_id')
  console.log(house_id)
  console.log(urlObj.query)
  let sql = `DELETE FROM user_collect WHERE house_id in (${house_id})`
  console.log('data')
  db.query(sql, (err, data) => {
    if (err) {
      console.log(err)

    } else {
      console.log(data)
      res.send({
        'success': "true"
      })
    }
  })
})
router.get('/myOrder',(req,res,next) => {
  var urlObj=URL.parse(req.url,true)
  var userInfo=JSON.parse(urlObj.query.userInfo)
  console.log(userInfo)
  
  let sql=`SELECT * FROM user_order,houseresource WHERE 
  user_name='${userInfo.user_name}' and user_tel='${userInfo.user_tel}'
  and user_order.from_id=houseresource.from_id`
  db.query(sql,(err,data) => {
    if(err){
      console.log('err')
    }else if(data){
      console.log(data)
      data.forEach(item => {
        item.start_time1=date.timeFormat(item.start_time)
        item.end_time1=date.timeFormat(item.end_time)
      })
      res.json({
        success:true,
        data:data
      })
    }
  })
})

//房租支付功能
router.get('/payLease',(req,res,next) => {
  var objUrl=URL.parse(req.url,true)
  var query=objUrl.query.data
  
  var data=JSON.parse(query)
  console.log(data)
  // var date1=objUrl.query.date
  // var date2=parseInt(date1)
  // var money=objUrl.query.money
  // console.log('4444')
  // console.log(date1)
  var paytime=Date.now()
  console.log(typeof data.date)
  // if(typeof(data.date)=='string'){
  //   console.log('time11')
  //   var time=parseInt(data.date)
  //   console.log(time)
  //   // var time1=new Date(Thu Jun 11 2020 23:48:04 GMT+0800).getTime()
  //   console.log('time11')
    
  //   console.log(time1)
  // }
  

  
  var num=parseInt(data.num)
  var lease_time=date.timeFormat2(num,data.date)
  console.log(date.timeFormat(lease_time) )
  let sql=`UPDATE user_order SET lease_time='${lease_time}',
  pay_time=${paytime} , lease_money=${data.money} ,
  how_long=${num} WHERE id=${data.id} `
  db.query(sql,(err,data) =>{
    if(data){
      // console.log(data)
      res.json({
        success:true
      })
    } else if(err) {
      console.log(err)
     
    }
  })
  

})

module.exports = router;
