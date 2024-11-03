import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware/index.ts'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product.ts'

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability: 
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: Sucessful response
 *              content:
 *                  application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Succesful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 */

router.get('/:id',
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new Product
 *     tags:
 *       - Products
 *     description: Returns a new product record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               price:
 *                 type: number
 *                 example: 300
 */

 
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