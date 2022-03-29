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
        classList: [],
        //节流阀
        isloading: true,
        //请求目标开始页数
        pageNumber: 1,
        //是否弹出添加班级界面
        showAddClass: false,
        //新添加班级名称
        className: null,
        //新添加班级教室
        classRoom: null
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
    },

    

    //获得班级信息
    getInfo() {


    },

    

    getClass() {
        const token = wx.getStorageSync('token')
        const url = "/course/list/" + this.data.pageNumber + "/8"
        myrequest.get(url, {}, {
            'token': token
        }).then(res => {

            const newClassList = this.data.classList.concat(res.data.courses)
            this.setData({
                classList: newClassList
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

        // if (this.data.isloading) return
        this.setData({
            pageNumber: this.data.pageNumber + 1
        })
        this.getClass();
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        this.getClass()
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})