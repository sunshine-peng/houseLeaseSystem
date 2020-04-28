// pages/find/find.js
let app = getApp()

// console.log("app")
// console.log(app)
var QQMapWX = require('../../lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
var qqmapsdk;


Page({

  /**
   * 页面的初始数据
   */
  data: {

    // items1:[],
    items: [

      {
        value: '衣柜'
      },
      {
        value: '露台',
      },
      {
        value: '沙发'
      },
      {
        value: '阳台'
      },
      {
        value: '空调'
      },
      {
        value: '电视'
      },
      {
        value: '冰箱'
      },
      {
        value: '煤气'
      },
      {
        value: '厨房'
      },
      {
        value: '宽带'
      },
      {
        value: '电磁炉'
      },
      {
        value: '微波炉'
      },
      {
        value: '电烤箱'
      },
      {
        value: '洗衣机'
      },
      {
        value: '热水器'
      },
      {
        value: '卫生间'
      },
      {
        value: '单人床'
      },
      {
        value: '双人床'
      },
      {
        value: '写字台'
      },
      {
        value: '无线网'
      },
      {
        value: '洗衣房'
      },
    ],
    multiIndex: [0, 0],
    multiArray: [
      ['整租', '合租'],
      []
    ],
    houseGoods: '',

    picList: [], // 本地选取文件 创建的 临时网络路径
    imgsList: [], // 上传成功返回图片路径，拼接成的图片路径数组
    province: '',
    form_info: '',
    city: '',
    latitude: '',
    longitude: '',
    defaults: '请选择',
    typearry: "",
    dates: "2020-01-01",
    _city: "",
    fromvalues: {}
  },
  bindDateChange: function(e) {
    console.log('e.detail.value')
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },

  checkboxChange: function(e) {
    var hosueGoods = e.detail.value.join('-')

    this.setData({
      houseGoods: hosueGoods
    })
  },
  /*户型*/
  bindPickerChange: function(e) {
    if (e.detail.value) {
      this.setData({
        defaults: this.data.array[e.detail.value].type_name,

      })
    }
  },

  chooseImage() { // 点击选择图片小图标
    var that = this
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths)

        const images = that.data.picList.concat(res.tempFilePaths)
        console.log(images)
        that.setData({
          picList: images.length <= 4 ? images : images.slice(0, 4)
        })
      },
    })
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    var default1 = this.data.multiArray[0][e.detail.value[0]]
    var default2 = this.data.multiArray[1][e.detail.value[1]]

    this.setData({
      defaults: default1 + '-' + default2
    })
  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', this.data.multiArray[e.detail.column][e.detail.value], '，值为', e.detail.value);

    this.setData({

    })
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = this.data.multiArray[1];

            break;

        }
        data.multiIndex[1] = 0;

        break;

    }
    this.setData(data);
  },
  handleImagePreview(e) { // 点击上传的缩略预览图 全屏显示界面
    const idx = e.currentTarget.dataset.idx
    const picList = this.data.picList
    wx.previewImage({
      current: picList[idx], //当前预览的图片
      urls: picList, //所有要预览的图片
    })
  },
  chooseImageCancel(e) { // 点击图片上的删除按钮取消选择图片
    const idx = e.currentTarget.dataset.idx
    const picList = this.data.picList

    picList.splice(idx, 1) //从数组中删除index下标位置，指定数量1，返回新的数组
    this.setData({
      picList
    })
  },
  /**城市定位 */
  bindlocation: function() {
    let vm = this
    wx.getSetting({
      success(res) {
        // console.log(JSON.stringify(res))

        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {

          console.log(res.authSetting)
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {

                console.log('dataAu')
                wx.openSetting({

                  success(dataAu) {
                    console.log(dataAu)
                    if (dataAu.authSetting["scope.userLocation"] == true) {

                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();

        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {

        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude,
          _city: city
        })

      },
      fail: function(res) {
        // console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },

  /*
  提交表单
  */
  handleSubmit: function(e) {

    let _fromvalues = e.detail.value
    //验证是否注册
    if (!app.globalData.hasRegister) {
      wx.showToast({
        title: '信息未完善，不能使用发布功能',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //验证受否被拉黑


    if (app.globalData.myInfo.state == 0) {
      wx.showToast({
        title: '你已被拉黑，不能使用发布功能',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //验证名字
    if (!/^((?![\u3000-\u303F])[\u2E80-\uFE4F]|\·)*(?![\u3000-\u303F])[\u2E80-\uFE4F](\·)*$/.test(_fromvalues.name)) {
      wx.showToast({
        title: '请输入正确的名字',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //验证电话
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(_fromvalues.tel)) {
      wx.showToast({
        title: '请输入正确格式的电话号码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //验证租金不能为空
    if (_fromvalues.money.length == 0) {
      wx.showToast({
        title: '租金不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    //验证面积不能为空
    if (_fromvalues.area.length == 0) {
      wx.showToast({
        title: '面积不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    _fromvalues.user_id = wx.getStorageSync("userInfo").openid
    _fromvalues.time = this.data.dates
    _fromvalues.houseGoods = this.data.houseGoods
    _fromvalues._city = this.data._city
    _fromvalues.auditing = 0
    _fromvalues.typearry = this.data.defaults
   
    // console.log('_fromvalues.src')
    // console.log(_fromvalues.src)


    // console.log(_fromvalues)
    const _this = this
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    console.log(_this.data.picList)
    console.log('this.data.picList')
    for (var i = 0; i < _this.data.picList.length; i++) {
      wx.uploadFile({
        url: app.globalData.util.BASE_URL + '/users/uploadImage',
        filePath: _this.data.picList[i],
        name: 'pic',
        success: (res) => {
          console.log(res)
          var resData = JSON.parse(res.data)
          if (resData.success) {
            _this.data.imgsList.push(resData.downUrl)
          }
          //  console.log('999999')
          if (_this.data.picList.length == _this.data.imgsList.length) {
            console.log(_this.data.imgsList.length)
            console.log('999999')
            _fromvalues.src = _this.data.imgsList.join(',')
            console.log('_fromvalues.src99')
            console.log(_fromvalues.src)
       
    console.log('_fromvalues.src')
    console.log(_fromvalues.src)
    wx.request({
      method: 'post',
      url: 'http://127.0.0.1:3002/users/houseRediste',
      data: _fromvalues,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log('this')
        console.log(res)
        if (res.data.success) { // 上传成功
          wx.hideLoading()
          // var items=_this.data.items.forEach(item => {
          //   return item.checked =item.checked=='true'?false:false

          // })
          // console.log('items')
          // console.log(items)
          
          _this.setData({ // 清除图片和表单数据
            imgsList: [],
            picList: [],
            check: false,
            form_info: '',
            defaults: '请选择'
          })
          this.onLoad()
          wx.showToast({
            title: '发布成功，等待审核',
            icon: 'success',
            duration: 2000,
            success() {
            
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }, 1000)
            }
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    qqmapsdk = new QQMapWX({
      key: 'LWGBZ-SEYCF-OIYJF-N75FC-FMO2Q-CJBMJ' //这里自己的key秘钥进行填充
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getTypes()
  },


  //获取房屋类型
  getTypes() {

    wx.request({
      method: 'get',
      url: app.globalData.util.BASE_URL + "/users/type",
      data: {},
      success: res => {
        console.log('res88s')
        console.log(res.data)

        if (res.data.success) {

          this.data.multiArray[1] = this.data.multiArray[1].concat(res.data.data)
          var arry = this.data.multiArray
          console.log('arry888')
          console.log(arry)


          this.setData({
            multiArray: arry
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {

      },
    })

    let vm = this;
    vm.bindlocation();
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