import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetCaregiverProfileUseCase } from '../../../use-cases/factories/make-get-caregiver-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetCaregiverProfileUseCase()

  const { caregiver } = await getUserProfile.execute({
    caregiverId: request.user.sub,
  })

  return reply.status(200).send({
    caregiver: {
      ...caregiver,
      password_hash: undefined,
    },
  })
}
