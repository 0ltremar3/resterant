// pages/comment/comment.js
Page({


  data: {
    obj:[],
    dataList:[],  // 评论数组
  },

  onLoad: function (options) {
    console.log(JSON.parse(options.obj))
    this.setData({
      obj:JSON.parse(options.obj)
    });
  },

  onShow: function () {
    this.getPinglun()
  },

   // 获取用户评论
   getPinglun(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/getPinglun',
      data: {
        goods_id:this.data.obj.goods_id
      },
      header: {
        'content-type': 'application/json' 
      },
      success:res=> {
        console.log(res.data.list);
        this.setData({
          dataList:res.data.list
        });
        wx.hideLoading()
      }
    })
  },
})