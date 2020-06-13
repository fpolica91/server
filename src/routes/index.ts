import { Router } from 'express'
import appointmentsRouter from './appointments.routes'

const routes = Router()

// prefixed all appointment requests with '/appointments'
routes.use('/appointments', appointmentsRouter)

routes.get('/', (request, response) => response.json('hello world'))

export default routes
