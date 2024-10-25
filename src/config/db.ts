import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.model.ts'; // Importa directamente el modelo

// Carga las variables de entorno
dotenv.config();

// Necesario para obtener el directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura Sequelize
const db = new Sequelize(process.env.DATABASE_URL || '', {
  dialect: 'mysql', // O el que estés usando (postgres, sqlite, etc.)
  models: [Product], // Registra los modelos directamente en lugar de usar rutas
  logging: false, // Deshabilitar logging si no lo necesitas
});

// Sincroniza la base de datos
db.sync()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err));

// Exporta la conexión a la base de datos
export default db;
