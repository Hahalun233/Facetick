// pages/history/history.js
import myrequest from "../../utils/request";
const app = getApp();
Page({


    data: {
        //判断登录状态
        isLogin: false,
        //搜索内容
        value: '',
        //班级列表
        classList: [{
                classInfo: "Java程序设计",
                className: "RB软工数182"
            },
            {
                classInfo: "Web网页设计",
                className: "RB软工数182"
            },
            {
                classInfo: "大学英语",
                className: "RB软工数182"
            },
            {
                classInfo: "算法分析与设计",
                className: "RB软工数182"
            },
            {
                classInfo: "计算机组成原理",
                className: "RB软工互182"
            },
            {
                classInfo: "Java程序设计",
                className: "RB软工数182"
            },
            {
                classInfo: "算法分析与设计",
                className: "RB软工数182"
            },
            {
                classInfo: "计算机组成原理",
                className: "RB软工互182"
            },
            {
                classInfo: "Java程序设计",
                className: "RB软工数182"
            },
            {
                classInfo: "算法分析与设计",
                className: "RB软工数182"
            },
            {
                classInfo: "计算机组成原理",
                className: "RB软工互182"
            },
            {
                classInfo: "Java程序设计",
                className: "RB软工数182"
            },
        ],
        //节流阀
        isLoading: false
    },

    changeLogin() {
        this.setData({
            isLogin: "true"
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
        this.setData({
            //正在加载
            isLoading: true
        })
        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: 'url',
            method: getApp,
            sucess: ({
                data: res
            }) => {
                this.setData({
                    classList: [...this.data.classList, ...res.data]
                })
            },
            complete: () => {
                wx.hideLoading({})
                this.setData({
                    //关闭节流阀
                    isLoading: false
                })
            }

        })

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