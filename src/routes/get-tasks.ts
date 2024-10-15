import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import prisma from '../lib/prisma'

export async function getTasks(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/tasks', async (request, reply) => {
      try {
        const tasks = await prisma.task.findMany()

        if (!tasks) {
          return reply.status(404).send('Any transfer created')
        }

        return reply.status(200).send(tasks)
      } catch (error) {
        return reply.status(500).send('Error to find tasks')
      }
    })
}
