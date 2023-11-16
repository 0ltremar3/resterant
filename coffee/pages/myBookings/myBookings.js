// pages/myBookings/myBookings.js
Page({
  data: {
    baseUrl: '', // 用于存储 baseUrl
    userId: wx.getStorageSync('userId'),
    bookings: [] // 用于存储预约数据
  },

  onLoad: function (options) {
    // 获取全局应用实例
    const app = getApp();
    // 从 globalData 中获取 baseUrl 并存储到页面的 data 对象中
    this.setData({
      baseUrl: app.globalData.baseUrl
    });
    //根据用户id加载预约记录
    this.fetchBookings();
  },

  fetchBookings: function () {
    var that = this;
    const requestUrl = this.data.baseUrl + '/booking/getBookingsByUserId/' + this.data.userId;
    wx.request({
      url: requestUrl,
      method: 'GET',
      success: function (res) {
        if (res.statusCode === 200) {
          // 对预约数据按 bookingId 倒序排序
          const sortedBookings = res.data.bookings.sort((a, b) => b.bookingId - a.bookingId);
          that.setData({
            bookings: sortedBookings
          });
        } else {
          // 错误处理
          wx.showToast({
            title: '加载数据失败',
            icon: 'none'
          });
        }
      },
      fail: function () {
        // 网络错误处理
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        });
      }
    });
  },
  //删除预约
  deleteBooking: function (e) {
    const bookingId = e.currentTarget.dataset.id;
    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要删除这个预约吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `http://127.0.0.1:5000/booking/deleteBooking`,
            method: 'DELETE',
            data: {
              bookingId: bookingId
            },
            success: function (res) {
              if (res.statusCode === 200) {
                wx.showToast({
                  title: '预约删除成功',
                  icon: 'success'
                });
                // 从列表中移除已删除的预约
                const updatedBookings = that.data.bookings.filter(item => item.bookingId !== bookingId);
                that.setData({
                  bookings: updatedBookings
                });
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none'
                });
              }
            },
            fail: function () {
              wx.showToast({
                title: '网络错误',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  },
});