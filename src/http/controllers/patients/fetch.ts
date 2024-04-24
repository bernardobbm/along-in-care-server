import { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeFetchPatientUseCase } from '../../../use-cases/factories/make-fetch-patient-use-case'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPatientUseCase = makeFetchPatientUseCase()

  const { sub } = request.user

  try {
    const { patient } = await fetchPatientUseCase.execute({ caregiverId: sub })

    reply.code(200).send(patient)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.code(404).send({ message: err.message })
    }
  }
}
