// app.js
//apipromise化
import { promisifyAll } from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx,wxp)

App({
  onLaunch() {
    // wx.setStorageSync('token', "token")
    
    if(wx.getStorageSync('token') ==""){
      //缓存中无登录信息，重新登录
      //弹出登录popup层
      
      
    }else{
      //已有登录信息，无需再次登录
      
    }
    

   
  },
  

 

globalData: {
    show: true, 
    userInfo: null,
    hasUserInfo: false
  }

  
})