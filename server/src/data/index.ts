// code to clean our db after making testing
import { exit } from 'node:process'
import db from '../config/db.ts'

const clearDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Datos eliminados correctamente')
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

// if we use the comand 'npm test' our db with be clear and then execute the test
if(process.argv[2] === '--clear') {
    clearDB()
}