import { userService } from '../../utils/user'

Page({
    data: {
        userInfo: null,
        isLoggedIn: false,
        loading: true
    },

    async onLoad() {
        this.checkLoginStatus()
    },

    async checkLoginStatus() {
        try {
            this.setData({ loading: true })
            const isLoggedIn = userService.isLoggedIn()
            this.setData({ isLoggedIn })

            if (isLoggedIn) {
                const userInfo = await userService.getUserInfo()
                this.setData({ userInfo })
            }
        } catch (error) {
            wx.showToast({
                title: '获取用户信息失败',
                icon: 'none'
            })
        } finally {
            this.setData({ loading: false })
        }
    },

    async handleLogin() {
        try {
            this.setData({ loading: true })
            await userService.doLogin()
            await this.checkLoginStatus()
            wx.showToast({
                title: '登录成功',
                icon: 'success'
            })
        } catch (error) {
            wx.showToast({
                title: '登录失败',
                icon: 'none'
            })
        } finally {
            this.setData({ loading: false })
        }
    },

    handleLogout() {
        userService.logout()
        this.setData({
            isLoggedIn: false,
            userInfo: null
        })
        wx.showToast({
            title: '已退出登录',
            icon: 'success'
        })
    }
}) 