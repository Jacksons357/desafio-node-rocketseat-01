import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import prisma from '../lib/prisma'

export async function updateTaskFunction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/tasks/:taskId/complete',
    {
      schema: {
        params: z.object({
          taskId: z.string(),
        }),
        body: z.object({
          dateComplete: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { taskId } = request.params
      const { dateComplete } = request.body

      try {
        const task = await prisma.task.findUnique({
          where: { id: taskId },
        })

        if (!task) {
          return reply.status(404).send('Task not found!')
        }

        const updatedTask = await prisma.task.update({
          where: {
            id: taskId,
          },
          data: {
            completedAt: dateComplete,
          },
        })

        return reply.status(200).send(updatedTask)
      } catch (error) {
        reply.status(500).send('Error to update complete date')
      }
    }
  )
}
