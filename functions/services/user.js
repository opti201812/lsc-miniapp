import { userApi } from '../api/user'

export const userService = {
    // 执行登录
    async doLogin() {
        try {
            const res = await userApi.doLogin()
            return res
        } catch (error) {
            console.error('Login failed:', error)
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
        return userApi.isLoggedIn()
    },

    // 登出
    logout() {
        userApi.logout()
    }
} 