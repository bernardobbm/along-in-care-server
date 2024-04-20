import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { caregiversRoutes } from './http/controllers/caregivers/routes'

export const app = fastify()

app.register(cors)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(caregiversRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send('Internal server error.')
})
