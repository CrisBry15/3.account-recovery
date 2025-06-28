// run.js

import express from 'express'
import dotenv from 'dotenv'
import recoveryRoutes from './app/routes.js'

// Cargar variables de entorno
dotenv.config()

const app = express()

// Middleware para procesar JSON
app.use(express.json())

// Ruta base para el microservicio
app.use('/recovery', recoveryRoutes)

// Puerto desde .env o por defecto 5003
const PORT = process.env.PORT || 5003

app.listen(PORT, () => {
    console.log(`Account Recovery Microservice corriendo en http://localhost:${PORT}`)
})
