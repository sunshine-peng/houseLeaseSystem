// pages/houseDetail/houseDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoucang:false,
    stopshoucang:false,
    houseInfo: {},
    userInfo:[],
    from_id: '',
    openid: '',
    //日期
    timeList: [],
    //可预约天数
    yyDay: 30,
    //预约时间段
    hourList: [{
        hour: "8:00",
        n: 8,
        isShow: true
      },
      {
        hour: "9:00",
        n: 9,
        isShow: true
      },
      {
        hour: "10:00",
        n: 10,
        isShow: true
      },
      {
        hour: "12:00",
        n: 11,
        isShow: true
      },
      {
        hour: "13:00",
        n: 13,
        isShow: true
      },
      {
        hour: "14:00",
        n: 14,
        isShow: true
      },
      {
        hour: "15:00",
        n: 15,
        isShow: true
      },
      {
        hour: "16:00",
        n: 16,
        isShow: true
      },
      {
        hour: "17:00",
        n: 17,
        isShow: true
      },
      {
        hour: "18:00",
        n: 18,
        isShow: true
      },
      {
        hour: "19:00",
        n: 19,
        isShow: true
      }
    ],
    //是否显示
    timeShow: false,
    currentTab: 0,
    //选择时间
    chooseHour: "",
    //选择日期
    chooseTime: "",
    hourIndex: -1,
    //预约时间
    yyTime: '',
    reserve_state:1
  },
  //弹出按钮
  showTimeModel: function() {
    console.log('this.data.timeList[0].date')
    // console.log(this.data.timeList[0])
    this.setData({
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
  },
  //点击外部取消
  modelCancel: function() {
    this.setData({
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
  },
  //预约看房
  modelReserve: function() {
    if (app.globalData.hasRegiter) {
      wx.showModal({
        title: '提示',
        content: '请完善个人信息',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/myInfo/myInfo',
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '信息不完整不能使用预约功能',
              icon: "none",
              duration: 2000
            })
            return false
          }
        }
      })

    } else if (app.globalData.myInfo.state == 0){
      wx.showModal({
        title: '提示',
        content: '你已被拉黑，咱不能使用预约功能',
        confirmColor: '#eaeaea',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/service/service'
            })
          }
        }
      })
    }else {
     
      //预约表的信息插入
      var data={}
      data.item_id=this.data.from_id
      data.user_name=this.data.userInfo.nickname
      data.user_tel=this.data.userInfo.tel
      data.reserve_time=this.data.yyTime
      data.reserve_state = this.data.reserve_state
      wx.request({
        method:'post',
        url: app.globalData.util.BASE_URL + '/users/reserve',
        data,
        success:res =>{
          if(res.data.success){
            wx.showToast({
              title: '预约提交成功',
              icon: 'success',
              duration: 2000
            })
            
          }
        
        }
      })
      var chooseTime = this.data.yyTime
      if (chooseTime.length == 0) {
        wx.showToast({
          title: '请选择一个看房时间',
          icon: 'none',
          duration: 2000
        })
        return false
      } else {
        

      }

      this.setData({
        timeShow: !this.data.timeShow,

      });
    }
  },

  //拨打电话
  btnCall:function(){
 var that=this
 wx.makePhoneCall({
   phoneNumber: '18270501583',
 })
  },
  //收藏
 collect:function(){
   this.setData({
     shoucang:true
   })
   console.log('stopshoucang')
   console.log(this.data.stopshoucang)
   if(this.data.stopshoucang==true){
     wx.showToast({
       title: '已收藏',
       icon:'none',
       duration:2000
     })
     return false
   }
   console.log('5652')
   console.log(app.globalData.openid)
   wx.request({
     method:'post',
     url: app.globalData.util.BASE_URL+'/users/collect',
     data:{
       house_id:this.data.from_id,
       openid:app.globalData.openid
     },
     success:res =>{
       console.log('88995')
       if(res.data.success){
         wx.showToast({
           title: '收藏成功',
           duration:2000
         })
       }
     }
   })
  },
  //日期选择
  timeClick: function(e) {
    console.log('exx')
    console.log(e)
    //非今天-不判断过当前时间点(所有时间点都可选择)
    if (e.currentTarget.dataset.index != 0) {
      var list = this.data.hourList;
      for (var i = 0; i < list.length; i++) {
        list[i].isShow = true;
      }
      this.setData({
        hourList: list
      })
    } else {
      //今天-过时不可预约
      var hour = new Date().getHours();

      for (var i = 0; i < this.data.hourList.length; i++) {
        var list = this.data.hourList;
        if (this.data.hourList[i].n <= hour) {
          console.log('222n')
          console.log(this.data.hourList[i].n)
          list[i].isShow = false;
          this.setData({
            hourList: list
          })
        }
      }
    }
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      yyTime: '',
      chooseHour: "",
      hourIndex: -1
    });
    console.log(this.data.chooseTime)
  },
  // 时间选择
  hourClick: function(e) {
    console.log('e.currentTarget.dataset.index')
    console.log(e.currentTarget.dataset)
    var that = this;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      hourIndex: e.currentTarget.dataset.index,
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,

    });
    var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
    this.setData({
      yyTime: chooseTime
    })
    console.log('chooseTime')
    console.log(chooseTime)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
    this.setData({
      from_id: options.from_id,
      openid: app.globalData.openid
     
    
    })
    
    this.getDate()
    this.getHouseInfoById(options.from_id)
    this.getUserInfo()
  },
  //获取日期
  getDate(){
    Date.prototype.Format = function (format) {
      var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
    Date.prototype.DateAdd = function (interval, number) {
      number = parseInt(number);
      var date = new Date(this.getTime());
      switch (interval) {
        case "y":
          date.setFullYear(this.getFullYear() + number);
          break;
        case "m":
          date.setMonth(this.getMonth() + number);
          break;
        case "d":
          date.setDate(this.getDate() + number);
          break;
        case "w":
          date.setDate(this.getDate() + 7 * number);
          break;
        case "h":
          date.setHours(this.getHours() + number);
          break;
        case "n":
          date.setMinutes(this.getMinutes() + number);
          break;
        case "s":
          date.setSeconds(this.getSeconds() + number);
          break;
        case "l":
          date.setMilliseconds(this.getMilliseconds() + number);
          break;
      }
      return date;
    }



    var dateList = [];
    var now = new Date();
    for (var i = 0; i < this.data.yyDay; i++) {
      var d = {};
      var day = new Date().DateAdd('d', i).getDay();
      if (day == 1) {
        var w = "周一"
      }
      if (day == 2) {
        var w = "周二"
      }
      if (day == 3) {
        var w = "周三"
      }
      if (day == 4) {
        var w = "周四"
      }
      if (day == 5) {
        var w = "周五"
      }
      if (day == 6) {
        var w = "周六"
      }
      if (day == 0) {
        var w = "周日"
      }
      d.name = w;
      d.date = new Date().DateAdd('d', i).Format("MM-dd");
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });
    //初始化判断
    //当前时间
    var hour = new Date().getHours();

    for (var i = 0; i < this.data.hourList.length; i++) {
      var list = this.data.hourList;
      //过时不可选
      if (this.data.hourList[i].n <= hour) {
        list[i].isShow = false;
        this.setData({
          hourList: list,

        })
      }
    }

  },
  //获取用户信息
  getUserInfo(){
    if(app.globalData.hasRegister){
      wx.request({
        url: app.globalData.util.BASE_URL + '/users/finduser',
        data: {
          openid: app.globalData.openid
        },
        success: res => {
          if (res.data.success) {
            console.log('res.data.data')
            console.log(res.data.data)
            this.setData({
              userInfo: res.data.data
            })
          }
        }
      })
    }
  },
  getHouseInfoById(from_id) {
    wx.request({
      url: 'http://127.0.0.1:3002/users/thing/findOne',
      data: {
        from_id
      },
      success: res => {
        console.log('5555')

        let resImg = res.data.src.split(',')
        res.data.src = resImg

        let typearry = res.data.typearry.split('-')
        res.data.typearry = typearry
        let houseGoods = res.data.houseGoods.split('-')
        res.data.houseGoods = houseGoods
        console.log(res.data)
        this.setData({
          houseInfo: res.data
        })

      }
    })
  },

  house: function() {
    console.log("house")
    console.log(this.houseInfo)
    console.log(this.from_id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.getStorage({
      key: 'houseInfo',
      success: function (res) {
        console.log(res)
        console.log('555555484')
        console.log(res.data)
        if (res.data == null) {
          that.setData({
            shoucang: false,
            stopshoucang: false
          })
        } else {
          res.data.forEach(item => {
            if (item.from_id == that.data.from_id) {
              that.setData({
                shoucang: true,
                stopshoucang: true
              })
            }
          })
        }

      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})