import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware/index.ts'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product.ts'

const router = Router()

// routing
router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    getProductById
)

router.post('/', 
    
    // validation
    body('name')
        .notEmpty().withMessage('The product name can not be empty'),

    body('price')
        .isNumeric().withMessage('Not valid value')
        .custom( value => value > 0).withMessage('The value has to be a positive number')
        .notEmpty().withMessage('The price name can not be empty'),

    handleInputErrors,
    createProduct
)

router.put('/:id', 
    param('id').isInt().withMessage('ID not valid'),
    body('name')
        .notEmpty().withMessage('The product name can not be empty'),

    body('price')
        .isNumeric().withMessage('Not valid value')
        .custom( value => value > 0).withMessage('The value has to be a positive number')
        .notEmpty().withMessage('The price name can not be empty'),

    body('availability')
        .isBoolean().withMessage('The value must be a boolean'),

    handleInputErrors,
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    deleteProduct
)

export default router