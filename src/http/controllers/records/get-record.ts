import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetRecordUseCase } from '../../../use-cases/factories/make-get-record-use-case'

export async function getRecord(request: FastifyRequest, reply: FastifyReply) {
  const getRecordParamsSchema = z.object({
    recordId: z.string().uuid(),
  })

  const { recordId } = getRecordParamsSchema.parse(request.params)

  const getRecordUseCase = makeGetRecordUseCase()

  try {
    const record = await getRecordUseCase.execute({ recordId })

    return reply.code(200).send({ record })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: err.message })
    }
  }
}
