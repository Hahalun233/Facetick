// pages/history/history.js

import myrequest from "../../utils/request";

Page({


    data: {
        //判断登录状态
        isLogin: false,
        //搜索内容
        value: '',
        //班级列表
        classList: [],
        //节流阀
        isLoading: false,
        //请求目标开始页数
        pageNumber: 1,
    },

    
    changeLogin() {
        
        this.setData({
            
            isLogin: true
        })
    },

    onChange(e) {
        this.setData({
            value: e.detail,
        })
    },

    onSearch() {
        //
    },



    getClass() {
        //若没有登录，拒绝请求数据
        if(this.isLogin){
            wx.showToast({
              title: '请先登录',
              duration: 1500,
              icon: 'error',
            })
            return
        }
        this.setData({
            //开始加载
            isloading: true
        })
        const token = wx.getStorageSync('token')
        const url = "/course/list/" + this.data.pageNumber + "/8"

    },


    onLoad: function (options) {

    const token = wx.getStorageSync('token')
        
        if (token !== '') {
            myrequest.get("/isactive",{},{'token':token}).then(res=>{
                //账号在线
                if(res.code==200){
                    this.changeLogin();
                }
            })
            
        }
    },


    onReady: function () {

    },


    onShow: function () {

    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },


    onReachBottom: function () {

    },


    onShareAppMessage: function () {

    }
})