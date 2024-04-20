var app=getApp()

wx.cloud.init({
  env:'cloud1-9gpf3dgs2000d74e'
})
const db=wx.cloud.database({
  env:'cloud1-9gpf3dgs2000d74e'
})
Page({
  data: {
    // avatarUrl:"",
    // nickName:"",
    // password:"",
    // phone:""
  },
  onLoad(options) {
    var that = this
    console.log(options)
    db.collection("user").doc(options.id).get({
      success:res=>{
        console.log(res)
        that.setData({
          user: res.data
        })
      }
    })
    app.globalData.nickName=options.nickName
  },
//修改头像
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
  // GetrepassW: function(e) {
  //   this.setData({
  //     repassW: e.detail.value
  //   })
  // },
  GetPhone: function(e) {
    this.setData({
      Phone: e.detail.value
    })
  },
  // GetisM: function(e) {
  //   this.setData({
  //     isM: e.detail.value
  //   })
  // },
  save: function(e) {
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
    // if(this.data.repassW == '') {
    //   wx.showToast({
    //     title: '请输入确认密码！',
    //     icon: 'none'
    //   })
    //   return
    // }
    if(this.data.Phone == '') {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'none'
      })
      return
    }
    // 开始使用云开发数据库
      var name=app.globalData.nickName
       db.collection('user').where({username:name}).update({
         data: {
           username:this.data.userN,
           password:this.data.passW,
           avatar:this.data.avatar,
           phone:this.data.Phone,
           
         }
       }).then(res => {
         wx.showModal({
           title: '修改成功',
           content: '',
           complete: (res) => {
             if (res.cancel) {
               
             }
         
             if (res.confirm) {
                wx.navigateTo({
               url: '/pages/admin/admin',
             })
             }
           }
         })
        //  wx.showToast({
        //    title: '修改成功',
        //    icon: 'success',
        //    success() {
        //      wx.navigateTo({
        //        url: '/pages/admin/admin',
        //      })
        //    }
        //  })
       })
       app.globalData.phone=this.data.Phone,
       app.globalData.password=this.data.password
     },
})