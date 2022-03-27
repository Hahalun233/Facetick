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

    onGetUserInfo() {

        wx.getUserProfile({
            desc: 'desc',
            success: res => {
                this.data.userInfo = res.userInfo;
                this.data.hasUserInfo = true;

                wx.login({
                    timeout: 3000,
                    success: login_res => {
                        console.log("login_res", login_res)
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