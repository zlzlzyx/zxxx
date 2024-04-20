const db = wx.cloud.database()
var app=getApp()
Page({
  data: {
    cateItems:[
      {
        cate_id:1,
        cate_name:'用户管理',
        user:[]
        // children: [
        //   { 
        //     child_id: 1, 
        //     name: '删除用户', 
        //     image: "/image/删除用户.png" 
        //   }, 
        //   { 
        //     child_id: 2, 
        //     name: '添加用户', 
        //     image: "/image/添加用户.png"  
        //   },
        //   { 
        //     child_id: 3, 
        //     name: '查询用户', 
        //     image: "/image/查询用户.png"  
        //   }
        // ]

      },
      {
        cate_id:2,
        cate_name:'课程管理',
        // children: [
        //   { 
        //     child_id: 1, 
        //     name: '添加课程', 
        //     image: "../../images/thumbnail/1.jpg" 
        //   }, 
        //   { 
        //     child_id: 2, 
        //     name: '修改课程', 
        //     image: "../../images/thumbnail/2.jpg"  
        //   },
        //   { 
        //     child_id: 3, 
        //     name: '删除课程', 
        //     image: "../../images/thumbnail/2.jpg"  
        //   },
        // ]
      },
      {
        cate_id:3,
        cate_name:'帖子管理',
        // children: [
        //   { 
        //     child_id: 1, 
        //     name: '审核', 
        //     image: "../../images/thumbnail/1.jpg" 
        //   }, 
        //   { 
        //     child_id: 2, 
        //     name: '屏蔽', 
        //     image: "../../images/thumbnail/2.jpg"  
        //   },
        //   { 
        //     child_id: 3, 
        //     name: '删除', 
        //     image: "../../images/thumbnail/2.jpg"  
        //   },
        // ]
      },
    ],
    curNav:1,
    curIndex:0
  },
 
  switchRightTab:function(e){
    let id = e.target.dataset.id,index=e.target.dataset.index;
    this.setData({
      curNav:id,
      curIndex:index
    })
  },
  onLoad: function(e){
    //加载云数据库中的数据
    var that = this
    that.setData({
      avatarUrl:app.globalData.avatarUrl,      
      nickName:app.globalData.nickName,
      phone:app.globalData.phone
    })
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
  bind:function(){
    wx.showModal({
      content: '确定跳转吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/Info/Info?id='+app.globalData.openid,
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
  updatepassword:function(){
    wx.showModal({
      content: '确定跳转吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/uppwd/uppwd',
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
  usermessage: function () {
    wx.showModal({
      content: '确定跳转吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/user/user'
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
  classmessage: function () {
    wx.showModal({
      content: '确定跳转吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/class/class'
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
  tiemessage: function () {
    wx.showModal({
      content: '确定跳转吗？',
      cancelColor: '#666666',//666666
      confirmColor: '#666666',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/tie/tie'
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
  }
});
