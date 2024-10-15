import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createTask } from './routes/create-task'
import { getTasks } from './routes/get-tasks'
import { updateTask } from './routes/update-task'
import { deleteTask } from './routes/delete-task'
import { updateTaskFunction } from './routes/update-task-complete'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(createTask)
server.register(getTasks)
server.register(updateTask)
server.register(deleteTask)
server.register(updateTaskFunction)

server.listen({ port: 3333 }).then(() => {
  console.log('Server running!')
})
