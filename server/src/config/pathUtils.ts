// src/config/pathUtils.ts
import path from 'path';
import { fileURLToPath } from 'url';

// Use ESM-compatible way to set __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export { __filename, __dirname };
