import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeRemoveCareUseCase } from '../../../use-cases/factories/make-remove-care-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeCareParamsSchema = z.object({
    careId: z.string().uuid(),
  })

  const { careId } = removeCareParamsSchema.parse(request.params)

  const removeCareUseCare = await makeRemoveCareUseCase()

  try {
    await removeCareUseCare.execute({ careId })

    reply.code(200).send({ message: 'Registro removido com sucesso!' })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: err.message })
    }

    throw err
  }
}
