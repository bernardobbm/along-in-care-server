import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    caregiver: {
      sub: string
    }
  }
}
