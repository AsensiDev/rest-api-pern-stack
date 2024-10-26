import request from 'supertest'
import server from '../../server.ts'

describe('POST /api/products', () => {
    it('should create a new product', async () => {
        const res = await request(server).post('/api/products').send({
            name: "Testing",
            price: 50
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).toHaveProperty('errors')
    })
})