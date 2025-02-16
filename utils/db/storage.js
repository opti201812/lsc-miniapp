export const storage = {
    // 数据版本控制
    VERSION: '1.0.0',

    // 获取带版本的键名
    getVersionedKey(key) {
        return `${this.VERSION}:${key}`
    },

    // 存储数据
    set(key, data) {
        const versionedKey = this.getVersionedKey(key)
        const storageData = {
            version: this.VERSION,
            timestamp: Date.now(),
            data
        }
        wx.setStorageSync(versionedKey, storageData)
    },

    // 获取数据
    get(key) {
        const versionedKey = this.getVersionedKey(key)
        const storageData = wx.getStorageSync(versionedKey)

        if (!storageData) return null

        // 版本检查
        if (storageData.version !== this.VERSION) {
            // 数据版本不匹配，需要迁移或清理
            this.migrate(key, storageData)
            return null
        }

        return storageData.data
    },

    // 数据迁移
    migrate(key, oldData) {
        // 可以在这里实现数据迁移逻辑
        console.warn(`数据版本不匹配：${key}`, oldData)
        this.remove(key)
    },

    // 删除数据
    remove(key) {
        const versionedKey = this.getVersionedKey(key)
        wx.removeStorageSync(versionedKey)
    },

    // 清除所有数据
    clear() {
        wx.clearStorageSync()
    }
} 