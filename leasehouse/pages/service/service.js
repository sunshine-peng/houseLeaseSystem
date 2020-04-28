// pages/service/service.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   piclist:[],
   imglist:[]
   
  },
  // test: function () {
  //   var nowdate = Date.now()
  //   var date = new Date(nowdate)
  //   console.log('nowdate')
  //   console.log(nowdate)
  //   console.log('date')
  //   console.log(date)
  // },
  chooseImage(){
    // console.log(this)
  var that=this
    wx.chooseImage({
      count:4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res.tempFilePaths)
      
        const images = that.data.piclist.concat(res.tempFilePaths)
        console.log(images)
       that.setData({
          piclist:images.length<=4?images:images.slice(0,4)
        })  
      },
    })
  },

  handleData(e){
    for(var i=0;i<this.data.piclist.length;i++){
      wx.uploadFile({
        url: app.globalData.util.BASE_URL+'/users/uploadImage',
        filePath: this.data.piclist[i],
        name: 'pic',
        success:(res)=>{
          console.log(res)
          var resData=JSON.parse(res.data)
          if(resData.success){
            this.data.imglist.push(resData.downUrl)
          }
          if(this.data.piclist.length==this.data.imglist.length){
            console.log(this.data.imglist.length)
            console.log('999999')
          }
        }
      })
    }

  },
  /**
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