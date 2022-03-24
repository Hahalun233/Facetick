// pages/myClass/myClass.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
    },

    onChange(e) {
        this.setData({
            value: e.detail,
        })
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getClass()
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