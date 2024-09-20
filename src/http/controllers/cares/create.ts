import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateCareUseCase } from '../../../use-cases/factories/make-create-care-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
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
  })

  const {
    category,
    title,
    description,
    frequency,
    startTime,
    scheduleType,
    interval,
    isContinuous,
    startsAt,
    endsAt,
  } = createBodySchema.parse(request.body)

  const createUseCase = makeCreateCareUseCase()

  const { patientId } = request.cookies

  if (!patientId) {
    return reply.code(405).send({
      message:
        'Para a criação de um cuidado é necessário um paciente cadastrado!',
    })
  }

  try {
    await createUseCase.execute(patientId, {
      careProperties: {
        category,
        title,
        description,
        frequency,
        startTime,
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
