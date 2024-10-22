import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { EmailAlreadyInUseError } from '../../../use-cases/errors/email-already-in-use-error'
import { makeUpdateCareUseCase } from '../../../use-cases/factories/make-update-care-use-case'

export async function updateCare(request: FastifyRequest, reply: FastifyReply) {
  const updateCareBodySchema = z.object({
    careDays: z.array(z.number()).optional(),
    category: z
      .enum(['medication', 'hygiene', 'alimentation', 'other'])
      .optional(),
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    frequency: z.string().optional(),
    startTime: z.string().optional(),
    scheduleType: z.string().optional(),
    interval: z.number().optional(),
    isContinuous: z.boolean().optional(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    medication: z
      .object({
        administrationRoute: z.string(),
        quantity: z.number(),
        unit: z.string(),
      })
      .optional(),
    hygiene: z
      .object({
        hygieneCategory: z.string(),
        instructions: z.string(),
      })
      .optional(),
    alimentation: z
      .object({
        meal: z.string(),
        food: z.string(),
        notRecommendedFood: z.string(),
      })
      .optional(),
  })

  const updateCareParamsSchema = z.object({
    careId: z.string(),
  })

  const { medication, hygiene, alimentation, ...careToUpdate } =
    updateCareBodySchema.parse(request.body)
  const { careId } = updateCareParamsSchema.parse(request.params)

  const updateCareUseCase = makeUpdateCareUseCase()

  try {
    const { care } = await updateCareUseCase.execute(careId, {
      careType: medication
        ? 'medication'
        : hygiene
        ? 'hygiene'
        : alimentation
        ? 'alimentation'
        : 'other',
      careProperties: {
        ...careToUpdate,
        medication,
      },
    })

    return reply.code(200).send({
      care,
      message: 'Informações atualizadas com sucesso!',
    })
  } catch (err) {
    if (err instanceof EmailAlreadyInUseError) {
      return reply.code(409).send({ message: err.message })
    }

    throw err
  }
}
