import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function caregiversRoutes(app: FastifyInstance) {
  app.post('/caregivers', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated routes */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
