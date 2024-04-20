var app=getApp()
import { moment } from '../../utils/moment';
const db = wx.cloud.database()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     inputValue:null,
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad(options) {
//     console.log(options)
//     db.collection("blogs").doc(options.id).get({
//       success:res=>{
//         console.log(res)
//         this.setData({
//           blog: res.data
//         })
//       }
//     })
//     var that = this;
//     that.setData({//获取用户信息
//       nickName:app.globalData.nickName,
//       avatarUrl:app.globalData.avatarUrl
//     })
//     db.collection('comment').get({
//       success:res=>{
//         console.log(res.data.length)
//         for(let i=res.data.length-1,j=0;j>=0;i--,j++){
//           console.log(res.data[j])
//           var talks="talks["+j+"]";
//           that.setData({
//             [talks]:res.data[i],
//           })
//         }
//       }
//     })
//   },
//   talkInput:function(e){
//     var that=this;
//     that.setData({
//       talk:e.detail.value
//     })
//   },
//   //点击确认
//   submit: function (e) {//这个是评论上传函数，是需要点击事件触发的
//     var that = this
//     if (this.data.talk) {  //talk不为空的时候
//       const db = wx.cloud.database()
//       if(!that.data.avatarUrl){//判断是否获取到用户信息
//         wx.showToast({
//           title: '请先获取用户信息！',
//           icon: "none"
//         })
//     wx.getUserProfile({//获得微信用户信息
//       desc: '用于完善资料',
//       success: function (res) {
//         app.globalData.nickName = res.userInfo.nickName;
//         app.globalData.avatarUrl = res.userInfo.avatarUrl;
// }
//      })
//      that.setData({//获取用户信息
//       nickName:app.globalData.nickName,
//       avatarUrl:app.globalData.avatarUrl
//     })
//     }else{
//       db.collection('comment').add({
//         data: {
//           name: this.data.nickName,//获得用户名
//           content: this.data.talk,//获得评论
//           time: this.data.time,//获得评论时间
//           photo: this.data.avatarUrl,//获得用户头像
//         },
//         success: res => {
//           // 在返回结果中会包含新创建的记录的 _id
//           this.setData({
//             'inputValue': ''
//           })
//           wx.showToast({
//             title: '评论成功',
//           })	//成功将评论数据写入小程序云开发数据库
//           var that = this;
//           db.collection('comment').get({
//             success: res => {
//               console.log(res.data.length)//打印评论的长度
//               for (let i = res.data.length - 1, j = 0; i >= 0; i-- , j++) {
//                 console.log(res.data[j])
//                 var talks = "talks[" + j + "]";
//                 that.setData({
//                   [talks]: res.data[i],
//                 })		//将评论区刷新，显示最新的留言
//               }
//             }
//           })
//         },
//         fail: err => { //未成功写入数据库
//           wx.showToast({
//             icon: 'none',
//             title: '请检查网络'
//           })
//           console.error('[数据库] [新增记录] 失败：', err)
//         }
//       })
//     }}
//     else {// talk为0，输入框未输入数据
//       wx.showModal({
//         title: '提示',
//         content: '评论不能为空',
//         showCancel: false,
//         confirmText: '我知道了',
//       })
//     }
//   },
// })
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    db.collection("blogs").doc(options.id).get({
      success:res=>{
        console.log(res)
        this.setData({
          blog: res.data,
        })
      }
    })
    app.globalData.idTie=options.id
    console.log(app.globalData.idTie)
    var that = this;
    that.setData({//获取用户信息
      nickName:app.globalData.nickName,
      avatarUrl:app.globalData.avatarUrl
    })
//留言显示，按照留言顺序，最新的在最上面
//数据库comment
app.globalData.idTie=options.id
    db.collection('comment').where({tieid:app.globalData.idTie}).get({
      success: res => {
        // console.log(res.data.length)
        app.globalData.commentnum=res.data.length
        console.log(app.globalData.commentnum)
        for (let i=res.data.length-1,j=0; i >= 0;i--,j++) {
          console.log(res.data[j])
          var talks = "talks[" + j + "]";
          that.setData({
            [talks]: res.data[i],
            // commentnum:res.data.length
          })
        }
        }
    })
},
talkInput: function (e) {
    var that= this;
   that.setData({
      talk: e.detail.value,
     
    });
  },
  submit: function (e) {//这个是评论上传函数，是需要点击事件触发的
    var that = this
    if (this.data.talk) {  //talk不为空的时候
      const db = wx.cloud.database()
      if(!that.data.avatarUrl){//判断是否获取到用户信息
        wx.showToast({
          title: '请先获取用户信息！',
          icon: "none"
        })
    wx.getUserProfile({//获得微信用户信息
      desc: '用于完善资料',
      success: function (res) {
        app.globalData.nickName = res.userInfo.nickName;
        app.globalData.avatarUrl = res.userInfo.avatarUrl;
}
     })
     that.setData({//获取用户信息
      nickName:app.globalData.nickName,
      avatarUrl:app.globalData.avatarUrl
    })
    }else{
      db.collection('comment').add({
        data: {
          tieid:app.globalData.idTie,
          name: this.data.nickName,//获得用户名
          content: this.data.talk,//获得评论
          time: moment('YYYY-MM-DD hh:mm:ss'),//获得评论时间
          photo: this.data.avatarUrl,//获得用户头像
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            'inputValue': ''
          })
          wx.showToast({
            title: '评论成功',
          })	//成功将评论数据写入小程序云开发数据库
          var that = this;
          db.collection('comment').where({tieid:app.globalData.idTie}).get({
            success: res => {
              console.log(res.data.length)
              for (let i = res.data.length - 1, j = 0; i >= 0; i-- , j++) {
                console.log(res.data[j])
                var talks = "talks[" + j + "]";
                that.setData({
                  [talks]: res.data[i],
                })		//将评论区刷新，显示最新的留言
              }
            }
          })
          
        },
        fail: err => { //未成功写入数据库
          wx.showToast({
            icon: 'none',
            title: '请检查网络'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }}
    else {// talk为0，输入框未输入数据
      wx.showModal({
        title: '提示',
        content: '评论不能为空',
        showCancel: false,
        confirmText: '我知道了',
      })
    }
  }
  })