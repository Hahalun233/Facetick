// const BASE_URL = "http://124.222.177.142:8082/api/v1/tc"
const BASE_URL = "http://172.20.10.3:8082/api/v1/tc"
class ezRequest {
  request(url, method, params,header) {

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

const ezrequest = new ezRequest()

export default ezrequest
