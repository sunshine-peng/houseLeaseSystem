// pages/myPost/myPost.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseInfo: [],
    houseAuditing:[],
    postShow:true,
    auditingShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getHouseInfo()
  },
  post:function(){
    this.setData({
      postShow:true,
      auditingShow:false
    })
  },
  auditing:function(){
    this.setData({
      postShow: false,
      auditingShow: true
    })
  },
  
  //获取发布的(数据
  getHouseInfo() {
    var data = {
      openid: app.globalData.openid
    }

    wx.request({
      url: app.globalData.util.BASE_URL + '/users/findPost',
      data,
      success: res => {
        var houseAdutiting=[]
        var houseInfo=[]
        if (res.data.success) {
          res.data.data.forEach(item => {
            if(item.auditing==1){
              houseInfo=houseInfo.concat(item)
            }else{
              houseAdutiting=houseAdutiting.concat(item)
            }
           
          })
            houseInfo.forEach(item => {
              let resImg = item.src.split(',')
              // 格式化图片路径
              // console.log('resData')
              // console.log(resImg)
              let resArr = resImg.map(value => {
                return app.globalData.util.BASE_URL + '/users/upload/' + value
              })
              item.src = resArr
            })
            houseAdutiting.forEach(item => {
              let resImg = item.src.split(',')
              // 格式化图片路径
              // console.log('resData')
              // console.log(resImg)
              let resArr = resImg.map(value => {
                return app.globalData.util.BASE_URL + '/users/upload/' + value
              })
              item.src = resArr
            })
          this.setData({
            houseInfo: houseInfo,
            houseAuditing:houseAdutiting
          })
        }

      }
    })
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