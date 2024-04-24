import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'

export async function recordsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // app.post('/cares/medication', createMedication)
  // app.post('/cares/hygiene', createHygiene)
  // app.post('/cares/alimentation', createAlimentation)
}
