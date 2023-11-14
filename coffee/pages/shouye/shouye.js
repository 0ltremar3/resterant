
Page({
  //点击事件：去预约页面
click1:function(){
  wx.navigateTo({
    url: '/pages/yuyue/yuyue',
  })
},
//点击事件：去店内堂食页面
click2:function(){
  wx.navigateTo({
    url: '/pages/tangshi/tangshi',
  })
},
//点击事件：去到店自取页面
click3:function(){
  wx.navigateTo({
    url: '/pages/ziqu/ziqu',
  })
},
//点击事件：去排队取号页面
click4:function(){
  wx.navigateTo({
    url: '/pages/paihao/paihao',
  
  })
},
//点击事件：去外卖到家页面
click5:function(){
  wx.navigateTo({
    url: '/pages/waimai/waimai',
  })
},
})