// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'cloud1-9gpf3dgs2000d74e',
        traceUser: true,
      });
    }
    // app.getUserInfo(function(){
    //   if(app.globalData.nickName==null){
    //     wx.showModal({
    //       title: '未登录',
    //       content: '请前往登录',
    //       success(res){
    //         if(confirm){
    //           wx.showToast({
    //             title: '请登录后使用',
    //           })
    //           wx.switchTab({
    //             url: '/pages/login/login',
    //           })
    //         }
    //       }
    //     })
    //     return
    //   }
    // })
    // this.globalData = {
    // }
  },
  globalData:{
    userInfo:null,
    nickName:'',
    avatarUrl:'',
    password:'',
    time:'',
    phone:'',
    openid:'',
    commentnum:'',//评论是数量
    idTie:'',//帖子的详情页id
    idr:''//课程详情页的id
    },
    
});
//app.js 

//定义全局变量


