import { cache } from '../../utils/db/cache'

describe('Cache', () => {
    beforeEach(() => {
        cache.clear()
    })

    test('should cache and retrieve data', () => {
        const key = 'test'
        const value = { name: 'test' }

        cache.set(key, value)
        const retrieved = cache.get(key)

        expect(retrieved).toEqual(value)
    })

    test('should expire cached data', async () => {
        const key = 'test'
        const value = { name: 'test' }

        cache.set(key, value, 100) // 100ms TTL

        // Wait for expiration
        await new Promise(resolve => setTimeout(resolve, 150))

        const retrieved = cache.get(key)
        expect(retrieved).toBeNull()
    })

    test('should clear all cached data', () => {
        cache.set('test1', { name: 'test1' })
        cache.set('test2', { name: 'test2' })

        cache.clear()

        expect(cache.get('test1')).toBeNull()
        expect(cache.get('test2')).toBeNull()
    })
}) 