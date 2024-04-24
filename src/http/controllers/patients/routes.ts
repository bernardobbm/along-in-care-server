import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { fetch } from './fetch'

export async function patientsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/patient', create)
  app.get('/me/patient', fetch)

  // app.put()
  // app.patch()
  // app.delete()
}
