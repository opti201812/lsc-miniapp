import { API } from '../../utils/constants'

// API 请求封装
const request = async (endpoint, options = {}) => {
    const token = wx.getStorageSync('token')
    const header = {
        'content-type': 'application/json',
        ...options.headers
    }

    if (token) {
        header['authorization'] = `Bearer ${token.trim()}`
    }

    try {
        const response = await new Promise((resolve, reject) => {
            wx.request({
                url: `${API.BASE_URL}${endpoint}`,
                ...options,
                header,
                success: resolve,
                fail: reject
            })
        })

        if (response.statusCode >= 200 && response.statusCode < 300) {
            return response.data
        }

        throw new Error(
            response.data?.error ||
            response.data?.message ||
            response.errMsg ||
            '请求失败'
        )
    } catch (error) {
        console.error('API Request Error:', error)
        throw error
    }
}

export default request 