// app.js
App({
  onLaunch() {
    // wx.setStorageSync('token', "token")
    
    if(wx.getStorageSync('token') ==""){
      //缓存中无登录信息，重新登录
      //弹出登录popup层
      
      
    }else{
      //已有登录信息，无需再次登录
      
    }

    this.onGetUserInfo()
  },
  

  onGetUserInfo() {
    
    wx.getUserProfile({
      desc: 'desc',
      success: res => {
        this.data.userInfo = res.userInfo;
        this.data.hasUserInfo = true;
        
        wx.login({
          timeout: 3000,
          success: login_res => {
            // 2. 小程序通过wx.request()发送code到开发者服务器
            wx.request({
              url: 'http://10.133.49.118:8082/api/v1/tc/login',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: login_res.code, //临时登录凭证
                signature: res.signature, //签名
                encrypteData: res.encryptedData, //用户敏感信息
                iv: res.iv //解密算法的向量
              },
              success: function (hres) {
                
                if (hres.data.code == 200) {
                  // 7.小程序存储skey（自定义登录状态）到本地
                  wx.setStorageSync('token', hres.data.data.token);
                } else {
                  console.log('服务器异常');
                }
              },
              fail: function (error) {
                //调用服务端登录接口失败
                console.log(error);
              }
            })
          },
          fail: res => {
            
          }
        })

      },
      fail: res => {
        
      }
    })


  },

globalData: {
    show: true, 
    userInfo: null,
    hasUserInfo: false
  }

  
})