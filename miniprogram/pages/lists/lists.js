
const db = wx.cloud.database()

Page({
  data: {
    class1:[],

  },
  
  //下拉刷新数据
    onPullDownRefresh: function () {
      // 在这里编写数据更新的逻辑
      db.collection("class1").orderBy("time","desc").get({
        success:res=>{
          //console.log(res)
          // let blog = res.data[0]
          // blog.brief = blog.brief.replace(/\\n/g, "\n") 
          this.setData({
            class1:res.data
          })
        }
      })
      wx.stopPullDownRefresh(); // 数据更新完成后，调用该方法停止刷新
    },
  //查找
  onLoad: function(e){
    //加载云数据库中的数据
    db.collection("class1").orderBy("time","desc").get({
      success:res=>{
        this.setData({
          class1:res.data
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
      db.collection('class1').where({
        //brief 表示字段中的用户名
          brief: db.RegExp({
              regexp: this.data.search,
              options: 'i',
          }),
      }).get().then(res => {
          if (res.data.length != 0) {
              this.setData({
                class1: res.data
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
  // 删除博客
  // removeClass:function(e){
  //   let id = e.currentTarget.dataset.id
    
  //   wx.cloud.callFunction({
  //     name:"blogFunctions",
  //     data:{
  //       type:"removeClass",
  //       id:id
  //     },
  //     success:res=>{
  //       console.log(res);
  //       wx.showToast({
  //         title: '删除成功',
  //       })
  //       let class1 = this.data.class1
  //       for(let i in class1){
  //         if(class1[i]._id == id){
  //           class1.splice(i,1)
  //           break;
  //         }
  //       }
  //     }
  //   })
  // },
  
  changePromp: function(e){
    let index = 0
    index = e.currentTarget.dataset.index
    this.setData({
      curPromp:this.data.promps[index],
      curIndex:index
    })
  }

});
