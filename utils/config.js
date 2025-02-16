// 开发环境配置
let useCloud = false
export const MOCK_OPENID = 'dev_mock_openid_123'

// 导出 getter 和 setter
export const getUseCloud = () => false
export const setUseCloud = () => { } // 空实现

// 生产环境配置（通过构建脚本替换）
// export const USE_CLOUD = true 