import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { create } from './create'
import { createAlimentation } from './create-alimentation'
import { createHygiene } from './create-hygiene'
import { createMedication } from './create-medication'
import { fetchAll } from './fetch-all'

export async function caresRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/cares', fetchAll)

  app.post('/cares/others', { onRequest: verifyUserRole('PRIMARY') }, create)

  app.post(
    '/cares/hygiene',
    { onRequest: verifyUserRole('PRIMARY') },
    createHygiene,
  )

  app.post(
    '/cares/medication',
    { onRequest: verifyUserRole('PRIMARY') },
    createMedication,
  )

  app.post(
    '/cares/alimentation',
    { onRequest: verifyUserRole('PRIMARY') },
    createAlimentation,
  )
}
