import { Router } from 'express'
import appointmentsRouter from './appointments.routes'
import usersRouter from './user.routes'
import sessionRouter from './session.routes'

const routes = Router()

// prefixed all appointment requests with '/appointments'
routes.use('/sessions', sessionRouter)
routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)

routes.get('/', (request, response) => response.json('hello world'))

export default routes
