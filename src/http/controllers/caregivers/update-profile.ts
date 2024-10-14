import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyInUseError } from '../../../use-cases/errors/email-already-in-use-error'
import { makeUpdateProfileUseCase } from '../../../use-cases/factories/make-update-profile-use-case'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProfileBodySchema = z.object({
    name: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    email: z.string().email('Digite um e-mail válido').trim().optional(),
    password: z.string().min(6).optional(),
  })

  const { name, lastName, email, password } = updateProfileBodySchema.parse(
    request.body,
  )

  const { sub } = request.user

  try {
    const updateProfileUseCase = makeUpdateProfileUseCase()

    const { caregiver } = await updateProfileUseCase.execute({
      caregiverId: sub,
      name,
      lastName,
      email,
      password,
    })

    return reply.code(200).send({
      caregiver: {
        name: caregiver.name,
        email: caregiver.email,
        patient: caregiver.patient_id,
      },
      message: 'Informações atualizadas com sucesso!',
    })
  } catch (err) {
    if (err instanceof EmailAlreadyInUseError) {
      return reply.code(409).send({ message: err.message })
    }

    throw err
  }
}
