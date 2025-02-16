import { ENV } from './env'

// API 相关常量
export const API = {
    BASE_URL: 'http://localhost:4000/api/v1',
    ENDPOINTS: {
        LOGIN: '/users/login',
        USER_INFO: '/users/info',
        UPDATE_USER: '/users/info'
    }
}

// 开发环境模拟数据
export const MOCK_DATA = {
    userInfo: {
        name: '测试用户',
        avatar: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        level: 'Lv.8',
        registeredTournaments: 5,
        totalPoints: 1000
    }
} 