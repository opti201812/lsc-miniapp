// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const { outTradeNo } = event
    const { OPENID } = cloud.getWXContext()

    try {
        // 查询支付订单
        const payment = await db.collection('payments')
            .where({
                outTradeNo: outTradeNo,
                userId: OPENID
            })
            .get()

        if (!payment.data || payment.data.length === 0) {
            throw new Error('支付订单不存在')
        }

        // TODO: 调用微信支付查询订单接口
        // 这里先模拟随机返回支付状态
        const mockStatus = Math.random() > 0.7 ? 'paid' : 'pending'

        // 如果支付成功，更新支付状态
        if (mockStatus === 'paid' && payment.data[0].status !== 'success') {
            await db.collection('payments').doc(payment.data[0]._id).update({
                data: {
                    status: 'success',
                    updatedAt: db.serverDate()
                }
            })

            // 更新报名记录的支付状态
            await db.collection('registrations').doc(payment.data[0].registrationId).update({
                data: {
                    paymentStatus: 'paid',
                    updatedAt: db.serverDate()
                }
            })
        }

        return {
            success: true,
            status: mockStatus
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            error: error.message
        }
    }
} 