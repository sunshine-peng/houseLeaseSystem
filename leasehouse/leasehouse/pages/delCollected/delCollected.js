// pages/delCollected/delCollected.js
var app=getApp()
var from_id=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseInfo:[],
    house_id:''
  },
  checkboxChange: function (e) {
     from_id=from_id.concat(e.detail.value)
     console.log(from_id)
     var house_id=from_id.join(',')
     console.log(house_id)
    this.setData({
      house_id:house_id
    })
  },
  delCollected:function(){
    if(this.data.house_id.length==0){
      wx.showToast({
        title: '没有选择收藏，不可操作',
        icon:'none'
      })
      return false
    }
    console.log('this.data.house_id')
    console.log(this.data.house_id)
    wx.request({
      url: app.globalData.util.BASE_URL+'/users/delCollected',
   
    data:{
      house_id:this.data.house_id
    },
    success: res =>{
      if(res.data.success){
        wx.redirectTo({
          url: '/pages/collected/collected',
        })
        wx.showToast({
          title: '取消成功',
        })
      }
      this.onLoad()
    }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
   wx.getStorage({
     key: 'houseInfo',
     success: function(res) {
     that.setData({
       houseInfo:res.data
     })
    },
   })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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