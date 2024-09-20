import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetCaregiverProfileUseCase } from '../../../use-cases/factories/make-get-caregiver-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetCaregiverProfileUseCase()

  try {
    const { caregiver } = await getUserProfile.execute({
      caregiverId: request.user.sub,
    })

    reply.status(200).send({
      caregiver: {
        ...caregiver,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
