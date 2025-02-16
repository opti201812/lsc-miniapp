export const cache = {
    data: new Map(),

    set(key, value, ttl = 300000) { // 默认5分钟过期
        this.data.set(key, {
            value,
            timestamp: Date.now(),
            ttl
        })
    },

    get(key) {
        const item = this.data.get(key)
        if (!item) return null

        // 检查是否过期
        if (Date.now() - item.timestamp > item.ttl) {
            this.data.delete(key)
            return null
        }

        return item.value
    },

    clear() {
        this.data.clear()
    }
} 