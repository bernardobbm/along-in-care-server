import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { create } from './create'
import { fetchAll } from './fetch-all'
import { getCare } from './get-care'
import { remove } from './remove'

export async function caresRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/cares/:patientId', fetchAll)

  app.get('/cares/info/:careId', getCare)

  app.post('/cares/others', { onRequest: verifyUserRole('PRIMARY') }, create)

  app.post('/cares/hygiene', { onRequest: verifyUserRole('PRIMARY') }, create)

  app.post(
    '/cares/medication',
    { onRequest: verifyUserRole('PRIMARY') },
    create,
  )

  app.post(
    '/cares/alimentation',
    { onRequest: verifyUserRole('PRIMARY') },
    create,
  )

  app.delete('/cares/:careId', remove)
}
