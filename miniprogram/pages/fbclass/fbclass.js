var app=getApp()
import { moment } from '../../utils/moment';
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      avatar:"",
      name:"",
      brief:"",
      content:"",
      img:"",
      time:""
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
              blogImg:res.fileID
            })
            console.log("内部的that",that)
            console.log("云储存的头像路径blogImg",that.data.blogImg)
          },
          fail: err => {
            // handle error
          }
        })
      }
    })
  },
  //获取简介
  getbrief(e){
    this.setData({
    brief:e.detail.value
    })
  },
  //获取内容
  getcontent(e){
    this.setData({
    content:e.detail.value
    })
  },
  //form表单提交
  Gosubmit: function(e) {
    if(this.data.brief== '') {
      wx.showToast({
        title: '请输入简介！',
        icon: 'none'
      })
      return
    }
    if(this.data.content== '') {
      wx.showToast({
        title: '请输入内容！',
        icon: 'none'
      })
      return
    }
    // 开始使用云开发数据库
    db.collection('class1').add({
      data: {
        avatar:app.globalData.avatarUrl,
        name:app.globalData.nickName,
        brief: this.data.brief,
        content: this.data.content,
        img:this.data.blogImg,
        time: moment('YYYY-MM-DD hh:mm:ss')
      }
    }).then(res => {
      wx.showModal({
        title: '发布成功',
        content: '',
        complete: (res) => {
          if (res.cancel) {
          }
          if (res.confirm) {
            wx.navigateTo({
            url: '/pages/class/class',
          })
          }
        }
      })
      // wx.showToast({
      //   title: '添加成功',
      //   icon: 'success',
      //   success() {
      //     wx.navigateTo({
      //       url: '/pages/class/class',
      //     })
      //   }
      // })
    })
  },
  //移除图片
  removeBlogImage:function(e){
    this.setData({
      blogImg:null
    })
  },
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