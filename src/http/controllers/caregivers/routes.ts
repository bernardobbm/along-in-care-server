import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'

export async function caregiversRoutes(app: FastifyInstance) {
  app.post('/caregivers', register)
  app.post('/sessions', authenticate)

  /** Authenticated routes */
  // app.get('/me', middleware for jwt, profile)
}
