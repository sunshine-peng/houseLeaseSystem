// pages/collected/collected.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseInfo:[],
    openid:'',
    from_id:[],
    
  },
  getCollectID(){
    console.log('from_id')
 
    
    wx.request({
      url:app.globalData.util.BASE_URL+ '/users/findcollect',
      data:{
        openid:app.globalData.openid
      },
      success:res =>{
        console.log(res.data)
        var from_id=[]
        res.data.data.forEach(item =>{
          console.log(item.house_id)
           from_id=from_id.concat(item.house_id)
        })
       this.setData({
         from_id:from_id
       })
       console.log('this.data.from_id')
       console.log(this.data.from_id)
        this.getHouseInfo()
      }
    })
  }
,
//获取房间信息
getHouseInfo(){
  console.log('this.data.from_id11')
console.log(this.data.from_id)
var from_id=this.data.from_id.join(',')
console.log(from_id)

  wx.request({
    url: app.globalData.util.BASE_URL+'/users/findCollectHouse',
    data:{
      from_id
    },
    success:res =>{
      console.log('222236655')
      console.log(res.data.data)
      if(res.data.data!=null){
      res.data.data.forEach(item => {
        let resImg = item.src.split(',')
        // 格式化图片路径
        // console.log('resData')
        // console.log(resImg)
        let resArr = resImg.map(value => {
          return app.globalData.util.BASE_URL + '/users/upload/' + value
        })
        item.src = resArr

        let houseGoods = item.houseGoods.split('-')
        item.houseGoods = houseGoods
       

        let typearry = item.typearry.split('-')
        item.typearry = typearry
      })
      }
     wx.setStorage({
       key: 'houseInfo',
       data: res.data.data,
     })
      
      this.setData({
        houseInfo:res.data.data
      })
    }
  })
},

//子组件选择的房间Id
myCollect(e){
console.log(e)
},

allop:function(){
  wx.redirectTo({
    url:"/pages/delCollected/delCollected"
  })
},
  /*,*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCollectID()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.getCollectID()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})