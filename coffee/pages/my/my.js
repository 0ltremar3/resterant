// pages/my/my.js
Page({

  data: {
    isShow:'',
    name:"",
    img:""
  },

  onLoad: function (options) {
    
  },

  onShow: function () {
    console.log(wx.getStorageSync('info'));
    this.setData({
      name:wx.getStorageSync('userInfo').nickName||"",
      img:wx.getStorageSync('userInfo').avatarUrl
    });
  },


  // 我的收藏
   goMyStar(){
    wx.navigateTo({
      url: '../star/star',
    })
  },

  // 管理员登录
  goAdmin(){
    wx.navigateTo({
      url: '../admin/admin',
    })
  },

// 我的奖品
goMyLuck(){
    wx.navigateTo({
      url: '../my_luck/my_luck',
    })
  },

  // 我的订单
  goMyDingdan(){
    wx.navigateTo({
      url: '../dingdan/dingdan',
    })
  },

  gSet(){
    wx.navigateTo({
      url: '../set/set',
    })
  },

  onReady: function () {

  },


})