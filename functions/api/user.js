import { getUseCloud } from '../../utils/config'
import * as localUser from '../../localFunctions/user/index'

// 用户相关 API
export const userApi = {
    // 登录
    async login(code) {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'user',
                data: {
                    type: 'login',
                    data: { code }
                }
            })
        } else {
            return localUser.login(code)
        }
    },

    // 获取用户信息
    async getUserInfo() {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'user',
                data: {
                    type: 'getUserInfo'
                }
            })
        } else {
            return localUser.getUserInfo()
        }
    },

    // 更新用户信息
    async updateUserInfo(data) {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'user',
                data: {
                    type: 'updateUserInfo',
                    data
                }
            })
        } else {
            return localUser.updateUserInfo(data)
        }
    },

    // 检查登录状态
    isLoggedIn() {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'user',
                data: {
                    type: 'isLoggedIn'
                }
            })
        } else {
            return localUser.isLoggedIn()
        }
    },

    // 执行登录
    async doLogin() {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'user',
                data: {
                    type: 'doLogin'
                }
            })
        } else {
            return localUser.doLogin()
        }
    },

    // 登出
    logout() {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'user',
                data: {
                    type: 'logout'
                }
            })
        } else {
            return localUser.logout()
        }
    }
} 