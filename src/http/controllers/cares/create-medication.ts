import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCareUseCase } from '../../../use-cases/factories/make-create-care-use-case'

export async function createMedication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createMedicationBodySchema = z.object({
    category: z.string(),
    title: z
      .string()
      .trim()
      .min(1, 'Campo "Título" deve ter ao menos um caractere'),
    description: z
      .string()
      .trim()
      .min(1, 'Campo "Descrição" deve ter ao menos um caractere'),
    scheduleType: z.string(),
    interval: z.number(),
    isContinuous: z.boolean(),
    startsAt: z.string(),
    endsAt: z.string(),
    medication: z.object({
      administrationRoute: z.string(),
      quantity: z.number(),
      unit: z.string(),
    }),
  })

  const {
    category,
    title,
    description,
    scheduleType,
    interval,
    isContinuous,
    startsAt,
    endsAt,
    medication,
  } = createMedicationBodySchema.parse(request.body)

  const createMedicationUseCase = makeCreateCareUseCase()

  try {
    await createMedicationUseCase.execute({
      careType: 'medication',
      careProperties: {
        category,
        title,
        description,
        scheduleType,
        interval,
        isContinuous,
        startsAt,
        endsAt,
        medication,
      },
    })

    reply.code(201).send({ message: 'Medicação cadastrada com sucesso.' })
  } catch (err) {
    console.log(err) // todo: criar erro específico baseado nos possíveis erros

    reply.code(400).send({
      message: 'Verifique as informações digitadas e tente novamente.',
    })
  }
}
