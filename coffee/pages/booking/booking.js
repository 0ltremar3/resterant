Page({
  data: {
    dates: [], // 未来7天的日期数组
    timeslots: [], // 当日可预约的时间段
    selectedDate: null, // 用户选择的日期
    selectedTimeslot: null, // 用户选择的时间段
    selectedSeats: null, // 用户选择的座位数
    reminderText: '', // 用于存储提醒文本
    userId: '', //当前用户信息
    userPhone: '',
    restaurantName: '', // 存储餐厅名称
    restaurantId: null,
  },

  onLoad: function (options) {
    this.initDates();
    this.initTimeslots();
    //接收餐厅名称
    if(options.restaurantName && options.restaurantId){
      this.setData({
        restaurantName: decodeURIComponent(options.restaurantName),
        restaurantId: options.restaurantId
      });
      console.log(this.data.restaurantId+" "+this.data.restaurantName)
    }
    
    // 尝试同步获取用户信息
    const userId = wx.getStorageSync('userId');
    const userPhone = wx.getStorageSync('tel');

    // 如果获取成功，设置到页面数据中
    if (userId && userPhone) {
      this.setData({
        userId: userId,
        userPhone: userPhone
      });
      console.log(userId + " " + userPhone)
    } else {
      // 如果获取失败，可能需要提示用户登录或提供这些信息
      console.log("用户信息获取失败")
    }
  },

  // 生成未来7天的日期并设置默认选中的日期为当天
  initDates: function () {
    const dates = [];
    const now = new Date();
    const today = this.formatDate(now); // 当天日期

    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(now.getDate() + i);
      dates.push({
        day: this.formatDay(date),
        week: this.formatWeek(date),
        fullDate: this.formatDate(date)
      });
    }

    this.setData({
      dates: dates,
      selectedDate: today //设置默认选中的日期为当天
    });
  },

  // 格式化日期为 YYYY-MM-DD 格式
  formatDate: function (date) {
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  },

  // 格式化日期为 MM-DD 格式
  formatDay: function (date) {
    let month = '' + (date.getMonth() + 1),
      day = '' + date.getDate();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [month, day].join('-');
  },

  // 获取星期几的字符串
  formatWeek: function (date) {
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    return '周' + weeks[date.getDay()];
  },

  // 生成当日的可预约时间段
  initTimeslots: function () {
    this.updateTimeslots(this.formatDate(new Date()));
  },

  // 时间段更新updateTimeslots 函数
  updateTimeslots: function (selectedDate) {
    const timeslots = [];
    const now = new Date();
    const today = this.formatDate(now);

    if (selectedDate === today) {
      let currentHour = now.getHours();
      // 如果是当天，根据当前时间生成时间段
      if (currentHour < 14) {
        // 添加剩余的午餐时间段
        for (let i = Math.max(currentHour + 1, 11); i < 14; i++) {
          timeslots.push(`${this.zeroPad(i)}:00`);
        }
      }
      if (currentHour < 21) {
        // 添加剩余的晚餐时间段
        for (let i = Math.max(currentHour + 1, 17); i < 21; i++) {
          timeslots.push(`${this.zeroPad(i)}:00`);
        }
      }
    } else {
      // 如果不是当天，显示完整时间段
      for (let i = 11; i < 14; i++) {
        timeslots.push(`${this.zeroPad(i)}:00`);
      }
      for (let i = 17; i < 21; i++) {
        timeslots.push(`${this.zeroPad(i)}:00`);
      }
    }

    this.setData({
      timeslots: timeslots,
      selectedSeats: null, // 重置选中的座位数
      selectedTimeslot: null, // 重置选中的时间段
      reminderText: ''
    });
  },

  // 补零函数
  zeroPad: function (num) {
    return num < 10 ? '0' + num : String(num);
  },

  // 日期项点击事件处理函数
  onDateTap: function (e) {
    const selectedDate = e.currentTarget.dataset.date;

    this.setData({
      selectedDate: selectedDate
    });
    this.updateTimeslots(selectedDate);
  },

  // 选择时间段和座位
  onTimeslotSelect: function (e) {
    const selectedTimeslot = e.currentTarget.dataset.timeslot;
    const selectedSeats = e.currentTarget.dataset.seats;
    const selectedDate = this.data.selectedDate;
    const reminderText = `已选择 ${selectedDate}，${selectedTimeslot}的${selectedSeats}人座`;

    // 只有当用户选择了有效的座位数时才更新数据
    if (selectedSeats) {
      // 设置选择的时间段和座位数
      this.setData({
        selectedTimeslot: selectedTimeslot,
        selectedSeats: selectedSeats,
        reminderText: reminderText, // 显示选择的日期、时间段和座位数
      });
    } else {
      // 如果没有选择有效的座位数，可以在这里处理错误或显示提示
      wx.showToast({
        title: `请选择座位`,
        icon: 'none'
      });
    }
  },

    // 输入姓名时触发
    inputName: function(e) {
      this.setData({
        userName: e.detail.value
      });
    },
  
    // 输入电话时触发
    inputPhone: function(e) {
      this.setData({
        userPhone: e.detail.value
      });
    },

  // 提交预约信息
  onSubmit: function() {
    // 验证输入
    if (!this.data.userName || !this.data.userPhone || !this.data.selectedDate || !this.data.selectedTimeslot || !this.data.selectedSeats) {
      wx.showToast({
        title: '请完善预约信息',
        icon: 'none'
      });
      return;
    }

    // 构造要发送的数据
    const bookingData = {
      userName: this.data.userName,
      userId: this.data.userId, // 假设 userId 已经保存在 data 中
      bookingDate: this.data.selectedDate,
      bookingSeats: this.data.selectedSeats,
      bookingTime: this.data.selectedTimeslot,
      userPhone: this.data.userPhone, // 新增电话字段
      bookingStatus: '', // 预约状态，根据需要设置
      canteenName: this.data.restaurantName // 餐厅名称，根据需要设置
    };

    // 使用全局变量中的基础 URL
    const app = getApp();
    const baseUrl = app.globalData.baseUrl;
    const requestUrl = baseUrl + '/booking/createBooking';
    // 发送数据到服务器
    wx.request({
      url: requestUrl,
      method: 'POST',
      data: bookingData,
      success: function(res) {
        if (res.statusCode === 409) {
          // 同时间段仅能预约一次
          wx.showToast({
            title: '您在该时间段已预约过',
            icon: 'none'
          });          
        } else {
           // 预约状态
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '网络错误，预约失败',
          icon: 'none'
        });
      }
    });
  },
});