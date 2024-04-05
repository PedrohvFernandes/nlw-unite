import { createEvent } from './routes'

// Para conseguir tipar as rotas por inteiro
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

import fastify from 'fastify'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)

app
  .listen({
    port: 3000
  })
  .then(() => {
    console.log('Server is running on port 3000')
  })
