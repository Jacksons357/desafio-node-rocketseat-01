import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import prisma from '../lib/prisma'

export async function deleteTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/tasks/:taskId',
    {
      schema: {
        params: z.object({
          taskId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { taskId } = request.params

      try {
        const task = await prisma.task.findUnique({
          where: { id: taskId },
        })

        if (!task) {
          reply.status(404).send('Task not found!')
        }

        const deleteTask = await prisma.task.delete({
          where: { id: taskId },
        })

        return reply.status(200).send(deleteTask)
      } catch (error) {
        reply.status(500).send('')
      }
    }
  )
}
