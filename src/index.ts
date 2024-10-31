import colors from 'colors'
import server from './server.ts'

const port = process.env.PORT || 4001
server.listen(port, () => {
    console.log( colors.cyan.bold(`REST API en el puerto ${port}`))
})