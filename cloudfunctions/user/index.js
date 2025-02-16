const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
    const { type, data } = event

    switch (type) {
        case 'login':
            return handleLogin(data.code)
        case 'getUserInfo':
            return handleGetUserInfo(context)
        case 'updateUserInfo':
            return handleUpdateUserInfo(data)
        default:
            throw new Error('Unknown function type')
    }
}

async function handleLogin(code) {
    // 调用微信登录接口获取 openid
    const { OPENID } = cloud.getWXContext()
    // 生成 token
    const token = generateToken(OPENID)
    return { token, openid: OPENID }
}

async function handleGetUserInfo(context) {
    const { OPENID } = cloud.getWXContext()
    // 从数据库获取用户信息
    const db = cloud.database()
    const user = await db.collection('users').doc(OPENID).get()
    return { data: user.data }
}

async function handleUpdateUserInfo(data) {
    const { OPENID } = cloud.getWXContext()
    // 更新数据库中的用户信息
    const db = cloud.database()
    await db.collection('users').doc(OPENID).update({
        data
    })
    return { success: true }
} 