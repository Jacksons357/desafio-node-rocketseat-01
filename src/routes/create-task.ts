import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import prisma from '../lib/prisma'

export async function createTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/tasks',
    {
      schema: {
        body: z.object({
          title: z.string(),
          description: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { title, description } = request.body

      try {
        const task = await prisma.task.create({
          data: {
            title,
            description,
          },
        })

        return reply.status(201).send(task)
      } catch (error) {
        reply.status(500).send('Error to create a transfer')
      }
    }
  )
}
