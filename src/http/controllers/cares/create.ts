import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCareUseCase } from '../../../use-cases/factories/make-create-care-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
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
  } = createBodySchema.parse(request.body)

  const createUseCase = makeCreateCareUseCase()

  try {
    await createUseCase.execute({
      careProperties: {
        category,
        title,
        description,
        scheduleType,
        interval,
        isContinuous,
        startsAt,
        endsAt,
      },
    })

    reply.code(201).send({ message: 'Cuidado cadastrado com sucesso.' })
  } catch (err) {
    console.log(err) // todo: criar erro específico baseado nos possíveis erros

    reply.code(400).send({
      message: 'Verifique as informações digitadas e tente novamente.',
    })
  }
}
