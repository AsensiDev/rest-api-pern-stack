import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction): void => {
    // Obtener los errores de validación
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Si hay errores, devolver un 400 con la lista de errores
        res.status(400).json({
            status: 'error',
            errors: errors.array(),
        });
    } else {
        // Si no hay errores, continuar con el siguiente middleware/controlador
        next();
    }
};

