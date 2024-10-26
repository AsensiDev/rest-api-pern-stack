import request from 'supertest'
import server from '../server.ts'

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        //check status api = 200
        expect(res.status).toBe(200)
        //check the api return json 
        expect(res.headers['content-type']).toMatch(/json/)

        expect(res.status).not.toBe(404)
    })
})