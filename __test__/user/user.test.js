import { userService } from '../../functions/services/user'

describe('User Service Integration Tests', () => {
    beforeEach(() => {
        // 清理存储
        wx.clearStorageSync()
    })

    describe('doLogin', () => {
        test('should handle successful login', async () => {
            const result = await userService.doLogin()

            expect(result).toHaveProperty('token')
            expect(result).toHaveProperty('openid')
            expect(wx.getStorageSync('token')).toBeTruthy()
            expect(wx.getStorageSync('openid')).toBeTruthy()
        }, 5000)

        test('should handle login failure', async () => {
            // 模拟 wx.login 失败
            jest.spyOn(wx, 'login').mockRejectedValueOnce(new Error('登录失败'))

            await expect(userService.doLogin()).rejects.toThrow('登录失败')

            // 验证是否显示了错误提示
            expect(wx.showToast).toHaveBeenCalledWith({
                title: '登录失败',
                icon: 'none',
                duration: 2000
            })
        }, 5000)
    })

    describe('getUserInfo', () => {
        test('should get user info successfully', async () => {
            // 先登录
            await userService.doLogin()

            const result = await userService.getUserInfo()

            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('avatar')
        }, 5000)

        test('should handle error when not logged in', async () => {
            await expect(userService.getUserInfo()).rejects.toThrow()
        }, 5000)
    })

    describe('isLoggedIn', () => {
        test('should return true when token exists', () => {
            wx.setStorageSync('token', 'test_token')
            expect(userService.isLoggedIn()).toBe(true)
        })

        test('should return false when token does not exist', () => {
            expect(userService.isLoggedIn()).toBe(false)
        })
    })

    describe('logout', () => {
        test('should clear token and openid', () => {
            wx.setStorageSync('token', 'test_token')
            wx.setStorageSync('openid', 'test_openid')

            userService.logout()

            expect(wx.getStorageSync('token')).toBeFalsy()
            expect(wx.getStorageSync('openid')).toBeFalsy()
        })
    })
}) 