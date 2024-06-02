import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { createAlimentation } from './create-alimentation'
import { createHygiene } from './create-hygiene'
import { createMedication } from './create-medication'

export async function caresRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/cares/others', create)
  app.post('/cares/hygiene', createHygiene)
  app.post('/cares/medication', createMedication)
  app.post('/cares/alimentation', createAlimentation)
}
