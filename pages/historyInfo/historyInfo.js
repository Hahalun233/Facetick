import myrequest from "../../utils/request"

// pages/historyInfo/historyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: null,
    time: null,
    courseId:null,
    token:null,
    goodStudents:[],
    badStdents:[],
    appealStudents:[],
  },

  onAppeal(e){
    wx.showModal({
      title:"提示",
      content:"确认为该学生补签？",
      success:(res)=>{
        var url = "/mission/setproblem/"+e.currentTarget.dataset['index']+"/"+this.data.courseId
        myrequest.get(url,{},{token:this.data.token}).then(res=>{
          console.log(res)
        })
      }

    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      token:wx.getStorageSync('token'),
      courseId:options.courseId,
      className:options.className,
      time:options.time
    })

    var url = "/mission/status/"+this.data.courseId
    myrequest.get(url,{},{token:this.data.token}).then(res=>{
      this.setData({
        goodStudents:res.data.presentList,
        badStdents:res.data.absentList,
        appealStudents:res.data.problemList
      })
    })
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