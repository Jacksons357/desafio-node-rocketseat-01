import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import prisma from '../lib/prisma'

export async function updateTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/tasks/:taskId',
    {
      schema: {
        params: z.object({
          taskId: z.string(),
        }),
        body: z.object({
          title: z.string(),
          description: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { taskId } = request.params
      const { description, title } = request.body

      try {
        const task = await prisma.task.findUnique({
          where: { id: taskId },
        })

        if (!task) {
          return reply.status(404).send('Task not found')
        }

        const updateTask = await prisma.task.update({
          where: { id: taskId },
          data: {
            description,
            title,
          },
        })

        if (!updateTask) {
          return reply
            .status(404)
            .send('Error to update, title or description is not found')
        }

        return reply.status(200).send(updateTask)
      } catch (error) {
        reply.status(500).send('Error to update task')
      }
    }
  )
}
