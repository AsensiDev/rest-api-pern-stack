import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware/index.ts'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product.ts'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties: 
 *         id:
 *           type: integer
 *           description: The unique identifier for the Product
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the Product
 *           example: Monitor Curvo de 49 Pulgadas
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the Product
 *           example: 300.00
 *         availability: 
 *           type: boolean
 *           description: Availability status of the Product
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: 
 *       - Products
 *     description: Returns a list of all products in the inventory
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by its ID
 *     tags:
 *       - Products
 *     description: Returns the product details based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad Request - Invalid ID
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
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Adds a new product to the inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new product
 *                 example: "Monitor Curvo 49 Pulgadas"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the new product
 *                 example: 300.00
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad Request - Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post('/', 
    body('name')
        .notEmpty().withMessage('The product name cannot be empty'),
    body('price')
        .isNumeric().withMessage('Price must be a numeric value')
        .custom(value => value > 0).withMessage('Price must be a positive number')
        .notEmpty().withMessage('The price cannot be empty'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     description: Updates the details of a product specified by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Updated Monitor"
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The updated price of the product
 *                 example: 350.00
 *               availability:
 *                 type: boolean
 *                 description: The updated availability status
 *                 example: false
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad Request - Invalid input data
 */
router.put('/:id', 
    param('id').isInt().withMessage('ID not valid'),
    body('name')
        .notEmpty().withMessage('The product name cannot be empty'),
    body('price')
        .isNumeric().withMessage('Price must be a numeric value')
        .custom(value => value > 0).withMessage('Price must be a positive number')
        .notEmpty().withMessage('The price cannot be empty'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean value'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}/availability:
 *   patch:
 *     summary: Update the availability status of a product
 *     tags:
 *       - Products
 *     description: Updates the availability status of a product specified by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to update availability
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 description: The new availability status
 *                 example: false
 *     responses:
 *       200:
 *         description: Availability status updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad Request - Invalid input data
 */
router.patch('/:id/availability', 
    param('id').isInt().withMessage('ID not valid'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean value'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by its ID
 *     tags:
 *       - Products
 *     description: Deletes the product specified by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The unique ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad Request - Invalid ID
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID not valid'),
    handleInputErrors,
    deleteProduct
)

export default router
