// pages/uppwd/uppwd.js
var app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    console.log(options)
    db.collection("user").doc(options.id).get({
      success:res=>{
        console.log(res)
        that.setData({
          password: res.data.password
        })
      }
    })
  },
  GetnewpassW(e){
    this.setData({
      newpassword:e.detail.value
    })
  },
  // onLoad(e) {
  //   var that = this
  //   // console.log(options)
  //   let name = app.globalData.nickName
  //   db.collection("user").where({username:name}).get({
  //     success:res=>{
  //       console.log(res)
  //       that.setData({
  //         password: res.data.password
  //       })
  //     }
  //   })
  // },
  // 
  updataP:function(){
    let name = app.globalData.nickName
    db.collection('user').where({username:name}).update({
      data: {
        password:this.data.newpassword
      }
    }).then(res => {
      wx.showModal({
        title: '修改成功',
        content: '',
        complete: (res) => {
          if (res.cancel) {
          }
          if (res.confirm) {
          wx.switchTab({
            url: '/pages/me/me',
          })  
          }
        }
      })
      // wx.showToast({
      //   title: '修改成功',
      //   icon: 'success',
      //   success() {
      //     wx.switchTab({
      //       url: '/pages/me/me',
      //     })
      //   }
      // })
      // console.log(password)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})