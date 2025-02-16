import { API, MINIAPP_CONFIG } from './constants'
import { getUseCloud } from './config'

// API 请求封装
const request = async (endpoint, options = {}) => {
    const token = wx.getStorageSync('token')
    console.log('Current token:', token)  // 添加日志检查token

    // 创建新的 header 对象
    const header = {  // 注意：微信小程序使用 'header' 而不是 'headers'
        'content-type': 'application/json',  // 注意：微信小程序要求使用小写
        ...options.headers
    }

    if (token) {
        header['authorization'] = `Bearer ${token.trim()}`  // 使用小写
    }

    console.log('Request header:', header)  // 检查请求头

    try {
        const response = await new Promise((resolve, reject) => {
            wx.request({
                url: `${API.BASE_URL}${endpoint}`,
                ...options,
                header,  // 使用 header 而不是 headers
                success: resolve,
                fail: reject
            })
        })

        // 检查 HTTP 状态码
        if (response.statusCode >= 200 && response.statusCode < 300) {
            return response.data
        }

        // 处理错误响应
        const errorMessage = response.data?.error ||
            response.data?.message ||
            response.errMsg ||
            '请求失败'
        console.error('Server Error:', response.data)
        throw new Error(errorMessage)
    } catch (error) {
        console.error('API Request Error:', error)
        // 处理网络错误
        if (error.errMsg?.includes('request:fail')) {
            throw new Error('网络连接失败，请检查网络设置')
        }
        throw error
    }
}

// 用户相关 API
export const userApi = {
    // 登录
    async login(code) {
        if (getUseCloud()) {
            return wx.cloud.callFunction({
                name: 'login',
                data: { code }
            })
        } else {
            console.log('Sending login request:', {
                url: `${API.BASE_URL}${API.ENDPOINTS.LOGIN}`,
                method: 'POST',
                data: { code }  // 使用简单的数据格式
            })

            const result = await request(API.ENDPOINTS.LOGIN, {
                method: 'POST',
                data: { code }  // 使用简单的数据格式
            })
            console.log('Login response:', result)
            return result
        }
    },

    // 获取用户信息
    async getUserInfo() {
        if (getUseCloud()) {
            // 云环境 - 使用云函数调用
            return wx.cloud.callFunction({
                name: 'getUserInfo'
            })
        } else {
            // 本地环境 - 直接调用 API
            return request(API.ENDPOINTS.USER_INFO, {
                method: 'GET'
            })
        }
    },

    // 更新用户信息
    async updateUserInfo(data) {
        if (getUseCloud()) {
            // 云环境 - 使用云函数调用
            return wx.cloud.callFunction({
                name: 'updateUserInfo',
                data
            })
        } else {
            // 本地环境 - 直接调用 API
            return request(API.ENDPOINTS.UPDATE_USER, {
                method: 'PUT',
                data
            })
        }
    }
} 