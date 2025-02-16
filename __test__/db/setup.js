// 在测试环境中设置 process.env.NODE_ENV
process.env.NODE_ENV = 'test'

// 模拟微信小程序环境
global.wx = {
    setStorageSync: jest.fn((key, data) => {
        // 实现一个简单的内存存储
        if (!global.wxStorage) global.wxStorage = new Map()
        global.wxStorage.set(key, data)
    }),
    getStorageSync: jest.fn((key) => {
        if (!global.wxStorage) return null
        return global.wxStorage.get(key)
    }),
    removeStorageSync: jest.fn((key) => {
        if (global.wxStorage) global.wxStorage.delete(key)
    }),
    clearStorageSync: jest.fn(() => {
        global.wxStorage = new Map()
    }),
    cloud: {
        database: jest.fn(() => null) // 返回空实现
    },
    arrayBufferToBase64: jest.fn(buffer => Buffer.from(buffer).toString('base64')),
    base64ToArrayBuffer: jest.fn(base64 => Buffer.from(base64, 'base64')),
    createHash: jest.fn(({ type, data }) => ({
        digest: () => new Uint8Array([1, 2, 3, 4]) // 模拟哈希结果
    })),
    request: jest.fn(),
    // 移除对 wx.login 的模拟
    login: jest.fn().mockResolvedValue({
        code: 'mock_login_code', // 这里可以改为真实的调用
        errMsg: 'login:ok'
    }),
    cloud: {
        callFunction: jest.fn()
    },
    // 添加 showToast 模拟
    showToast: jest.fn(),
    // 添加其他可能需要的 API 模拟
    hideToast: jest.fn(),
    showLoading: jest.fn(),
    hideLoading: jest.fn()
}

// 模拟 TextEncoder
global.TextEncoder = require('util').TextEncoder

// 清理所有的 mock
beforeEach(() => {
    jest.clearAllMocks()
    global.wxStorage = new Map()
}) 