// pages/myClassInfo/myClassInfo.js
import myrequest from '../../utils/request'

var QRcode = require('../../utils/weapp-qrcode')
var qrcode;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //定时器
        time: '0',
        imageURL: "/icons/classphoto.png",
        studentList: [],
        token: null,
        //请求目标开始页数
        pageNumber: 1,
        showQrcode: false,
        //二维码内容:coourseid
        text: null,
        // image: '',
        className: null,
        //发起签到弹出层
        showAttendance: false,
        roomName: null,
        roomId: null,
        missionId: null,
        //是否正在考勤
        isAttentance: false,
        //扫描二维码选择教室
        value: null,
        //进度条参数
        progress: 37,
        //tabbar
        active: 1,
        //已到同学名单
        goodStudents: [

        ],
        //未到同学名单
        badStudents: [
        ]


    },

    //定时器
    start: function () {
        console.log("start")
        startTimer(this)
    },
    pause: function () {
        console.log("pause")
        stopTime()
    },






    //获得学生列表
    getStudent() {
        this.setData({
            //开始加载
            isloading: true
        })
        const token = wx.getStorageSync('token')
        const url = "/student/list/courseid/" + this.data.pageNumber + "/8/" + this.data.text

        myrequest.get(url, {}, {
            'token': token
            //sucess
        }).then(res => {

            if (res.hasNextPage == false) {
                this.setData({
                    isLast: true
                })
            }

            // const newStudentList = this.data.studentList.concat(res.data.list)

            this.setData({
                studentList: res.data.list
            })
            this.setData({
                isloading: false
            })
        })
        console.log(this.data.studentList)
    },

    refrashStudent() {


        this.setData({
            //开始加载
            isloading: true
        })

        const url = "/student/list/courseid/" + "1/8/" + this.data.text

        myrequest.get(url, {}, {
            'token': this.data.token
            //sucess
        }).then(res => {

            if (res.hasNextPage == false) {
                this.setData({
                    isLast: true
                })
            }

            this.setData({
                studentList: res.data.list
            })
            this.setData({
                isloading: false
            })
        })
    },

    //添加学生
    addStudent() {
        this.showPopup()
        qrcode.makeCode(this.data.text)
        this.refrashStudent()
    },

    //弹出层功能
    showPopup() {
        this.setData({
            showQrcode: true
        });



    },

    onClose() {
        this.setData({
            showQrcode: false
        });

        this.refrashStudent()
    },


    showAttendance() {
        this.setData({
            showAttendance: true
        })
    },

    onCloseAttendance() {
        this.setData({
            showAttendance: false
        })
    },


    //扫码获得教室
    getRoomName() {
       
        wx.scanCode({
            success: res => {
                console.log('roomid', res)
                this.setData({
                    roomId: res.result,
                    value: null
                })
            }
        })

    },




    //开始考勤
    startAttendance() {
        if(this.data.roomId==null){
            wx.showToast({
              title: '请先选择教室',
              icon:'error'
            })
            return
        }
        
        this.setData({
            isAttentance: true
        })
        const url = "/mission/launch/" + this.data.text + "/" + this.data.roomId
        myrequest.get(url, {}, {
            token: this.data.token
        }).then(res => {
            this.setData({
                missionId: res.data
            })

        })

        //刷新考勤信息
        // this.start
    },

    //结束考勤
    endAttentence() {
        this.setData({
            isAttentance: false
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
            text: options.classId,
            className: options.className,
            value: '扫描教授机客户端二维码选择教室',
        })
        this.getStudent();
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
        this.refrashStudent()
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
        this.refrashStudent();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

        if (this.data.isloading) {

            return
        }
        //无新数据
        if (this.isLastPage == true) {
            return
        }
        this.setData({

            pageNumber: parseInt(this.data.pageNumber) + parseInt(1),

        })

        this.getStudent()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})


var time = 1;
var timer;
//开启定时器
function startTimer(that) {
    timer = setTimeout(function () {
        console.log("time:",time);
        time++;
        // wx.request({
        //   url: 'url',
        //   method: '',
        //   hearder:{},
        //   data:{},
        //   success: function (res) {
        //       console.log(res)
        //       that.setData({

        //       })
        //       startTimer(that)
        //   }
        // })
        startTimer(that)
    },1000);
};

function stopTime() {
    if(timer!=null){
        clearTimeout(timer)
    }
}