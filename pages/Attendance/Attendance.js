// pages/Attendance/Attendance.js
import myrequest from '../../utils/request'
import ezrequest from '../../utils/ezRequest'
var QRcode = require('../../utils/weapp-qrcode')
var qrcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //定时器
        // time: '0',
        setInter: '', //设置定时器
        imageURL: "/icons/classphoto.png",
        roomId: null,
        //考勤id
        missionId: null,
        //进度条参数
        progress: 47.564,
        courseId: null,
        value: null,
        token: null,
        //已到同学名单
        goodStudents: [],
        //未到同学名单
        badStudents: []
    },

    //定时器
    // start: function () {
    //     console.log("start")
    //     startTimer(this)
    // },
    // pause: function () {
    //     console.log("pause")
    //     stopTime()


    // },

    //循环方法
    notification: function () {

    },


    stopAttendence() {

        //清除计时器  即清除setInter
        clearInterval(this.data.setInter)
        //通知服务器停止
        var url = "/mission/stop/" + this.data.missionId
        console.log("stop", url)

        myrequest.get(url, {

        }, {
            token: this.data.token
        }).then(res => {
            if (res.data == "200") {
                wx.showToast({
                    title: '考勤已停止',
                })
            }
        })
    },



    //开始考勤
    startAttendance() {
        if (this.data.roomId == null) {
            wx.showToast({
                title: '请先选择教室',
                icon: 'error'
            })
            return
        }
        this.setData({
            isAttentance: true
        })





        //开启教师机摄像头
        const url = "/mission/launch/" + this.data.courseId + "/" + this.data.roomId
        console.log(url)
        myrequest.get(url, {}, {
            token: this.data.token
        }).then(res => {

            this.setData({
                missionId: res.data
            })

            //获得考勤结果
            var url = '/mission/status/' + this.data.missionId
            myrequest.get(url, {

            }, {
                token: this.data.token
            }).then(res => {
                console.log(res)
            })

            // 持续获得考勤名单
            var _this = this
            _this.data.setInter = setInterval(function () {
                var url = '/mission/status/' + _this.data.missionId


                ezrequest.get(url, {

                }, {
                    token: _this.data.token
                }).then(res => {
                    _this.setData({
                        progress:res.data.present/res.data.present,
                        goodStudents:res.data.presentList,
                        badStudents:res.data.absentList,
                    })
                    console.log(res)
                })

                console.log('请求一次')
            }, 1000); // 一秒打印一次

        })



        // wx.request({
        //     url: '/mission/status/'+this.data.missionId,
        //     method: 'GET',
        //     hearder:{token:this.data.token},
        //     data:{},
        //     success: function (res) {
        //         console.log(res)
        //     }
        //   })
    },
    //扫码获得教室
    getRoomName() {
        wx.scanCode({
            success: res => {

                this.setData({
                    roomId: res.result,
                    value: null
                })



            }
        })



    },

    onChangeTabbar(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            active: event.detail
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            token: wx.getStorageSync('token'),
            courseId: options.courseId,
            value: "点此扫描教授机客户端二维码选择教室"
        })
        qrcode = new QRcode('canvas', {
            text: this.data.classId,
            image: '/assets/images/logo.png',
            width: 150,
            height: 150,
            colorDark: "#1CA4FC",
            colorLight: "white",
            // correctLevel: QRCode.CorrectLevel.H,
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