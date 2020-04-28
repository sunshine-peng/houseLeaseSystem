var express = require('express');
var router = express.Router();
var URL = require('url');
var qs = require('qs')
var User = require('./user');
var db = require('../models/mysql');
var date = require('../date/dateFormat')

/* GET users listing. */
//登录密码验证
router.get('/denglu', (req, res, next) => {
    console.log('555')
    var objUrl = URL.parse(req.url, true)
    // console.log(objUrl)
    var query = objUrl.query.user
    var user = qs.parse(query)
    var username = user.username
    var password = user.password
    let sql = `SELECT * FROM super_user WHERE 
    super_name='${username}'`
    db.query(sql, (err, result) => {
        if (err) {
            res.json({
                success: false,
                meg: '服务器异常'
            })
        } else {
            if (result) {
                if (result.length == 0) {
                    res.json({
                        success: false,
                        meg: '用户名为空,请注册'
                    })
                } else if (password == result[0].super_password) {


                    res.json({
                        success: true,
                        meg: '登陆成功'
                    })
                } else {
                    res.json({
                        success: false,
                        meg: '登陆失败，密码错误'
                    })
                }

            }


        }
    })
})
//获取用户信息
router.get('/getUsers', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var status = objUrl.query.status
    let sql
    if (status == 0) {
        sql = `SELECT * FROM user WHERE state=${status}`
    } else if (status == 1) {
        sql = `SELECT * FROM user WHERE state=${status}`
    } else {
        sql = 'SELECT * FROM user'
    }

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else if (result) {
            console.log(result)
            res.json({
                success: true,
                data: result
            })
        }
    })
})
//修改用户的状态
router.get('/updateUser', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var user_id = objUrl.query.user_id
    console.log(user_id)
    var state = objUrl.query.state
    console.log(state)
    let sql = `UPDATE user SET state=${state} WHERE user_id=${user_id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log('err')
        } else if (result) {
            console.log('result')
            console.log(result)
            res.json({
                success: true
            })
        }
    })

})
//获取用户申请发布信息
router.get('/userpost', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var auditing = objUrl.query.auditing
    console.log('auditing')
    console.log(auditing)

    let sql = `SELECT * FROM houseresource WHERE auditing=${auditing}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else if (result) {
            res.json({
                success: true,
                data: result
            })
        }
    })
})
//审核通过请求
router.get('/auditing', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var id = objUrl.query.from_id
    console.log('id')
    console.log(id)
    var auditing = objUrl.query.auditing
    console.log('auditing')
    console.log(auditing)
    let sql = `UPDATE houseresource SET auditing='${auditing}' WHERE from_id=${id}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            res.json({
                success: true,
                msg: 'ok'
            })
        }
    })

})
//获取收藏表的数据
router.get('/collected', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var openid = objUrl.query.openid
    console.log(openid)
    let sql = `SELECT house_id,time FROM user_collect WHERE openid='${openid}'`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)

        } else if (result) {
            console.log('res222ult1')
            console.log(result)
            var arr = []
            var timearr = []
            result.forEach(item => {
                arr = arr.concat(item.house_id)
                timearr = timearr.concat(item.time)
            })
            var str = arr.join(',')
            res.json({
                success: true,
                data: str,
                time: timearr
            })
        }

    })
})
// 获取收藏人和收藏房屋的信息
router.get('/collectInfo', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var from_id = objUrl.query.from_id

    let sql = `SELECT * FROM houseresource 
    WHERE from_id in (${from_id})`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)

        } else if (result) {
            console.log('result')
            console.log(result)
            res.json({
                success: true,
                data: result
            })
        }
    })
})
//编辑房屋类型信息
router.get('/editHouseType', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var id = parseInt(objUrl.query.id)

    console.log('id')
    console.log(id)
    var type_name = objUrl.query.value
    console.log('type_name')
    console.log(type_name)
    let sql = `UPDATE housetype SET type_name='${type_name}' WHERE type_id=${id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log('err')
            console.log(err)
        } else if (result) {
            console.log('result')
            res.json({
                success: true
            })
        }
    })
})

//删除房屋类型
router.get('/deleteHousetype', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var id = objUrl.query.id
    let sql = `DELETE FROM housetype WHERE type_id=${id}`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            console.log('err')

        } else if (result) {
            console.log('result')
            res.json({
                success: true
            })
        }
    })
})
//添加房屋
router.get('/addHouseType', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var name = objUrl.query.value
    var type_name = {
        type_name: name
    }
    let sql = 'INSERT INTO housetype SET ?'
    db.query(sql, type_name, (result) => {
        if (result) {
            res.json({
                success: true
            })
            console.log('result')

        } else {

            console.log('err')


        }
    })
})
router.get('/userReserve', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var reserve_state = objUrl.query.reserve_state
    let sql = `SELECT * FROM user_reserve,houseresource 
        WHERE user_reserve.item_id=houseresource.from_id 
        and reserve_state='${reserve_state}'`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)

        } else if (data) {
            console.log(data)
            res.json({
                success: true,
                data: data
            })
        }
    })
})
router.get('/reserveAuditing', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var id = objUrl.query.id
    var reserve_state = objUrl.query.reserve_state

    sql = `UPDATE user_reserve SET reserve_state='${reserve_state}' WHERE id=${id} `
    db.query(sql, (err, result) => {
        if (err) {
            console.log('err')
            console.log(err)

        } else if (result) {
            console.log('result')
            res.json({
                success: true
            })
        }
    })
})

//编辑房屋的信息
router.get('/updeHouseInfo', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var houseInfo1 = objUrl.query.houseInfo
    var houseInfo = JSON.parse(houseInfo1)
    console.log(houseInfo)

    let sql = `UPDATE houseresource SET name='${houseInfo.name}',tel='${houseInfo.tel}'
    ,houseGoods='${houseInfo.houseGoods}',area='${houseInfo.area}',
    money='${houseInfo.money}',cellName='${houseInfo.cellName}'
    ,location='${houseInfo.location}',_city='${houseInfo._city}'
    ,typearry='${houseInfo.typearry}' WHERE from_id=${houseInfo.from_id}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log('err')
            console.log(err)
        } else if (data) {
            console.log('data')
            res.json({
                success: true
            })
        }
    })
})
router.post('/order', (req, res, next) => {
    var obj = req.body
    var orderInfo = obj.params.orderInfo
    // console.log(orderInfo)
    // console.log(obj)
    var create_time = Date.now()
    orderInfo.create_time = create_time
    console.log(orderInfo)
    let sql = 'INSERT INTO user_order SET ?'
    db.query(sql, orderInfo, (data) => {
        if (data) {
            console.log('data')
            res.json({
                success: true
            })
        } else {
            console.log('err11')

        }

    })
})
router.get('/getUsersOrder', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var state = objUrl.query.status
    let sql
    if (state == 0) {
        sql = 'SELECT * FROM user_order'
    } else {

        var user = JSON.parse(objUrl.query.user)
        sql = `SELECT * FROM user_order WHERE user_name='${user.user_name}'
        and user_tel='${user.tel}'`
    }
    db.query(sql, (err, data) => {
        if (err) {
            console.log('err')

        } else if (data) {
            data.forEach(item => {
                item.edit_start_time = new Date(item.start_time)
                item.edit_end_time = new Date(item.end_time)
                item.create_time = date.timeFormat(item.create_time)
                item.start_time = date.timeFormat(item.start_time)
                item.end_time = date.timeFormat(item.end_time)
                item.lease_time = date.timeFormat(item.lease_time)
                item.pay_time = date.timeFormat(item.pay_time)
                item.how_long = item.how_long + '个月'
                item.money = item.money + '元'
            })
            console.log(data)
            res.json({
                success: true,
                data: data
            })
        }
    })
})
//编辑订单信息
router.get('/editOrder', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var orderInfo = JSON.parse(objUrl.query.orderInfo)
    let sql = `UPDATE user_order SET user_name='${orderInfo.user_name}',
    user_tel='${orderInfo.user_tel}',from_id=${orderInfo.from_id} ,
    start_time=${orderInfo.start_time},lease_term='${orderInfo.lease_term}',
    end_time=${orderInfo.end_time} WHERE id=${orderInfo.id}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log('err')
            console.log(err)
        } else if (data) {
            console.log('data')
            res.json({
                success: true
            })
        }
    })

})
router.get('/deteteOrder', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var id = objUrl.query.id
    let sql = `DELETE FROM user_order WHERE id=${id}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            console.log('data')
            res.json({
                success: true
            })
        }
    })
})
router.get('/findOrder', (req, res, next) => {
    var objUrl = URL.parse(req.url, true)
    var user = JSON.parse(objUrl.query.user)
    console.log(user)
    let sql
    if (user.id_input != null && user.id_input != '') {
        console.log('777')
        sql = `SELECT * FROM user_order WHERE id=${user.id_input}`
    }else if(user.from_id_input != null && user.from_id_input !=''){
        if(user.name_input != '' && user.tel_input == ''){
            sql = `SELECT * FROM user_order WHERE user_name LIKE '%${user.name_input}%'
            and from_id=${user.from_id_input}`
        }else if(user.name_input==''&&user.tel_input!=''){
            sql = `SELECT * FROM user_order WHERE user_tel='${user.tel_input}'
            and from_id=${user.from_id_input}`
        }else if(user.name_input==''&&user.tel_input==''){
            sql = `SELECT * FROM user_order WHERE from_id=${user.from_id_input}`
        }
    } else if (user.name_input != '' && user.tel_input != '') {
        console.log('666')
        sql = `SELECT * FROM user_order WHERE user_name LIKE '%${user.name_input}%'
    and user_tel='${user.tel_input}' `
    } else if (user.name_input != '' && user.tel_input == '') {
        console.log('999')
        sql = `SELECT * FROM user_order WHERE user_name LIKE '%${user.name_input}%'`
    } else if(user.name_input==''&&user.tel_input!=''){
        console.log('888')
        sql = `SELECT * FROM user_order WHERE user_tel='${user.tel_input}'`
    } else{
        sql ='SELECT * FROM user_order'
    }
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
        } else if (data) {
            data.forEach(item => {
                item.edit_start_time = new Date(item.start_time)
                item.edit_end_time = new Date(item.end_time)
                item.create_time = date.timeFormat(item.create_time)
                item.start_time = date.timeFormat(item.start_time)
                item.end_time = date.timeFormat(item.end_time)
                item.lease_time = date.timeFormat(item.lease_time)
                item.pay_time = date.timeFormat(item.pay_time)
                item.how_long = item.how_long + '个月'
                item.money = item.money + '元'
            })
            console.log(data)
            res.json({
                success: true,
                data: data
            })
        }
    })
})
module.exports = router;