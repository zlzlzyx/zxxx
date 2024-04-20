// pages/shenhe/shenhe.js
// pages/tie/tie.js
var app=getApp()
const db = wx.cloud.database()
Page({
  data: {
    blogs:[],
  },
  
  //下拉刷新数据
  onPullDownRefresh: function () {
    // 在这里编写数据更新的逻辑
    db.collection('blogs').orderBy("time","desc").where({
      state:'0'}).get({
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
    var that = this
    db.collection("blogs").orderBy("time","desc").where({
      state:'0'}).get({
      success:res=>{
        that.setData({
          blogs:res.data,
            // avatar:app.globalData.avatarUrl,      
            // name:app.globalData.nickName,
        })
      }
      
    })
  },
  //搜索
  focusHandler(e){
    this.setData({focus:true});
  },
  cancelHandler(e)
  {
    this.setData({focus:false});
  },
  GetSearchInput: function (e) {
    this.setData({
        search: e.detail.value
    })
  },
  ToSearch: function (e) {
      if (this.data.search == '') {
          wx.showToast({
              title: '请输入',
              icon: 'none'
          })
          return
      }
      db.collection('blogs').where({
        //name 表示字段中的用户名
          name: db.RegExp({
              regexp: this.data.search,
              options: 'i',
          }),
      }).get().then(res => {
          if (res.data.length != 0) {
              this.setData({
                  blogs: res.data
              })
          } else {
              wx.showToast({
                  title: '未找到',
                  icon: 'none'
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
  //审核博客
  // shenheBlog:function(e){
  //   let id = e.currentTarget.dataset.id
    
  //   wx.cloud.callFunction({
  //     name:"blogFunctions",
  //     data:{
  //       type:"updataBlog",
  //       id:id
  //     },
  //     success:res=>{
  //       console.log(res);
  //       wx.showToast({
  //         title: '审核成功',
  //       })
  //       let blogs = this.data.blogs
  //       for(let i in blogs){
  //         if(blogs[i]._id == id){
  //           blogs.splice(i,1)
  //           break;
  //         }
  //       }
  //       this.setData({
  //         blogs:blogs
  //       })
  //     }
  //   })
  // },
  shenheBlog:function(e){
    var id = e.currentTarget.dataset.id
    db.collection('blogs').where({_id:id}).update({
      data: {
        state:'1'//修改审核状态
      }
    }).then(res => {
      wx.showToast({
        title: '审核完成',
        icon: 'success',
        success() {
          wx.navigateTo({
            url: '/pages/tie/tie',
          })
        }
      })
      console.log(this.data.id)
    })
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
