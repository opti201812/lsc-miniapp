// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 注册处理器
const handlers = {
    // 报名相关
    'registration.create': async (event, context) => {
        const { tournamentId } = event.data
        const { OPENID } = cloud.getWXContext()

        // 创建报名记录
        const result = await db.collection('registrations').add({
            data: {
                tournamentId,
                userId: OPENID,
                status: 'pending',
                paymentStatus: 'unpaid',
                createdAt: db.serverDate(),
                updatedAt: db.serverDate()
            }
        })

        return {
            code: 200,
            data: {
                registrationId: result._id
            }
        }
    },

    // 支付相关
    'payment.create': async (event, context) => {
        const { registrationId } = event.data
        const { OPENID } = cloud.getWXContext()

        // 获取报名信息
        const registration = await db.collection('registrations').doc(registrationId).get()
        if (!registration.data) {
            return {
                code: 404,
                message: '报名记录不存在'
            }
        }

        // 获取赛事信息
        const tournament = await db.collection('tournaments').doc(registration.data.tournamentId).get()
        if (!tournament.data) {
            return {
                code: 404,
                message: '赛事不存在'
            }
        }

        // 生成商户订单号
        const outTradeNo = `LSC${Date.now()}${Math.random().toString().substr(2, 4)}`

        // 创建支付订单
        await db.collection('payments').add({
            data: {
                outTradeNo,
                registrationId,
                userId: OPENID,
                amount: tournament.data.registrationFee,
                status: 'pending',
                createdAt: db.serverDate(),
                updatedAt: db.serverDate()
            }
        })

        // TODO: 调用微信支付统一下单接口
        // 这里先模拟返回二维码
        return {
            code: 200,
            data: {
                outTradeNo,
                qrCode: 'https://example.com/mock-qr-code'
            }
        }
    },

    'payment.getStatus': async (event, context) => {
        const { outTradeNo } = event.data
        const { OPENID } = cloud.getWXContext()

        // 查询支付订单
        const payment = await db.collection('payments')
            .where({
                outTradeNo: outTradeNo,
                userId: OPENID
            })
            .get()

        if (!payment.data || payment.data.length === 0) {
            return {
                code: 404,
                message: '支付订单不存在'
            }
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
            code: 200,
            data: {
                status: mockStatus
            }
        }
    },

    // 赛事相关
    'tournament.list': async (event, context) => {
        const { page = 1, pageSize = 10 } = event.data

        const list = await db.collection('tournaments')
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .get()

        const total = await db.collection('tournaments').count()

        return {
            code: 200,
            data: {
                list: list.data,
                total: total.total,
                page,
                pageSize
            }
        }
    },

    'tournament.detail': async (event, context) => {
        const { id } = event.data

        const result = await db.collection('tournaments').doc(id).get()

        return {
            code: 200,
            data: result.data
        }
    }
}

// 云函数入口函数
exports.main = async (event, context) => {
    const { action } = event

    // 获取处理器
    const handler = handlers[action]
    if (!handler) {
        return {
            code: 404,
            message: `未找到 ${action} 对应的处理器`
        }
    }

    try {
        // 调用对应的处理器
        return await handler(event, context)
    } catch (error) {
        console.error(`处理 ${action} 时发生错误:`, error)
        return {
            code: 500,
            message: error.message || '服务器内部错误'
        }
    }
} 