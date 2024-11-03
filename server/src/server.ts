import express from 'express'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.ts'
import router from './router.ts'
import db from './config/db.ts'

//conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.bgGreen.bold('Conexión exitosa a la DB'))
    } catch (error) {
        console.log( colors.bgRed.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()

// instancia de express
const server = express()

// leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

// docs
server.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server