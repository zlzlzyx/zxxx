// pages/login/login.js
var app=getApp()
wx.cloud.init({
  env:'cloud1cloud1-9gpf3dgs2000d74e'
})
const db=wx.cloud.database({
  env:'cloud1-9gpf3dgs2000d74e'
})
// const db=wx.cloud.database({})
Page({
  data: {
    username: "",
    password: "",
    avatarUrl:"",
    nickName:"",
    phone:""
  },
  GetuserN: function(e) {
    // console.log("获取用户名",e.detail.value),
    this.setData({
      username: e.detail.value
    })
  //   var that=this
  //   db.collection('user').where({username:that.data.username}).get({
  //   success(res)
  //   {
  //     avatar:app.globalData.avatarUrl
  //   }
  // })
  },
  GetpassW: function(e) {
    // console.log("获取密码",e.detail.value),
    this.setData({
      password: e.detail.value
    })
  },
  Gologin: function(e) {
    if(this.data.username == '') {
      wx.showToast({
        title: '请输入用户名！',
        icon: 'none'
      })
      return
    }
    if(this.data.password == '') {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return
    }
    // 开始使用云开发数据库
    db.collection('user').where({
    username:this.data.username
    }).get().then(res => {
      if(res.data.length !=0){
        if(res.data[0].password == this.data.password ){
          // if(res.data[0].username=="zl"&&res.data[0].password=="123456"){
            if(res.data[0].isMessage=="true"){
            wx.showToast({
              title: '管理员登录',
              icon:'none'
            })
            wx.navigateTo({
              url: '/pages/admin/admin',
            })
          }else{
                wx.showToast({
                  title: '用户登录',
                  icon:'none'
                })
                wx.switchTab({
                  url: '/pages/index/index',
                })
                }}else {
                          wx.showToast({
                            title: '用户名或密码错误',
                            icon:'none'
                          })
                        }
      }else{
              wx.showToast({
                title: '账号未注册',
                icon:'none'
               })
            }
    })   
    var that=this
    db.collection('user').where({username:that.data.username}).get({
    success(res)
    {
      app.globalData.openid=res.data[0]._id,
      app.globalData.avatarUrl=res.data[0].avatar,
      app.globalData.nickName=res.data[0].username,
      app.globalData.password=res.data[0].password,
      app.globalData.phone=res.data[0].phone
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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