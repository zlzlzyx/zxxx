// pages/updateclass/updateclass.js
var app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class1:[],
    newbrief:"",
    newcontent:"",
    newimg:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    console.log(options)
    db.collection("class1").doc(options.id).get({
      success:res=>{
        console.log(res)
        that.setData({
          brief: res.data.brief,
          content:res.data.content,
          BlogImg:res.data.img
        })
      }
    })
    app.globalData.idr=options.id
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
              BlogImg:res.fileID
            })
            console.log("内部的that",that)
            console.log("云储存的头像路径blogImg",that.data.BlogImg)
          },
          fail: err => {
            // handle error
          }
        })
      }
    })
  },
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
  //更新数据
  updateclass:function(e){
   var id=app.globalData.idr
    console.log(id)
    db.collection('class1').where({_id:id}).update({
      data: {
        brief:this.data.brief,
        content:this.data.content,
        img:this.data.BlogImg
      }
    }).then(res => {
      // wx.showToast({
      //   title: '修改成功',
      //   icon: 'success',
      //   success() {
      //     wx.navigateTo({
      //       url: '/pages/class/class',
      //     })
      //   }
      // })
      wx.showModal({
        title: '修改成功',
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
      console.log(id)
    })
  },
  removeBlogImage:function(e){
    this.setData({
      blogImg:null
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