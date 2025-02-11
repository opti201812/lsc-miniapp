/* eslint-disable new-cap */
App({
    globalData: {
        userInfo: null
    },

    onLaunch() {
        // 初始化云开发环境
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                env: 'lsc-dev-xxxxx', // 替换为你的云开发环境ID
                traceUser: true,
            });
        }

        // 检查登录状态
        this.checkLogin();
    },

    onShow() {
        // 小程序显示时执行
        console.log('App Show');
    },

    onHide() {
        // 小程序隐藏时执行
        console.log('App Hide');
    },

    // 检查登录状态
    checkLogin() {
        wx.login({
            success: (res) => {
                if (res.code) {
                    // TODO: 发送 res.code 到后台换取 openId, sessionKey, unionId
                    console.log('登录成功，code:', res.code);
                } else {
                    console.log('登录失败：' + res.errMsg);
                }
            }
        });
    }
}); 