import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'
import { caregiversRoutes } from './http/controllers/caregivers/routes'
import { caresRoutes } from './http/controllers/cares/routes'
import { patientsRoutes } from './http/controllers/patients/routes'

export const app = fastify()

app.register(cors)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(caregiversRoutes)
app.register(patientsRoutes)
app.register(caresRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message:
        'Erro de validação. Verifique se você digitou as informações corretamente',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send('Internal server error.')
})
