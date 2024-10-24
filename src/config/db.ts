import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Inicializa las variables de entorno
dotenv.config();

// Necesario para obtener el directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configura Sequelize
const db = new Sequelize(process.env.DATABASE_URL || '', {
  models: [path.join(__dirname, '/../models/**/*.ts')],
});

// Exporta la conexión a la base de datos
export default db;