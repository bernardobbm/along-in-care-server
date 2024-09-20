import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'PRIMARY' | 'ASSISTANT') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply
        .status(403)
        .send({ message: 'Você não tem permissões para executar essa ação.' })
    }
  }
}
