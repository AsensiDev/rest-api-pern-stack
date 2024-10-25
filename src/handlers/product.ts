import { Request, Response } from 'express'
import  Product  from '../models/Product.model.ts'

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll()
        res.json({data: products})
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req : Request, res : Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req:Request, res: Response) => {
    // check that the product exist
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // update product
    await product.update(req.body)
    // store product
    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req:Request, res: Response) => {
    // check product exist
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // update product
    product.availability = !product.dataValues.availability
    // store product
    await product.save()

    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    // check product exist
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // remove product
    await product.destroy()
    res.json({data: 'Producto Eliminado'})

    res.json({data: product})
}