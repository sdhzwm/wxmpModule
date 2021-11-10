const baseUrl = getApp().globalData.baseUrl;

const CZ = require("../CZToast");

//封装get方法
const get = (url, options = {}) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}

//封装post方法
const post = (url, options = {}) => {
    return request(url, {
        method: 'POST',
        data: options
    })
}

//封装put方法
const put = (url, options) => {
    return request(url, {
        method: 'PUT',
        data: options
    })
}
//封装remove方法，DELETE关键字不能声明
const remove = (url, options = {}) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}

const request = (url, options) => {
    let fullUrl = '${baseUrl}/${url}';
    CZ.cz_loading("加载中")
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseurl + url, //请求的接口地址
            timeout: 5000,    // 请求超时时间
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: getheader,
            success(request) { //监听成功后的操作
                if (request.statusCode === 200 && request.data.code === 0) {
                    resolve(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {  //返回失败也同样传入reject()方法
                reject(error.data)
            },
            complete: () => {
                // 请求完成关闭Loading
                cz_hideLoading();
            }
        })
    })
}

function getheader() {
    return {
        "content-type": "application/json; charset=UTF-8",
        "": "",
    }
}
module.exports = {
    get,
    post,
    put,
    remove
}
