import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CaregiverAlreadyExistsError } from '../../../use-cases/errors/caregiver-already-exists-error'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().email('Digite um e-mail válido').trim(),
    password: z.string().min(6),
  })

  const { name, lastName, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, lastName, email, password })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof CaregiverAlreadyExistsError) {
      reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
