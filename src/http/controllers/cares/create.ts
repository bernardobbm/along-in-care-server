import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MissingFieldError } from '../../../use-cases/errors/missing-field-error'
import { makeCreateCareUseCase } from '../../../use-cases/factories/make-create-care-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    patientId: z
      .string()
      .min(
        1,
        'Para a criação de um cuidado é necessário um paciente cadastrado!',
      )
      .uuid('Paciente inexistente.'),
    careDays: z
      .array(z.number())
      .min(1, 'É necessário que pelo menos um dia seja selecionado!'),
    category: z.string(),
    title: z
      .string()
      .trim()
      .min(1, 'Campo "Título" deve ter ao menos um caractere'),
    description: z
      .string()
      .trim()
      .min(1, 'Campo "Descrição" deve ter ao menos um caractere'),
    frequency: z.string(),
    startTime: z.string(),
    scheduleType: z.string(),
    interval: z.coerce.number(),
    isContinuous: z.boolean(),
    startsAt: z.string(),
    endsAt: z.string().nullable(),
    medication: z
      .object({
        administrationRoute: z.string(),
        quantity: z.coerce.number(),
        unit: z.string(),
      })
      .nullable()
      .default(null),
    hygiene: z
      .object({
        hygieneCategory: z.string(),
        instructions: z.string(),
      })
      .nullable()
      .default(null),
    alimentation: z
      .object({
        meal: z.string(),
        food: z.string(),
        notRecommendedFood: z.string(),
      })
      .nullable()
      .default(null),
  })

  try {
    const { patientId, medication, alimentation, hygiene, ...care } =
      createBodySchema.parse(request.body)

    const createUseCase = makeCreateCareUseCase()

    const careSpecificData = medication ?? hygiene ?? alimentation ?? undefined

    await createUseCase.execute(patientId, {
      careType: medication
        ? 'medication'
        : hygiene
        ? 'hygiene'
        : alimentation
        ? 'alimentation'
        : 'other',
      careProperties: {
        ...care,
        careSpecificData,
      },
    })

    reply.code(201).send({ message: 'Cuidado cadastrado com sucesso.' })
  } catch (err) {
    if (err instanceof MissingFieldError) {
      return reply.code(400).send({ message: err.message })
    }

    return reply.code(400).send({
      message: 'Verifique as informações digitadas e tente novamente.',
    })
  }
}
