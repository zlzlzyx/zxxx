// pages/register/register.js
wx.cloud.init({
  env:'cloud1-9gpf3dgs2000d74e'
})
const db=wx.cloud.database({
  env:'cloud1-9gpf3dgs2000d74e'
})
Page({
  data: {
    avatar:'',
    userN: '',
    passW: '',
    repassW: '',
    Phone: '',
    isM: ''
  },
  upload(){
    //拍摄或从手机相册中选择图片或视频。
    console.log("点击了上传头像")
    let that=this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log("头像",res.tempFiles[0].tempFilePath)
        // 将本地资源上传至云存储空间
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'phone.png',//头像存储时的名字
          filePath: res.tempFiles[0].tempFilePath, // 文件路径
          success: res => {
            // get resource ID
            console.log("云储存的头像路径",res.fileID)
            that.setData({
              avatar:res.fileID
            })
            console.log("内部的that",that)
            console.log("云储存的头像路径avatar",that.data.avatar)
          },
          fail: err => {
            // handle error
          }
        })
      }
    })
  },
  GetuserN: function(e) {
    this.setData({
      userN: e.detail.value
    })
  },
  GetpassW: function(e) {
    this.setData({
      passW: e.detail.value
    })
  },
  GetrepassW: function(e) {
    this.setData({
      repassW: e.detail.value
    })
  },
  GetPhone: function(e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  GetisM: function(e) {
    this.setData({
      isM: e.detail.value
    })
  },
  Goregister: function(e) {
    if(this.data.Img == '') {
      wx.showToast({
        title: '请选择头像！',
        icon: 'none'
      })
      return
    }
    if(this.data.userN == '') {
      wx.showToast({
        title: '请输入用户名！',
        icon: 'none'
      })
      return
    }
    if(this.data.passW == '') {
      wx.showToast({
        title: '请输入密码！',
        icon: 'none'
      })
      return
    }
    if(this.data.repassW == '') {
      wx.showToast({
        title: '请输入确认密码！',
        icon: 'none'
      })
      return
    }
    if(this.data.Phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return
    }
    if(this.data.isM == '') {
      wx.showToast({
        title: '请输入true 或 false',
        icon: 'none'
      })
      return
    }
    if(this.data.repassW != this.data.passW) {
      wx.showToast({
        title: '两次输入的密码不一致！',
        icon: 'none'
      })
      return
    }
    // 开始使用云开发数据库
    db.collection('user').add({
      data: {
        avatar:this.data.avatar,
        username: this.data.userN,
        password: this.data.passW,
        phone: this.data.Phone,
        isMessage:this.data.isM
      }
    }).then(res => {
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        success() {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      })
    })
  },
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