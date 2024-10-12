import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeRemoveRecordUseCase } from '../../../use-cases/factories/make-remove-record-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeRecordParamsSchema = z.object({
    recordId: z.string().uuid(),
  })

  const { recordId } = removeRecordParamsSchema.parse(request.params)

  const removeRecordUseCase = await makeRemoveRecordUseCase()

  try {
    await removeRecordUseCase.execute({ recordId })

    reply.code(200).send({ message: 'Registro removido com sucesso!' })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.code(404).send({ message: err.message })
    }

    throw err
  }
}
