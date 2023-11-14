Page({
  data: {
  date: '请选择日期',
  people: 1,
  phone: '',
  name: ''
  },
  
  bindDateChange: function (e) {
  this.setData({
  date: e.detail.value
  });
  },
  
  bindPeopleInput: function (e) {
  this.setData({
  people: e.detail.value
  });
  },
  
  bindPhoneInput: function (e) {
  this.setData({
  phone: e.detail.value
  });
  },
  
  bindNameInput: function (e) {
  this.setData({
  name: e.detail.value
  });
  },
  
  submitReservation: function () {
  console.log('预约日期：', this.data.date);
  console.log('预约人数：', this.data.people);
  console.log('联系电话：', this.data.phone);
  console.log('姓名：', this.data.name);
  }
  });