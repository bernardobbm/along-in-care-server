import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchCaresUseCase } from '../../../use-cases/factories/make-fetch-cares-use-case'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllParamsSchema = z.object({
    patientId: z.string(),
  })

  const { patientId } = fetchAllParamsSchema.parse(request.params)

  const fetchAllCares = makeFetchCaresUseCase()

  const { cares } = await fetchAllCares.execute({ patientId })

  reply.code(200).send(cares)
}
