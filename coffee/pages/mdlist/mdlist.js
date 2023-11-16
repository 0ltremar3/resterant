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
    }],
    canteenList: [] //门店列表
  },

  //渲染界面
  onShow: function () {
    this.fetchCanteens();
    this.updateCanteensStatus();
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

  //加载门店列表
  fetchCanteens: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:5000/booking/getCanteens', // 您的后端API地址
      method: 'GET',
      success: function (res) {
        if (res.data.code === 200) {
          that.setData({
            canteenList: res.data.list
          });
        
          that.updateCanteensStatus(); // 在这里调用更新状态的方法
        } else {
          // 处理错误情况
          wx.showToast({
            title: '获取数据失败',
            icon: 'none'
          });
        }
      },
      fail: function () {
        // 处理错误情况
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
      }
    });
  },
  

//实时更新营业状态
updateCanteensStatus: function() {
  let updatedCanteens = this.data.canteenList.map(canteen => {
    canteen.isOpen = this.checkIfOpen() ? "营业中" : "休息中";
    return canteen;
  });
  this.setData({ canteenList: updatedCanteens });
},

  checkIfOpen: function() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // 营业时间段定义,实时渲染无需改表
    const openPeriods = [
      { start: 11 * 60, end: 14 * 60 }, // 11:00 - 14:00
      { start: 17 * 60, end: 21 * 60 }  // 17:00 - 21:00
    ];

    return openPeriods.some(period => totalMinutes >= period.start && totalMinutes <= period.end);
  },

  // 订座按钮点击事件
  bookSeat: function (event) {
    var restaurantId = event.currentTarget.dataset.id;
    var restaurantName = event.currentTarget.dataset.name;
    // 在这里添加处理逻辑，例如导航到订座页面
    // 访问特定餐厅的信息
    wx.navigateTo({
      url: '/pages/booking/booking?restaurantId=' + restaurantId + '&restaurantName=' + encodeURIComponent(restaurantName),
    });
  },

})