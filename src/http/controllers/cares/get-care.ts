import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetCareByIdUseCase } from '../../../use-cases/factories/make-get-care-by-id-use-case'

export async function getCare(request: FastifyRequest, reply: FastifyReply) {
  const getCareParamsSchema = z.object({
    careId: z.string().uuid(),
  })

  const { careId } = getCareParamsSchema.parse(request.params)

  const getCareById = makeGetCareByIdUseCase()

  try {
    const care = await getCareById.execute({ careId })

    return reply.code(200).send({ care })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: err.message })
    }

    throw err
  }
}
