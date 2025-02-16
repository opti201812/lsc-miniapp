import { userApi } from '../../functions/api/user'
import { getUseCloud, setUseCloud } from '../../utils/config'
import { API } from '../../utils/constants'

describe('API Integration Tests', () => {
    beforeEach(() => {
        // 清理存储
        wx.clearStorageSync()
    })

    describe('Local Environment', () => {
        beforeEach(() => {
            setUseCloud(false)
        })

        test('login should call API endpoint', async () => {
            // 获取真实的登录 code
            const loginResult = await wx.login()
            const code = loginResult.code
            console.log("==> ~ code:", code)

            const result = await userApi.login(code)

            expect(result).toHaveProperty('token')
            expect(result).toHaveProperty('openid')
        }, 5000) // 缩短为 5 秒

        test('getUserInfo should call API endpoint', async () => {
            // 先登录获取 token
            const loginResult = await wx.login()
            const code = loginResult.code
            const loginResponse = await userApi.login(code)
            wx.setStorageSync('token', loginResponse.token)

            const result = await userApi.getUserInfo()

            expect(result).toHaveProperty('data')
            expect(result.data).toHaveProperty('name')
            expect(result.data).toHaveProperty('avatar')
        }, 5000) // 缩短为 5 秒

        test('should handle API error', async () => {
            // 使用无效的 code
            const invalidCode = 'invalid_code'

            await expect(userApi.login(invalidCode)).rejects.toThrow()
        }, 5000) // 缩短为 5 秒
    })
}) 