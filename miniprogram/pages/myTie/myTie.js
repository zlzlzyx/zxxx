// pages/myTie/myTie.js
var app=getApp()
const db = wx.cloud.database()
Page({
  data: {
    blogs:[],
    name:''
  },
  
  //下拉刷新数据
  onPullDownRefresh: function (e) {
    var name=app.globalData.nickName
    // 在这里编写数据更新的逻辑
    db.collection('blogs').orderBy("time","desc").where({username:name}).get({
      success:res=>{
        //console.log(res)
        // let blog = res.data[0]
        // blog.brief = blog.brief.replace(/\\n/g, "\n") 
        
        this.setData({
          blogs:res.data
        })
      }
    })
    wx.stopPullDownRefresh(); // 数据更新完成后，调用该方法停止刷新
  },
  //查找
  onLoad: function(e){
    var username=app.globalData.nickName
    var that = this
    db.collection("blogs").orderBy("time","desc").where({name:username}).get({
      success:res=>{
        that.setData({
          blogs:res.data,
        })
      }
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  //删除博客
  removeBlog:function(e){
    let id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name:"blogFunctions",
      data:{
        type:"removeBlog",
        id:id
      },
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '删除成功',
        })
        let blogs = this.data.blogs
        for(let i in blogs){
          if(blogs[i]._id == id){
            blogs.splice(i,1)
            break;
          }
        }
        this.setData({
          blogs:blogs
        })
      }
    })
  },
  
  changePromp: function(e){
    let index = 0
    index = e.currentTarget.dataset.index
    this.setData({
      curPromp:this.data.promps[index],
      curIndex:index
    })
  }

});
