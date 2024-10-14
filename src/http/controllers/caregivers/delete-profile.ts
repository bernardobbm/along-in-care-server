import { FastifyReply, FastifyRequest } from 'fastify'
import { makeDeleteProfileUserCase } from '../../../use-cases/factories/make-delete-profile-use-case'

export async function deleteProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub } = request.user

  const deleteProfileUseCase = makeDeleteProfileUserCase()

  await deleteProfileUseCase.execute({ caregiverId: sub })

  reply.code(200).send({
    message: 'Lamentamos sua ida. Sinta-se a vontade para retornar!',
  })
}
