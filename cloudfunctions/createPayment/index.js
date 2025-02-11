// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const { registrationId } = event
    const { OPENID } = cloud.getWXContext()

    try {
        // 获取报名信息
        const registration = await db.collection('registrations').doc(registrationId).get()
        if (!registration.data) {
            throw new Error('报名记录不存在')
        }

        // 获取赛事信息
        const tournament = await db.collection('tournaments').doc(registration.data.tournamentId).get()
        if (!tournament.data) {
            throw new Error('赛事不存在')
        }

        // 生成商户订单号
        const outTradeNo = `LSC${Date.now()}${Math.random().toString().substr(2, 4)}`

        // 创建支付订单
        const result = await db.collection('payments').add({
            data: {
                outTradeNo,
                registrationId,
                userId: OPENID,
                amount: tournament.data.registrationFee,
                status: 'pending', // pending, success, failed
                createdAt: db.serverDate(),
                updatedAt: db.serverDate()
            }
        })

        // TODO: 调用微信支付统一下单接口
        // 这里先模拟返回二维码
        const qrCode = 'https://example.com/mock-qr-code'

        return {
            success: true,
            outTradeNo,
            qrCode
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: error.message
        }
    }
} 