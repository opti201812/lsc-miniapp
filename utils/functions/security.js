// 生成签名
export const generateSignature = (header, payload, secret) => {
    const signContent = `${header}.${payload}`
    const encoder = new TextEncoder()
    const data = encoder.encode(signContent)
    const key = encoder.encode(secret)

    // 使用小程序内置的 SHA256
    const signature = wx.arrayBufferToBase64(
        wx.createHash({
            type: 'sha256',
            data: new Uint8Array([...data, ...key])
        }).digest()
    ).replace(/=+$/, '')

    return signature
}

// 验证签名
export const verifySignature = (token, secret) => {
    const [header, payload, signature] = token.split('.')
    const calculatedSignature = generateSignature(header, payload, secret)
    return signature === calculatedSignature
} 