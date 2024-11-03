import { Request, Response } from 'express'
import  Product  from '../models/Product.model.ts'

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll()
    res.json({data: products})
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' })
        return
    }

    res.json({ data: product })
}


export const createProduct = async (req : Request, res : Response) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req:Request, res: Response) => {
    // check that the product exist
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product) {
        res.status(404).json({error: 'Producto no encontrado'})
        return
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
        res.status(404).json({error: 'Producto no encontrado'})
        return
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
        res.status(404).json({error: 'Producto no encontrado'})
        return
    }

    // remove product
    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}