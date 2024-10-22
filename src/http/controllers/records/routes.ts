import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { getManyByCare } from './get-many-by-care'
import { getRecord } from './get-record'
import { remove } from './remove'
import { updateRecord } from './update'

export async function recordsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/records/:careId', create)
  app.get('/records/:recordId', getRecord)
  app.get('/records/:careId/all', getManyByCare)
  app.delete('/records/:recordId', remove)
  app.patch('/records/:recordId/update', updateRecord)
}
