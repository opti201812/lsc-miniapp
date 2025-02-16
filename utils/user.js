import { userApi } from './api'
import { ENV } from './env'

// 使用小程序环境判断
const isDev = ENV.isDev

export const userService = {
    // 执行登录
    async doLogin() {
        try {
            // 获取登录码
            const loginResult = await wx.login()
            console.log('wx.login result:', loginResult)

            if (!loginResult || !loginResult.code) {
                throw new Error('获取登录码失败')
            }

            // 调用登录接口
            const res = await userApi.login(loginResult.code)
            console.log('Login API response:', res)

            // 检查响应格式
            if (!res || !res.token) {
                throw new Error('登录响应格式错误')
            }

            // 保存登录信息
            wx.setStorageSync('token', res.token)
            if (res.openid) {
                wx.setStorageSync('openid', res.openid)
            }

            // 立即验证 token 是否正确保存
            const savedToken = wx.getStorageSync('token')
            console.log('Saved token verification:', {
                original: res.token,
                saved: savedToken,
                isEqual: res.token === savedToken
            })

            return res
        } catch (error) {
            console.error('Login failed:', error)
            // 显示错误信息
            wx.showToast({
                title: error.message || '登录失败',
                icon: 'none',
                duration: 2000
            })
            throw error
        }
    },

    // 获取用户信息
    async getUserInfo() {
        try {
            const res = await userApi.getUserInfo()
            return res.data
        } catch (error) {
            console.error('Get user info failed:', error)
            throw error
        }
    },

    // 更新用户信息
    async updateUserInfo(data) {
        try {
            const res = await userApi.updateUserInfo(data)
            return res.data
        } catch (error) {
            console.error('Update user info failed:', error)
            throw error
        }
    },

    // 检查登录状态
    isLoggedIn() {
        return !!wx.getStorageSync('token')
    },

    // 登出
    logout() {
        wx.removeStorageSync('token')
        wx.removeStorageSync('openid')
    }
} 