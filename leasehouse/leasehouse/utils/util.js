const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const BASE_URL = 'http://127.0.0.1:3002' // 请求网络地址
function getOrderInfo(userInfo){
  return new Promise((resolve,reject) => {
    wx.request({
      url: BASE_URL + '/users/myOrder',
      data: {
        userInfo
      },
      success: res => {
        if (res.data.success) {
          res.data.data.forEach(item => {
            let resImg = item.src.split(',')
            // console.log('resImage')
            // console.log(resImg)
            item.src = resImg

          })
          console.log('res.data.dat6666a')
          console.log(res.data.data)
         resolve(res.data.data)
        }else {
          reject()
        }
      }
    })
  })
}
function getUserInfo(util, openid) {
  console.log('8888')
  return new Promise((resolve, reject) => {

    wx.request({

      url: util.BASE_URL + '/users/finduser',
      data: {
        openid
      },
      success: res => {
        console.log('data')
        console.log(res.data)
        if (!res.data.success) {
          reject()
        } else {
          resolve(res.data)
        }

      }
    })
  })
}


module.exports = {
  formatTime: formatTime,
  BASE_URL,
  getUserInfo,
  getOrderInfo
}