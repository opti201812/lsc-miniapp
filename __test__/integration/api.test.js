import { userService } from '../../utils/user'
import { userApi } from '../../utils/api'

// Mock API responses
jest.mock('../../utils/api', () => ({
    userApi: {
        login: jest.fn().mockResolvedValue({
            token: 'test_integration_token',
            openid: 'test_integration_openid'
        }),
        getUserInfo: jest.fn(),
        updateUserInfo: jest.fn()
    }
}))

describe('API Integration Tests', () => {
    beforeEach(() => {
        // 清理存储和mock
        wx.clearStorageSync()
        jest.clearAllMocks()
    })

    test('should complete login flow', async () => {
        // 模拟 wx.login 成功
        wx.login.mockResolvedValueOnce({
            code: 'test_code',
            errMsg: 'login:ok'
        })

        const result = await userService.doLogin()

        expect(wx.login).toHaveBeenCalled()
        expect(userApi.login).toHaveBeenCalledWith('test_code')
        expect(result).toHaveProperty('token')
        expect(result).toHaveProperty('openid')
        expect(wx.getStorageSync('token')).toBe('test_integration_token')
        expect(wx.getStorageSync('openid')).toBe('test_integration_openid')
    })

    test('should handle login failure', async () => {
        // 模拟 wx.login 失败
        wx.login.mockRejectedValueOnce(new Error('wx.login failed'))

        await expect(userService.doLogin())
            .rejects.toThrow('wx.login failed')
    })
}) 