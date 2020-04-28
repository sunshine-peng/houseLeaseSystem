//index.js
//获取应用实例
const app = getApp()
// console.log("app")
// console.log(app)


Page({
  data: {
    swiperCurrent: 0,
    houseInfo: [],
    status: true,
    indicatorDots: true,

    autoplay: true,

    interval: 3000,

    duration: 800,

    circular: true,

    imgUrls: [

      'https://p3.pstatp.com/large/43700001e49d85d3ab52',

      'https://p3.pstatp.com/large/39f600038907bf3b9c96',

      'https://p3.pstatp.com/large/31fa0003ed7228adf421'

    ],
    selectArray: [{
        "id": "",
        "text": "0"
      }, {
        "id": "21",
        "text": "南昌"
      },
      {
        "id": "22",
        "text": "九江"
      },
      {
        "id": "23",
        "text": "宜春"
      },
      {
        "id": "24",
        "text": "新余"
      }
    ],
    currentPage: 1,
    bottomText: "",
    _city:'',
    housetypes:'',
    houseways:'',
    money:'',
   housetype: [
     {
       text:'0'},

      {
        id: 0,
        text: "1居"
      },
      {
        id: 1,
        text: "2居"
      },
      {
        id: 2,
        text: "3居"
      },
      {
        id: 3,
        text: "4居"
      }
      
    ],
    rental: [

      {
        id: 0,
        text: "0"
      },
      {
        id: 1,
        text: "1500元以下"
      },
      {
        id: 2,
        text: "1500-2500元"
      },
      {
        id: 3,
        text: "2500-4000元"
      },
      {
        id: 4,
        text: "4000-6000元"
      },
      {
        id: 5,
        text: "6000-8000元"
      },
      {
        id: 6,
        text: "8000-10000元"
      },
      {
        id: 7,
        text: "10000元以上"
      },
    ],
    houseway: [
      {
        id: 0,
        text:'0'
      }
      ,{
        id: 1,
        text: "整租"
      },
      {
        id: 2,
        text: "合租"
      }
      
    ],
    links: [

      '../user/user',

      '../user/user',

      '../user/user'

    ]



  },
  //轮播图的切换事件

  swiperChange: function(e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击指示点切换

  chuangEvent: function(e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function(e) {

    // console.log(this.data.swiperCurrent);

    wx.switchTab({

      url: this.data.links[this.data.swiperCurrent]

    })

  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    var status=0
    this.getHouseType(status)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getHouseType(status){
    wx.request({
      url: app.globalData.util.BASE_URL+'/users/type',
      data:{
        status
      },
      success:res => {
        if(res.data.success){
          // console.log(res)
          var housetype=[{
            text:'0'
          }]
          // var arr=[]
          // var obj={text:''}
          // res.data.data.forEach((item,index) => {
          //   obj.text=item.type_name
          //   console.log(obj)
          //  arr=arr.concat(obj)
          // })
          // console.log(arr)
          var json = JSON.parse(JSON.stringify(res.data.data).replace(/type_name/g, "text"));
// console.log(json)
           var housetype1=housetype.concat(json)
          //  console.log('housetype')
          //  console.log(housetype1)
          this.setData({
            housetype:housetype1
          })
        }
      }
    })
  },
  gethouseInfo() {
    let data = {
      currentPage: this.data.currentPage,
      _city:this.data._city,
      houseways:this.data.houseways,
      housetypes:this.data.housetypes,
      money:this.data.money
    }

    wx.request({

      url: 'http://127.0.0.1:3002/users/show',
      // url: app.globalData.util.BASE_URL +'/users/show',
      data,
      success: res => {
        if (res.data.success) {
          this.setData({
            status: res.data.status
          })
          if(res.data.data.length!=0){
          res.data.data.forEach(item => {
            let resImg = item.src.split(',')
            // 格式化图片路径
            // console.log('resData')
            // console.log(resImg)
            let resArr = resImg.map(value => {
              return app.globalData.util.BASE_URL + '/users/upload/' + value
            })
            item.src = resArr
          
            // console.log('resImage')
            // console.log(resImg)
            // item.src = app.globalData.util.BASE_URL+'/users/up' +resImg
            item.isshow=true
            let houseGoods = item.houseGoods.split('-')
            item.houseGoods = houseGoods

            let typearry = item.typearry.split('-')
            item.typearry = typearry
          })
          }
          // var houseGoods = res.data.data.houseGoods.split('-')
          // res.data.data.houseGoods=houseGoods
          // var typearry = res.data.data.typearry.split('-')
          // res.data.data.typearry=typearry

          console.log('res.data.data')
          console.log(res.data.data)
          if (res.data.data.length < 5) {
            this.setData({
              houseInfo: res.data.data,
              bottomText: "暂时没有更多数据哦"
            })
          }
          if (res.data.data.length == 0) {
            this.setData({
              houseInfo: res.data.data,
              bottomText: "没有数据哦"
            })
          } else {
            this.setData({
              houseInfo: res.data.data,

            })
          }
        }
      },
      fail: res => {
        this.setData({
          bottomText: '请求数据失败'
        })
      }
    })
  },
  getHouaeType:function(e){

var housetypes=e.detail.nowData.nowText
this.setData({
  goodsInfo: [],
  bottomText: '加载更多...',
  housetypes:housetypes
})
this.gethouseInfo()
  },
  getRental:function(e){
    var money = e.detail.nowData.nowText
    var mo=money.split('元')
   this.setData({
     houseInfo: [],
     bottomText: '加载更多...',
     money:mo[0]
   })
    this.gethouseInfo()
  },
  getHouseWay:function(e){
    var houseways = e.detail.nowData.nowText
    this.setData({
      goodsInfo: [],
      bottomText: '加载更多...',
      houseways: houseways
    })
    this.gethouseInfo()
  },
  getCity: function(e) {
    var city = e.detail.nowData.nowText
    this.setData({
      goodsInfo: [],
      bottomText: '加载更多...',
      _city:city
    })
    this.gethouseInfo()
  },
  onShow: function() {
    this.setData({
      houseInfo: [],
      bottomText: '加载更多...',
      currentPage: 1
    })
    this.gethouseInfo()
    // let house={}
    // wx.request({
    //   url: 'http://127.0.0.1:3002/users/show',
    //   data:{},
    //   success:res=>{
    //     // console.log('res')
    //     // console.log(res)
    //     res.data.forEach(item=>{
    //       let resImg=item.src.split(',')
    //       // console.log('resImage')
    //       // console.log(resImg)
    //        item.src=resImg
    //     })
    //     //  console.log('res')
    //     // console.log(res)
    //     this.setData({
    //       houseInfo:res.data
    //     })
    //   }
    // })

  },
  onReachBottom: function() {
    if (this.data.status) {
      this.setData({
        currentPage: this.data.currentPage + 1,

      })
    } else {
      this.setData({
        bottomText: "没有更多数据了"
      })
    }
    this.gethouseInfo()
  }
})