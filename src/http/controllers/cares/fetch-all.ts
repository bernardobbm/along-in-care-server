import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchCaresUseCase } from '../../../use-cases/factories/make-fetch-cares-use-case'

export async function fetchAll(request: FastifyRequest, reply: FastifyReply) {
  const fetchAllCares = makeFetchCaresUseCase()

  const { patientId } = request.cookies

  console.log(patientId)

  if (patientId) {
    const { cares } = await fetchAllCares.execute({ patientId })

    reply.code(200).send(cares)
  }

  reply
    .code(404)
    .send({ message: 'Não foi possível acessar os dados solicitados' })
}
