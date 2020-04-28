// components/houseInfo/houseInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    houseInfo: {
      type: Array,

    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsstate: 'false'
  },
  // attached: function () {
  //   // 在组件实例进入页面节点树时执行
  //   this.showSet()
  //   console.log('9999')
  //   console.log(this.properties.houseInfo)
  //   console.log(this.data)
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    // selectToggle:function(){
    //   console.log('properties')
    //   console.log(this.properties.houseInfo)
    checkboxChange: function (e) {
      console.log('properties')
      console.log(e)
     
      // var hosueGoods = e.detail.value.join('-')

      // this.setData({
      //   houseGoods: hosueGoods
      // })
    },
    // }

    // showSet(){
    //   console.log('111')
    //   // console.log(this.prope---------rties)
    //   //  this.properties.houseInfo.forEach(item => {
    //   //   if (item.houseGoods.length >= 1) {

    //   //    item.goodsstate=true
    //   //   }
    //   this.setData({--------
    //     goodsstate:'15866'
    //   })
    //     console.log('9999')
    //   console.log(this.properties.houseInfo.houseInfo)
    //     console.log(this.data)
    //   // })
    // }
  }
})