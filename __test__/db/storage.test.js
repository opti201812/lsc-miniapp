import { storage } from '../../utils/db/storage'

describe('Storage', () => {
    beforeEach(() => {
        // 清理所有存储
        wx.clearStorageSync()
    })

    test('should store and retrieve data with version', () => {
        const testKey = 'test'
        const testData = { name: 'test' }

        storage.set(testKey, testData)
        const retrieved = storage.get(testKey)

        expect(retrieved).toEqual(testData)
    })

    test('should handle version mismatch', () => {
        const testKey = 'test'
        const oldData = {
            version: '0.9.0',
            timestamp: Date.now(),
            data: { name: 'old' }
        }

        // 直接存储旧版本数据
        wx.setStorageSync(`0.9.0:${testKey}`, oldData)

        const retrieved = storage.get(testKey)
        expect(retrieved).toBeNull()
    })

    test('should remove data', () => {
        const testKey = 'test'
        storage.set(testKey, { name: 'test' })
        storage.remove(testKey)

        const retrieved = storage.get(testKey)
        expect(retrieved).toBeNull()
    })
}) 