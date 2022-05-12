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
        roomName:null,
        //考勤id
        missionId: null,
        //进度条参数
        progress: 0,
        courseId: null,
        value: null,
        token: null,
        //已到同学名单
        goodStudents: [],
        //未到同学名单
        badStudents: [],
        //是否正在考勤
        isAttentance: false,
        //重新加载标志

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

        if (this.data.isAttentance == false) {
            wx.showToast({
                title: '请先开始考勤',
                icon: 'error'
            })

            return
        }

        wx.setStorageSync('missionId', )
        //清除计时器  即清除setInter
        clearInterval(this.data.setInter)
        //通知服务器停止
        var url = "/mission/stop/" + this.data.missionId
        console.log("stop", url)

        myrequest.get(url, {

        }, {
            token: this.data.token
        }).then(res => {
            this.setData({
                isAttentance: false
            })
            wx.showToast({
                title: '考勤已停止',
            })

        })
    },



    //开始考勤
    startAttendance() {

        if (this.data.isAttentance == true) {
            wx.showToast({
                title: '考勤正在进行',
                icon: 'error'
            })
            return
        }
        if (this.data.roomId == null) {
            wx.showToast({
                title: '请先选择教室',
                icon: 'error'
            })
            return
        }




        //开启教师机摄像头
        const url = "/mission/launch/" + this.data.courseId + "/" + this.data.roomId
        console.log(url)
        myrequest.get(url, {}, {
            token: this.data.token
        }).then(res => {

            this.setData({
                isAttentance: true,
                missionId: res.data,

            })
            //将考勤任务id缓存，用于退出再返回改界面时继续任务
            wx.setStorageSync('missionId', this.data.missionId)
            wx.setStorageSync('roomId', this.data.roomId)
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
                    var p = (res.data.present / res.data.total) * 100
                    console.log(p)
                    _this.setData({
                        progress: p,
                        goodStudents: res.data.presentList,
                        badStudents: res.data.absentList,
                    })
                    console.log(res)
                })

                console.log('请求一次')
            }, 1000); // 一秒打印一次

        })
    },
    //继续考勤
    reLoadAttendance() {
        console.log("重新加载考勤")
        this.setData({
            isAttentance: true
        })
        isAttentance: true






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
                var p = (res.data.present / res.data.total) * 100
                console.log(p)
                _this.setData({
                    progress: p,
                    goodStudents: res.data.presentList,
                    badStudents: res.data.absentList,
                })

            })

            console.log('请求一次')
        }, 1000); // 一秒打印一次


    },






    // wx.request({
    //     url: '/mission/status/'+this.data.missionId,
    //     method: 'GET',
    //     hearder:{token:this.data.token},
    //     data:{},
    //     success: function (res) {
    //         console.log(res)
    //     }
    //   })

    //扫码获得教室
    getRoomName() {
        //扫码结果
        wx.scanCode({
            success: res => {
                this.setData({
                    roomId: res.result
                })

                var url = "/mission/clientname/" + res.result
                myrequest.get(url, {}, {
                    token: this.data.token
                }).then(hres => {
                    console.log(hres)
                    this.setData({
                        roomName: hres.data.clientname,
                        value: ""
                    })

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
        //如果有正在进行的考勤任务，获得该考勤缓存

        if (wx.getStorageSync('missionId') != "") {

            wx.showToast({
                title: '有考勤正在进行',
            })
            this.setData({
                missionId: wx.getStorageSync('missionId'),
                roomId: wx.getStorageSync('roomId'),
                value: "",
            })
            //持续获得该考勤数据，并启动定时器持续获得数据
            console.log("reLoad")
            this.reLoadAttendance()


        } else { //无考勤任务，正常初始化考勤界面
            this.setData({
                courseId: options.courseId,
                value: "点此扫描教授机客户端二维码选择教室"
            })
        }

        //初始化数据
        this.setData({

            token: wx.getStorageSync('token'),

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
        //退出该界面暂停刷新考勤数据，但不停止考勤任务
        if (this.data.isAttentance == true) {
            clearInterval(this.data.setInter)

        }

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