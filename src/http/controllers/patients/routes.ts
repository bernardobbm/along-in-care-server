import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'

export async function patientsRoutes(app: FastifyInstance) {
  app.post('/patient', { onRequest: [verifyJWT] }, create)
}
