import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCareUseCase } from '../../../use-cases/factories/make-create-care-use-case'

export async function createAlimentation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAlimentationBodySchema = z.object({
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
    alimentation: z.object({
      meal: z.string(),
      food: z.string(),
      notRecommendedFood: z.string(),
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
    alimentation,
  } = createAlimentationBodySchema.parse(request.body)

  const createAlimentationUseCase = makeCreateCareUseCase()

  try {
    await createAlimentationUseCase.execute({
      careType: 'alimentation',
      careProperties: {
        category,
        title,
        description,
        scheduleType,
        interval,
        isContinuous,
        startsAt,
        endsAt,
        alimentation,
      },
    })

    reply
      .code(201)
      .send({ message: 'Recomendação alimentar cadastrada com sucesso.' })
  } catch (err) {
    console.log(err) // todo: criar erro específico baseado nos possíveis erros

    reply.code(400).send({
      message: 'Verifique as informações digitadas e tente novamente.',
    })
  }
}
