Page({
  data: {
    address: "遵义医科大学",
    phone: "1234567890",
    weixin: "99999",
    //标记点
    markers: [{
      id: 0,
      name: "lala",
      address: "遵义",
      latitude: 27.72477,
      longitude: 107.06755,
      width: 80,
      height: 80
    }]
  },
  //点击导航
  clickMap(e) {
    console.log('点击地图上的标记点', e.currentTarget.dataset.marker)
    let marker = e.currentTarget.dataset.marker
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        wx.openLocation({ //地图搜索目的他
          latitude: marker.latitude,
          longitude: marker.longitude,
          name: marker.name,
          address: marker.address,
          scale: 18
        })
      },
      fail(res) {
        console.log("获取位置失败", res)
        wx.showModal({
          title: "需要授权",
          content: "需要授权位置信息，才可以实现导航，点击去设置就可以开启位置权限",
          confirmText: "去设置",
          success(res) {
            console.log("弹窗点击", res)
            if (res.confirm) {
              wx.openSetting()
            }
          }
        })
      }
    })
  },
  // 拨打电话
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  copyWechat(event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.weixin,
    })
  },
  //点击事件：去订座
click1:function(){
  wx.navigateTo({
    url:   '/pages/goorder/goorder',
  })
},
click2:function(){
  wx.navigateTo({
    url:   '/pages/goorder1/goorder1',
  })
},
})