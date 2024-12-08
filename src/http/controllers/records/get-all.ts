import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetAllRecordsUseCase } from '../../../use-cases/factories/make-get-all-records-use-case'

export async function getAllRecords(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAllRecordsParamsSchema = z.object({
    patientId: z.string(),
  })

  const { patientId } = getAllRecordsParamsSchema.parse(request.params)

  console.log(patientId)
  const getAllRecordsUseCase = makeGetAllRecordsUseCase()

  try {
    const { records } = await getAllRecordsUseCase.execute({ patientId })

    return reply.code(200).send({ records })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: err.message })
    }
  }
}
