import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import  Product  from '../models/Product.model.ts'

export const createProduct = async (req : Request, res : Response) => {

    //validation
    await check('name')
        .notEmpty().withMessage('The product name can not be empty')
        .run(req)

    await check('price')
        .isNumeric().withMessage('Not valid value')
        .custom( value => value > 0).withMessage('The value has to be a positive number')
        .notEmpty().withMessage('The price name can not be empty')
        .run(req)

    // how to show the errors
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const product = await Product.create(req.body)
    res.json({data: product})
}