import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchCaresUseCase } from '../../../use-cases/factories/make-fetch-cares-use-case'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  console.log(request.body)

  const fetchAllBodySchema = z.object({
    patientId: z.string(),
  })

  const { patientId } = fetchAllBodySchema.parse(request.body)

  const fetchAllCares = makeFetchCaresUseCase()

  const { cares } = await fetchAllCares.execute({ patientId })

  reply.code(200).send(cares)
}
