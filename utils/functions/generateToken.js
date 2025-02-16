import { generateSignature } from './security'

// 使用小程序自带的 ArrayBuffer 替代
const toBuffer = (base64Str) => {
    const str = wx.base64ToArrayBuffer(base64Str)
    return str
}

// 统一的 Token 生成逻辑
export const generateToken = (userId, secret) => {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    }
    const payload = {
        userId,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
    }

    const base64Header = wx.arrayBufferToBase64(
        new Uint8Array(
            new TextEncoder().encode(JSON.stringify(header))
        )
    ).replace(/=/g, '')

    const base64Payload = wx.arrayBufferToBase64(
        new Uint8Array(
            new TextEncoder().encode(JSON.stringify(payload))
        )
    ).replace(/=/g, '')

    // 在云端使用真实签名，本地使用固定签名
    const signature = secret ? generateSignature(base64Header, base64Payload, secret) : 'dev_signature'

    return `${base64Header}.${base64Payload}.${signature}`
}

// 本地使用
export const generateLocalToken = (userId) => {
    return generateToken(userId)
}

// 云函数使用
export const generateCloudToken = (userId, secret) => {
    return generateToken(userId, secret)
}

const arrayBufferToBase64 = (buffer) => {
    return wx.arrayBufferToBase64(buffer).replace(/=+$/, '')
} 