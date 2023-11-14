// 我的订单页面
Page({
  data: {
    dataList:[],
    index:0
  },
  onLoad: function (options) {
  },
  onShow: function () {
    this.getData("getChucan");
  },
  // 跳转到评价
  pingjia(e){
    // console.log(e.currentTarget.dataset.obj)
    wx.navigateTo({
      url: '../add_pinglun/add_pinglun?obj='
      +JSON.stringify(e.currentTarget.dataset.obj)
    })
  },
  // 切换顶部导航栏
  onChange(e){
    console.log(e.detail.name);
    this.setData({
      index:e.detail.name
    });
    if(this.data.index==0){
      // 获取待出餐的数据
      this.getData("getChucan");
    }else if(this.data.index==1){
      // 获取待确认的数据
      this.getData("getQueren");
    }else if(this.data.index==2){
      // 获取待确认的数据
      this.getData("getPingjia");
    }
  },
  // 取消订单
  del(e){
    console.log(e.currentTarget.dataset.id);
    wx.showModal({
      title: '提示',
      content: '确认取消？',
      success:(res)=> {
        if (res.confirm) {
          wx.showLoading({
            title: '拼命加载中...',
          })
          setTimeout(()=>{
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content:"取消成功！",
              showCancel:false,
              success:()=>{
                wx.request({
                  url: `http://127.0.0.1:5000/delOrder`,
                  data: {
                    dingdan_id:e.currentTarget.dataset.id,
                  },
                  header: {
                    'content-type': 'application/json' 
                  },
                  success:res=> {
                    console.log(res.data)
                    this.getData("getChucan")
                  }
                })
              }
            })
          },1200)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
   // 获取我的订单
   getData(name){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `http://127.0.0.1:5000/${name}`,
      data: {
        tel:wx.getStorageSync("tel"),
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data)
        this.setData({
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
  },
    // 确认订单
    addQueren(e){
      console.log(e.currentTarget.dataset.id);
      wx.showModal({
        title: '温馨提示',
        content: '确认之后代表订单完成！',
        success:(res)=> {
          if (res.confirm) {
            wx.showLoading({
              title: '拼命加载中...',
            })
            setTimeout(()=>{
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content:"操作成功！",
                showCancel:false,
                success:()=>{
                  wx.request({
                    url: `http://127.0.0.1:5000/updateQueren`,
                    data: {
                      dingdan_id:e.currentTarget.dataset.id,
                    },
                    header: {
                      'content-type': 'application/json' 
                    },
                    success:res=> {
                      console.log(res.data)
                      this.getData("getQueren")
                    }
                  })
                }
              })
            },1200)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

  
})