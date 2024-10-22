import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { create } from './create'
import { fetch } from './fetch'
import { remove } from './remove'
import { updatePatient } from './update'

export async function patientsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/patient', create)
  app.get('/me/patient', fetch)

  app.delete(
    '/patient/:patientId/remove',
    { onRequest: verifyUserRole('PRIMARY') },
    remove,
  )
  app.patch(
    '/patient/:patientId/update',
    { onRequest: verifyUserRole('PRIMARY') },
    updatePatient,
  )
}
