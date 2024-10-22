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
    interval: z.number(),
    isContinuous: z.boolean(),
    startsAt: z.string(),
    endsAt: z.string(),
    medication: z
      .object({
        administrationRoute: z.string(),
        quantity: z.number(),
        unit: z.string(),
      })
      .nullable(),
    hygiene: z
      .object({
        hygieneCategory: z.string(),
        instructions: z.string(),
      })
      .nullable(),
    alimentation: z
      .object({
        meal: z.string(),
        food: z.string(),
        notRecommendedFood: z.string(),
      })
      .nullable(),
  })

  const { patientId, medication, alimentation, hygiene, ...care } =
    createBodySchema.parse(request.body)

  const createUseCase = makeCreateCareUseCase()

  try {
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
        medication,
      },
    })

    reply.code(201).send({ message: 'Cuidado cadastrado com sucesso.' })
  } catch (err) {
    if (err instanceof MissingFieldError) {
      reply.code(400).send({ message: err.message })
    }

    reply.code(400).send({
      message: 'Verifique as informações digitadas e tente novamente.',
    })
  }
}
