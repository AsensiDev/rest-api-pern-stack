import request from 'supertest'
import server from '../../server.ts'

describe('POST /api/products', () => {

    it('should dislay validation errors', async () => {
        const res = await request(server).post('/api/products').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
    })

    it('should validate that the price is greater than 0', async () => {
        const res = await request(server).post('/api/products').send({
            name: 'Monitor Curvo',
            price: 0
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
    })

    it('should validate that the price is a number and greater than 0', async () => {
        const res = await request(server).post('/api/products').send({
            name: 'Monitor Curvo',
            price: 'hola'
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)
    })

    it('should create a new product', async () => {
        const res = await request(server).post('/api/products').send({
            name: "Testing",
            price: 50
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')
    })
})

describe('GET /api/products', () => {

    it('should check is api7products url exists', async () => {
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })
    it('Get a JSON response with products', async () => {
        const res = await request(server).get('/api/products')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
    })
})

describe('GET /api/products/:id', () => {
    it('should return a 404 response for a non-existent product', async () => {
        const productID = 2000
        const res = await request(server).get(`/api/products/${productID}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
    })

    it('Should check a valid ID in the url', async () => {
        const res = await request(server).get('/api/products/not-valid-url')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('ID not valid')
    })

    it('Should get a Json for a single product', async () => {
        const res = await request(server).get('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', () => {

    it('should check a valid ID in the URL', async () => {
        const res = await request(server).put('/api/products/not-valid-url').send({
            name: "Monitor Curvo",
            availability: true,
            price: 300
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe("ID not valid")
    })

    it('Should display validation error messages when updating a product', async () => {
        const res = await request(server).put('/api/products/1').send({})
        expect(res.body).toHaveProperty('errors')
    })

    it('Should validate than the price is greater than 0', async () => {
        const res = await request(server).put('/api/products/1').send({
            name: "Monitor Curvo",
            availability: true,
            price: 0
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('The value has to be a positive number')
    })

    it('should return a 404 response for a non-existent product', async () => {

        const productId = 2000
        const res = await request(server).put(`/api/products/${productId}`).send({
            name: "Monitor Curvo",
            availability: true,
            price: 300
        })

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe("Producto no encontrado")
    })

    it('should update an existing product with valid data', async () => {

        const res = await request(server).put(`/api/products/1`).send({
            name: "Monitor Curvo",
            availability: true,
            price: 300
        })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existing product', async () => {
        const productID = 2000
        const res = await request(server).patch(`/api/products/${productID}`)
        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
    })

    it('should update the product availability', async () => {
        const res = await request(server).patch('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('DELETE /api/products/:id', () => {
    it('should check a valid ID', async () => {
        const res = await request(server).delete('/api/products/not-valid-id')
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('ID not valid')
    })

    it('should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const res = await request(server).delete(`/api/products/${productId}`)
        expect(res.status).toBe(404)
        expect(res.body.error).toBe('Producto no encontrado')
    })

    it('should delete a product', async () => {
        const res = await request(server).delete('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body.data).toBe('Producto Eliminado')
    })
})