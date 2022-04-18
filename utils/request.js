// const BASE_URL = "http://124.222.177.142:8082/api/v1/tc"
const BASE_URL = "http://192.168.38.188:8082/api/v1/tc"
class MyRequest {
  request(url, method, params,header) {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        header:header,
        success: function(res) {
          wx.hideLoading({
          })
          resolve(res.data)

        },
        fail(error){
          wx.showToast({
            title: '加载失败',
            duration:1500,
            icon:'error'
          })
        },
        
      })
    })
  }

  get(url, params,header) {
    return this.request(url, "GET", params,header)
  }

  post(url, data, header) {
    return this.request(url, "POST", data, header)
  }
}

const myrequest = new MyRequest()

export default myrequest
