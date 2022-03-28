const BASE_URL = "http://10.133.49.118:8082/api"

class MyRequest {
  request(url, method, params,header) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        header:header,
        success: function(res) {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, params) {
    return this.request(url, "GET", params)
  }

  post(url, data, header) {
    return this.request(url, "POST", data, header)
  }
}

const myrequest = new MyRequest()

export default myrequest
