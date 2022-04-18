// pages/history/history.js

import myrequest from "../../utils/request";

Page({


    data: {

        show: true,

        token: "",

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
        isLast: false,
        pageNumber: 1
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
        const url = "/mission/history/" + this.data.pageNumber + "/8"
        myrequest.get(url, {}, {
            token: token
        }).then(res => {
            console.log(res)
            console.log(this.data.pageNumber)
            if (res.data.hasNextPage == false) {
                this.setData({
                    isLast: true
                })
            }

            const newClassList = this.data.classList.concat(res.data.list)


            this.setData({
                classList: newClassList
            })

            this.setData({
                isloading: false
            })
        })

    },

  reFreshClass() {
     
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
        const url = "/mission/history/" + this.data.pageNumber + "/8"
        myrequest.get(url, {}, {
            token: token
        }).then(res => {

            this.setData({
                classList: res.data.list
            })
            this.setData({
                isloading: false
            })
        })

    },


    showPopup() {
        this.setData({
          show: true
        });
      },
  
      onClose() {
        this.setData({
          show: false
        });
      },
  
  
  
      onGetUserInfo() {

        //顺序执行
        setTimeout(()=>{
          
            wx.showLoading({
                title: '正在登陆',
              })
              wx.login({
                timeout: 3000,
                success: login_res => {
                  // 2. 小程序通过wx.request()发送code到开发者服务器
                  myrequest.post("/login", {
                    code: login_res.code, //临时登录凭证
                    
                  },{
                    'content-type': 'application/x-www-form-urlencoded'
                  }).then(hres => {
                    if (hres.code == 200) {
                      // 7.小程序存储skey（自定义登录状态）到本地
                      wx.setStorageSync('token', hres.data.token);
                    } else {
                      console.log('服务器异常');
                      wx.showToast({
                        title: '登录失败',
                        duration: 1500,
                      })
                    }
                    
                    wx.showToast({
                      title: '登录成功',
                      duration: 1500,
                    })
                  })
                },
                
              })
            setTimeout(()=>{
                
                this.reFreshClass()
            },2000)

        },1000)
        
            
        
  
  
        this.onClose()
       
  
      },

  

    onLoad: function (options) {

        const token = wx.getStorageSync('token')

        this.setData({
            token: token
        })
        if (token !== '') {
            myrequest.get("/isactive", {}, {
                'token': token
            }).then(res => {
                //账号在线
                if (res.code == 200) {
                    this.changeLogin();
                }
            })

        }



    },


    onReady: function () {

    },


    onShow: function () {

        if (this.data.token == "") {
            const token = wx.getStorageSync('token')

            this.setData({
                token: token
            })
        }



        this.reFreshClass()
    },

    onHide: function () {

    },

    onUnload: function () {

    },

    onPullDownRefresh: function () {
        this.reFreshClass()
    },


    onReachBottom: function () {
        if (this.data.isLast == true) {
            return
        }
        this.setData({

            pageNumber: parseInt(this.data.pageNumber) + parseInt(1),

        })

        this.getClass()
    },


    onShareAppMessage: function () {

    }
})