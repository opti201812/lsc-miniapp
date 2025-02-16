/* eslint-disable new-cap */
import { callFunction } from './utils/api'
import { USE_CLOUD } from './utils/config'
import { userService } from './utils/user'

App({
    globalData: {
        userInfo: null,
        token: null
    },

    async onLaunch() {
        try {
            // 只在已登录状态下获取用户信息
            if (userService.isLoggedIn()) {
                // 获取用户信息
                const userInfo = await userService.getUserInfo()
                this.globalData.userInfo = userInfo
            }
        } catch (error) {
            console.error('App init error:', error)
        }
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
    async checkLogin() {
        try {
            const result = await callFunction('generateToken', {
                userId: '123'
            })
            console.log('Token:', result.result)
        } catch (error) {
            console.error('Error:', error)
        }
    }
}); 