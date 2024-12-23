import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { caregiver } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      { role: caregiver.role },
      {
        sign: {
          sub: caregiver.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      { role: caregiver.role },
      {
        sign: {
          sub: caregiver.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
        refreshToken,
        caregiver: {
          name: caregiver.name,
          email: caregiver.email,
          patient: caregiver.patient_id,
        },
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
