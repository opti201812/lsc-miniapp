// 在测试环境中设置 process.env.NODE_ENV
process.env.NODE_ENV = 'test'

// Mock env.js
jest.mock('../utils/env', () => ({
    ENV: {
        isDev: process.env.NODE_ENV === 'test'
    }
}))

// ... 其他设置保持不变 