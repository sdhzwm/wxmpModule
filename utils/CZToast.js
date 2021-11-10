const publicCZ = {
    /**
    * Loading转圈圈
    * @param {nunber} mask - 不传默认不显示透明蒙层
    * @param {string} msg - 提示语 默认值：加载中
    */
    cz_loading(mask, msg) {
        let Mask = mask ? true : false;
        let Msg = msg ? msg : "加载中"
        wx.showLoading({
            title: Msg,
            mask: Mask
        })
    },
    /**
    * Loading取消转圈圈
    */
    cz_hideLoading() {
        wx.hideLoading();
    },
    /**
    * Toast提示
    * @param {string} msg - 提示内容
    * @param {string} icon - icon图标 成功success 加载中loading 无样式none
    * @param {number} time - 提示存在时长
    */
    cz_toast(msg, icon, time) {
        let Icon = icon === 1 ? "success" : "none";
        wx.showToast({
            title: msg,
            icon: Icon,
            duration: time || 2000
        })
    },
    /**
    * 带确认的提示框
    * @param {string} msg - 提示内容
    */
    cz_alert(msg) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: '温馨提示',
                content: msg,
                showCancel: false,
                confirmColor: "#007AFF",
                success(res) {
                    // 此弹窗只有确认键，没有取消键，所以只写了resolve没有reject
                    resolve(res);
                }
            })
        })
    },
    /**
    * 带确认和取消的提示框
    * @param {string} msg - 提示内容
    */
    cz_confirm(msg) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: '温馨提示',
                content: msg,
                cancelColor: "#000000",
                confirmColor: "#007AFF",
                success(res) {
                    if (res.confirm) {
                        resolve(res);
                    } else if (res.cancel) {
                        reject(res)
                    }
                }
            })
        })
    },
    /**
    * 微信登陆 wx.login
    */
    cz_wxLogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success(res) {
                    if (res.code) {
                        resolve(res.code)
                    } else {
                        reject(res.errMsg);
                    }
                }
            })
        });
    }
}

module.exports = publicCZ;
