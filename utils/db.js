import { getUseCloud } from './config'
import { storage } from './db/storage'
import { cache } from './db/cache'

export const db = {
    collection: (name) => {
        return {
            async add(data) {
                const items = storage.get(name) || []
                const newItem = { ...data, _id: Date.now().toString() }
                items.push(newItem)

                // 更新存储和缓存
                storage.set(name, items)
                cache.set(name, items)

                return { _id: newItem._id }
            },

            async get() {
                // 先查缓存
                let items = cache.get(name)
                if (!items) {
                    // 缓存未命中，查存储
                    items = storage.get(name) || []
                    // 更新缓存
                    cache.set(name, items)
                }
                return { data: items }
            },

            doc(id) {
                return {
                    async get() {
                        const cacheKey = `${name}_${id}`
                        // 先查缓存
                        let item = cache.get(cacheKey)
                        if (!item) {
                            const items = storage.get(name) || []
                            item = items.find(i => i._id === id)
                            if (item) {
                                cache.set(cacheKey, item)
                            }
                        }
                        return { data: item || null }
                    },

                    async update(data) {
                        const items = storage.get(name) || []
                        const index = items.findIndex(item => item._id === id)
                        if (index > -1) {
                            items[index] = { ...items[index], ...data.data }
                            // 更新存储和缓存
                            storage.set(name, items)
                            cache.clear() // 清除所有缓存
                            return { updated: 1 }
                        }
                        return { updated: 0 }
                    },

                    async remove() {
                        const items = storage.get(name) || []
                        const newItems = items.filter(item => item._id !== id)
                        // 更新存储和缓存
                        storage.set(name, newItems)
                        cache.clear() // 清除所有缓存
                        return { deleted: 1 }
                    }
                }
            },

            where(query) {
                const queryChain = {
                    _query: query,
                    _limit: null,
                    _orderBy: null,

                    limit(num) {
                        this._limit = num
                        return this
                    },

                    orderBy(field, order) {
                        this._orderBy = { field, order }
                        return this
                    },

                    async get() {
                        let items = storage.get(name) || []

                        // 应用查询条件
                        items = items.filter(item => {
                            for (let key in this._query) {
                                if (item[key] !== this._query[key]) return false
                            }
                            return true
                        })

                        // 应用排序
                        if (this._orderBy) {
                            const { field, order } = this._orderBy
                            items.sort((a, b) => {
                                if (order === 'asc') {
                                    return a[field] > b[field] ? 1 : -1
                                }
                                return a[field] < b[field] ? 1 : -1
                            })
                        }

                        // 应用限制
                        if (this._limit !== null) {
                            items = items.slice(0, this._limit)
                        }

                        return { data: items }
                    }
                }

                return queryChain
            }
        }
    }
} 