const cloud = require('wx-server-sdk')
const { generateCloudToken } = require('../../utils/functions/generateToken')
cloud.init()

exports.main = async (event) => {
    const { OPENID, APPID } = cloud.getWXContext()
    const secret = APPID + 'YOUR_SECRET_KEY'

    return {
        token: generateCloudToken(OPENID, secret)
    }
} 