import { FastifyInstance } from 'fastify'

import { create } from './create'
import { fetchAll } from './fetch-all'
import { getCare } from './get-care'
import { remove } from './remove'
import { updateCare } from './update'

export async function caresRoutes(app: FastifyInstance) {
  app.get('/cares/:patientId', fetchAll)

  app.get('/cares/info/:careId', getCare)

  app.post('/cares/create', create)

  app.delete('/cares/:careId', remove)

  app.patch('/cares/:careId/update', updateCare)
}
