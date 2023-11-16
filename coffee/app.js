App({

  // 小程序一启动就会执行
  onLaunch() {
   console.log("小程序启动了");
  },
  globalData: {
    userInfo: null,
    baseUrl: 'http://127.0.0.1:5000' // 设置全局基础 URL
  }
})
