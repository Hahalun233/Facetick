// pages/home/home.js
import myrequest from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    showLogin: false,
    showGetInfo: false,
    tchName: null,
    tchNo: null,
  },
  upLoadInfo() {

    var token = wx.getStorageSync('token')
    if (this.data.tchName == null || this.data.tchNo == null) {
      wx.showToast({
        title: '请完善个人信息',
        duration: 1500,
        icon: 'error',
      })
    } else {

      var url = "/profile/set/" + this.data.tchName + "/" + this.data.tchNo
      myrequest.get(url, {}, {
        token: token
      }).then(res => {
        if (res.code == 200) {
          wx.showToast({
            title: '上传成功',
            duration: 1500,
            icon: 'success',
            image: 'image',
          })
          this.onClose();
        }
      })
    }







  },





  showLoginPopup() {
    this.setData({
      showLogin: true
    })
  },

  onCloseLogin() {
    this.setData({
      showLogin: false
    })
  },


  onGetUserInfo() {
    wx.showLoading({
      title: '正在登陆',
    })
    wx.login({
      timeout: 3000,
      success: login_res => {
        // 2. 小程序通过wx.request()发送code到开发者服务器
        myrequest.post("/login", {
          code: login_res.code, //临时登录凭证

        }, {
          'content-type': 'application/x-www-form-urlencoded'
        }).then(hres => {
          if (hres.code == 200) {
            // 7.小程序存储skey（自定义登录状态）到本地
            wx.setStorageSync('token', hres.data.token);
          } else {
            console.log('服务器异常');
            wx.showToast({
              title: '登录失败',
              duration: 1500,
            })
          }

          wx.showToast({
            title: '登录成功',
            duration: 1500,
          })
        })
      },
      fail: res => {

      }
    })


    this.onCloseLogin()


  },


  //弹出层功能
  showPopup() {
    this.setData({
      showGetInfo: true
    });
  },
  onClose() {
    this.setData({
      showGetInfo: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})