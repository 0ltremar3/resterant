// 授权登录
Page({
  data: {
  },
  onLoad: function (options) {
  },
  getuserinfo(e){
     console.log(e.detail.rawData);  // 打印的就是用户信息
     wx.setStorageSync('userInfo', JSON.parse(e.detail.rawData))
     wx.switchTab({
       url: '../index/index',
     })
  },
  onShow: function () {
  },
})