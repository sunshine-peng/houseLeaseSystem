// pages/userOrder/userOrder.js
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  orderInfo:[],
  currentInfo:{},
  isshow:false,
 
  },  
  message(data){
    wx.showModal({
      title: '温馨提示',
      content: '您确定要完成本次付款吗？',
      success: res => {
        if (res.confirm) {
          this.payLease(data)
         
          // wx.navigateTo({
          //   url: '/pages/userOrder/userOrder',
          // })
        
        } else if (res.cancel) {
          wx.showToast({
            title: '取消支付',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    })
  },
  //点击支付按钮，触发支付
    payBtn: function(e){
      var index=e.currentTarget.dataset.index
      var currentInfo=this.data.orderInfo[index]

      
        this.setData({
          currentInfo: currentInfo,
          isshow: true

        })
    },
    payPanel:function(){
    this.setData({
      isshow:true
    })
    },
    //点击面罩，隐藏面罩
    cancelShow:function(){
      this.setData({
        isshow:false
      })
    },
    //选择首次付款时触发事件
    payMent:function(e){
      var data={}
      var num = e.currentTarget.dataset.num
      data.num = num
      
      if (this.data.currentInfo.lease_time==null){
        data.date = this.data.currentInfo.start_time
    
      }else{
        data.date = this.data.currentInfo.lease_time
       
      }
      data.money = this.data.currentInfo.money*num
      data.id = this.data.currentInfo.id
      this.message(data)
    
    },
    //点击续费一个月时触发事件
    payMonth:function(e){
      var data = {}
      var num = e.currentTarget.dataset.num
      data.num = num

      if (this.data.currentInfo.lease_time == null) {
        wx.showToast({
          title: '请先完成首次支付，缴纳押金',
          icon:'none',
          duration:2000
        })
        return false
        data.date = this.data.currentInfo.start_time
      } else {
        data.date = this.data.currentInfo.lease_time
      }
      data.money = this.data.currentInfo.money * num
      data.id = this.data.currentInfo.id
      this.message(data)
      

    },
    //点击季度续费时触发事件
    paySeason:function(e){
      var data = {}
      var num = e.currentTarget.dataset.num
      data.num =num

      if (this.data.currentInfo.lease_time == null) {
        data.date = this.data.currentInfo.start_time
        wx.showToast({
          title: '请先完成首次支付，缴纳押金',
          icon: 'none',
          duration: 2000
        })
        return false
      } else {
        data.date = this.data.currentInfo.lease_time
      }
      data.money = this.data.currentInfo.money * num
      data.id = this.data.currentInfo.id
      this.message(data)


    },
    //支付房租
    payLease(data){
      wx.request({
        url: app.globalData.util.BASE_URL+'/users/payLease',
        data:{
          data
        },
        success:res => {
          if(res.data.success){
           
            var user={}
            // console.log(app.globalData.myInfo)
            user.user_name=app.globalData.myInfo.nickname
            user.user_tel=app.globalData.myInfo.tel
            console.log(user)
            console.log('ddsd')
         
            app.globalData.util.getOrderInfo(user)
            .then(res => {
             
              this.setData({
                orderInfo:res
              })
            })
         
           
          }
          
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  app.globalData.orderInfo.forEach(item => {
    if (item.lease_time == null) {
     item.disappear=true
    } else {
      item.disappear=false
    }
  })
    this.setData({
      orderInfo:app.globalData.orderInfo
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