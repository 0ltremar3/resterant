Page({
  data: {
    cartArr:[],//将存储用户添加到购物车中的商品信息,默认为空数组
    // 全选
    allCheck:true,//用于控制全选框的选中与取消选中操作
    // 总价
    totalPrice:0,
    // 商品总数
    totalNum:0
  },
  onShow (options) {
   
    // 获取购物车数组
    let cartArr = wx.getStorageSync('cartArr')||[];
    //从本地缓存中获取名称为 'cartArr' 的数据，即购物车数组
    this.setCart(cartArr)
    //调用 this.setCart(cartArr) 函数，
    //将获取到的购物车数组作为参数传递给 setCart 函数进行处理
    //setCart 函数用于计算购物车商品的总价格和数量，以更新页面数据
  },
  handlePay() {
    ////this.data.cartArr.some 方法遍历购物车数组 (cartArr)
    let is_kong = this.data.cartArr.some(item=>{
      return item.check == true
    })
    console.log(is_kong)
    //判断
    if(is_kong&&this.data.cartArr!==0){
      
      this.setData({ show: true });
      wx.navigateTo({
      url: '../pay/pay',
    })
    }else{
      wx.showModal({
        title: '提示',
        content: '还没有选择商品',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击了确定')
          } else if (res.cancel) {
            console.log('用户点了击取消')
          }
        }
      })
    }

  },
  // 单选框切换
  checkedChange(e){
    console.log(e.currentTarget.dataset);
     //   console.log(e)
    // 获取点击的商品id
    let id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {cartArr} = this.data;
    // 找到被修改的商品对象
    let index = cartArr.findIndex((item)=>item.goods_id === id);   
    // 找到后会返回对应的索引值
    //切换选中状态
    cartArr[index].check =! cartArr[index].check
    //将 数组重新填回data中 和缓存中
    this.setData({
      cartArr
    });
    //重新计算总价格和总数量
    this.setCart(cartArr);
  },
   //点击全选
   allCheckedChange(){
    //获取到购物车数组 和全选变量
    let {cartArr,allCheck} = this.data;
    // 全选取反
    allCheck =! allCheck;
    // 然后将每一项单选框的状态都取值和全选一样
      cartArr.forEach((item)=> item.check=allCheck);
      this.setData({
        allCheck
      });
      //重新计算商品数量和总价格
      this.setCart(cartArr);
  },

  // 修改商品数量
  operationGoods(e) {
    // console.log(e);
    //获取购物车数组
    let {cartArr} = this.data;
    //获取修改商品id 和 加减参数
    let {id,operation} = e.currentTarget.dataset;
    //获取要修改商品的索引
   let index = cartArr.findIndex((item)=> item.goods_id == id);
   if(cartArr[index].shopNum===1&&operation===-1){
       // 弹框提示
       wx.showModal({
        title: '提示',
        content: '您是否要删除该商品',
        success:(res)=>{
          if (res.confirm) {
            cartArr.splice(index,1);
           this.setCart(cartArr);
            console.log('用户点击了确定')
            }
           }
        }) 
       }else{
        // 进行商品数量修改
        cartArr[index].shopNum += operation;
        //重新计算 商品总价 和商品数量
        this.setCart(cartArr);
   }
},
   // 设置购物车状态同时 重新计算底部工具栏的数据 全选 总价格 购买数量
   setCart(cartArr){
    //计算全选
    const allCheck = cartArr.length>0?cartArr.every((item)=>item.check) : true;
    //通过 cartArr.every 方法判断是否所有商品都被选中，
    //然后将结果保存在 allCheck 变量中
    // console.log(allCheck)
    //计算总数量
    let totalNum = 0;
    let totalPrice = 0;
    cartArr.forEach((item)=>{
      //使用 cartArr.forEach 方法遍历购物车数组中的每个商品对象。

        if(item.check){  //如果当前商品是处于选中状态，那就计算
            totalNum += item.shopNum  //计算商品数量
            totalPrice += item.money*item.shopNum
            console.log("q",item.shopNum)
        }
    });
    //this.setData 方法将更新后的数据（cartArr、allCheck、totalPrice、totalNum）
    //重新设置到页面的数据中，以便页面重新渲染
    this.setData({
        cartArr,
        allCheck,
        totalPrice,
        totalNum,
    });
    //计算完后 将购物车数组重新 保存到缓存中
    //wx.setStorageSync 方法
    //将购物车数组 cartArr 更新到缓存中，以确保数据的持久化
    wx.setStorageSync('cartArr',cartArr);
    console.log(totalPrice)
}
})