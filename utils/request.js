const BASE_URL = "http://124.222.177.142:8082/api/v1/tc"

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

  get(url, params,header) {
    return this.request(url, "GET", params,header)
  }

  post(url, data, header) {
    return this.request(url, "POST", data, header)
  }
}

const myrequest = new MyRequest()

export default myrequest
