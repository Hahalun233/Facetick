// pages/myClass/myClass.js
import myrequest from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {

        //搜索内容
        value: '',
        //班级列表
        classList: [{
                id: "123",
                name: "Java"
            },
            {
                id: "183",
                name: "Java"
            }
        ],
        //节流阀
        isloading: false,
        //请求目标开始页数
        pageNumber: 1,
        //是否弹出添加班级界面
        showAddClass: false,
        //新添加班级名称
        className: null,
        //新添加班级教室
        classRoom: null,
        //登陆状态
        isLogin: false,
        //是否是最后一页
        isLast: false,



    },



    onDelete(e) {


        wx.showModal({
            title: '确定删除班级？',
            content: '该班级考勤记录会一并删除',
            success: res => {
                if (res.confirm == true) {
                    var id = e.currentTarget.dataset['index'];

                    var url = "/course/delete/" + id
                    myrequest.get(url, {}, {
                        token: wx.getStorageSync('token')
                    }).then(res => {
                        console.log(res)
                        this.refrashClass()
                    })
                }



            }
        })

    },





    //弹出层功能
    showPopup() {
        this.setData({
            showAddClass: true
        });



    },
    onClose() {
        this.setData({
            showAddClass: false
        });

        this.refrashClass()
    },






    //获得班级列表
    getClass() {

        //若没有登录，拒绝请求数据
        if (this.isLogin) {
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
        const url = "/course/list/" + this.data.pageNumber + "/12"
        myrequest.get(url, {}, {
            token: token
            //sucess
        }).then(res => {



            if (res.data.hasNext == false) {
                this.setData({
                    isLast: true
                })
            }

            const newClassList = this.data.classList.concat(res.data.courses)

            this.setData({
                classList: newClassList
            })
            this.setData({
                isloading: false
            })
        })



    },

    //刷新班级列表
    refrashClass() {
        //若没有登录，拒绝请求数据
        if (this.isLogin) {
            wx.showToast({
                title: '请先登录',
                duration: 1500,
                icon: 'error',
            })
            return
        }

        this.setData({
            //开始加载
            isloading: true,
            pageNumber: "1"
        })
        const token = wx.getStorageSync('token')
        const url = "/course/list/" + this.data.pageNumber + "/12"
        myrequest.get(url, {}, {
            'token': token
            //sucess
        }).then(res => {



            this.setData({
                classList: res.data.courses
            })
            this.setData({
                isloading: false
            })
        })
    },

    onChange(event) {

        this.setData({
            className: event.detail
        })
    },


    onChangeSearch(e) {
        this.setData({
            value: e.detail,
        });
    },

    addClass() {


        myrequest.post("/course/add", {
            name: this.data.className
        }, {
            token: wx.getStorageSync('token')
        }).then(res => {
            if (res.code == "200") {

                wx.showToast({
                    title: '添加成功',
                })

            } else if (res.error_code == "1024") {
                wx.showToast({
                    title: res.data.messgae,
                })
            }
        })

        this.setData({
            isLast: false,
            className: null
        })



        //关闭弹窗
        this.onClose();


    },

    changeLogin() {

        this.setData({
            isLogin: true
        })
    },

    onSearch() {
        Toast('搜索' + this.data.value);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({

        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    // onReachBottom: function () {



    //     //无新数据
    //     if (this.data.isLast == true) {
    //         return
    //     }
    //     this.setData({

    //         pageNumber: parseInt(this.data.pageNumber) + parseInt(1),

    //     })

    //     this.getClass()
    // },
    lowerFunction() {
        //无新数据
        if (this.data.isLast == true) {
            return
        }
        this.setData({

            pageNumber: parseInt(this.data.pageNumber) + parseInt(1),

        })

        this.getClass()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const token = wx.getStorageSync('token')
        if (token !== '') {
            myrequest.get("/isactive", {}, {
                'token': token
            }).then(res => {
                //账号在线
                if (res.code == 200) {
                    this.setData({
                        isLast: false
                    })
                    this.changeLogin();
                }
            })
        }
        this.refrashClass()
    },


    onHide: function () {

    },

    onUnload: function () {

    },


    onPullDownRefresh: function () {
        this.refrashClass();
    },



    onShareAppMessage: function () {

    }
})