import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetManyRecordsByCare } from '../../../use-cases/factories/make-get-many-records-by-care'

export async function getManyByCare(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getManyByCareParamsSchema = z.object({
    careId: z.string().uuid(),
  })

  const { careId } = getManyByCareParamsSchema.parse(request.params)

  const getManyRecordsByCare = makeGetManyRecordsByCare()

  const { records } = await getManyRecordsByCare.execute({ careId })

  reply.code(200).send({ records })
}
