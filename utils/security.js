export const verifyToken = (token) => {
    if (USE_CLOUD) {
        return wx.cloud.callFunction({
            name: 'verifyToken',
            data: { token }
        })
    } else {
        // 本地简单验证
        return token.endsWith('.dev_signature')
            ? { valid: true }
            : { valid: false }
    }
} 