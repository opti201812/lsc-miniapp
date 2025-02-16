import request from '../../functions/api/index'
import { API } from '../../utils/constants'

// 本地函数实现 - 直接调用 API
export const login = async (code) => {
    return request(API.ENDPOINTS.LOGIN, {
        method: 'POST',
        data: { code }
    })
}

export const getUserInfo = async () => {
    return request(API.ENDPOINTS.USER_INFO, {
        method: 'GET'
    })
}

export const updateUserInfo = async (data) => {
    return request(API.ENDPOINTS.UPDATE_USER, {
        method: 'PUT',
        data
    })
}

export const isLoggedIn = () => {
    return !!wx.getStorageSync('token')
}

export const doLogin = async () => {
    const loginResult = await wx.login()
    if (!loginResult || !loginResult.code) {
        throw new Error('获取登录码失败')
    }

    const res = await login(loginResult.code)
    if (!res || !res.token) {
        throw new Error('登录响应格式错误')
    }

    // 保存登录信息
    wx.setStorageSync('token', res.token)
    if (res.openid) {
        wx.setStorageSync('openid', res.openid)
    }

    return res
}

export const logout = () => {
    wx.removeStorageSync('token')
    wx.removeStorageSync('openid')
} 