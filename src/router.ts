import { Router } from 'express'

const router = Router()

// routing
router.get('/', (req, res) => {

    res.json('desde get')
})

router.post('/', (req, res) => {

    res.json('desde post')
})

router.put('/', (req, res) => {

    res.json('desde put')
})

router.patch('/', (req, res) => {

    res.json('desde patch')
})

router.delete('/', (req, res) => {

    res.json('desde delete')
})

export default router