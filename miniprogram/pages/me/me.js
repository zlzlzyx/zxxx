var app=getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    nickName:"",
    phone:""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    var that = this
    that.setData({
      avatarUrl:app.globalData.avatarUrl,      
      nickName:app.globalData.nickName,
      phone:app.globalData.phone
    })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
 
  },
  gologin:function(){
    wx.showModal({
      content: '确定跳转吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行
    })
  },
 //个人资料
//  bind: function () {
//   wx.showModal({
//     content: '确定跳转吗？',
//     cancelColor: '#666666',//666666
//     confirmColor: '#666666',
//     success(res) {
//       if (res.confirm) {

//         wx.navigateTo({
//           url: '/pages/Info/Info?id='+app.globalData.openid
//         })
//         console.log('用户点击确定')
//       } else if (res.cancel) {
//         console.log('用户点击取消')
//       }
//     },
//     fail: function (res) { },//接口调用失败的回调函数
//     complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行
//   })

// },
//个人资料
 bind: function () {
  wx.showModal({
    content: '确定跳转吗？',
    cancelColor: '#666666',//666666
    confirmColor: '#666666',
    success(res) {
      if (res.confirm) {

        wx.navigateTo({
          url: '/pages/myTie/myTie?username='+app.globalData.nickName
        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
    fail: function (res) { },//接口调用失败的回调函数
    complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行
  })

},
// // 修改密码
// updatepassword: function () {
//   wx.showModal({
//     content: '确定跳转吗？',
//     cancelColor: '#666666',//666666
//     confirmColor: '#666666',
//     success(res) {
//       if (res.confirm) {

//         wx.navigateTo({
//           url: '/pages/uppwd/uppwd?username='+app.globalData.nickName

//         })
//         console.log('用户点击确定')
//       } else if (res.cancel) {
//         console.log('用户点击取消')
//       }
//     },
//     fail: function (res) { },//接口调用失败的回调函数
//     complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行
//   })

// },
// 修改密码
updatepassword: function () {
  wx.showModal({
    content: '确定跳转吗？',
    cancelColor: '#666666',//666666
    confirmColor: '#666666',
    success(res) {
      if (res.confirm) {

        wx.navigateTo({
          url: '/pages/uppwd/uppwd?id='+app.globalData.openid

        })
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
    fail: function (res) { },//接口调用失败的回调函数
    complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行
  })

},
  // 退出登录
  logout: function () {
    wx.showModal({
      content: '确定退出登录吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/login/login'
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行
    })
 
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideHomeButton();
    wx.hideShareMenu();
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