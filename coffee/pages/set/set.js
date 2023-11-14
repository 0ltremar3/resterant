// pages/set/set.js
Page({

  data: {

  },

  onLoad: function (options) {

  },

  // 个人信息
  goPerson(){
    wx.navigateTo({
      url: '../lx/lx',
    })
  },

  // 退出
  tuichu(){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success (res) {
        if (res.confirm) {
          wx.reLaunch({
            url:"../login/login"
          });
        } else if (res.cancel) {
          console.log('用户点击了取消')
        }
      }
    })
  },

  onShow: function () {
  },

})