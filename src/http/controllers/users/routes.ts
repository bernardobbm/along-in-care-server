import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { name, lastName, email, password } = registerBodySchema.parse(
      request.body,
    )

    await prisma.caregiver.create({
      data: {
        name,
        last_name: lastName,
        email,
        password_hash: password,
      },
    })

    return reply.status(201).send()
  })
}
