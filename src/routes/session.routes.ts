import { Router } from 'express'
import AuthenticaUserService from '../services/AuthenticaUserService'
const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
  const authService = new AuthenticaUserService()
  const { email, password } = request.body
  const { user, token } = await authService.execute({ email, password })
  delete user.password
  return response.json({ user, token })
})

export default sessionRouter
