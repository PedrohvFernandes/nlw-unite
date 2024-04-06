import { errorHandler } from './error-handler'
import {
  checkIn,
  createEvent,
  getAttendeeBadge,
  getEvent,
  getEventAttendees,
  registerForEvent
} from './routes'

// Para conseguir tipar as rotas por inteiro
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform
} from 'fastify-type-provider-zod'

// Documentação
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'

const app = fastify()

app.register(fastifySwagger, {
  swagger: {
    // Todos os dados enviados para a minha api são do tipo JSON
    consumes: ['application/json'],
    // Todos os dados que a minha api retorna são do tipo JSON
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description:
        'Especificações da API para o back-end da aplicação pass.in construida duranta o NLW Unite da Rocketseat',
      version: '1.0.0'
    }
  },
  // Como swagger deve transformar e entender os schemas(params, response, body...) passados para cada rota
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
  swagger: {
    url: '/swagger.json'
  },
  exposeRoute: true
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

// Padronização do erro. Todo erro da aplicação das rotas vão cair dentro desse arquivo, levando a mensagem de erro para ele. Seja um erro de validação, um erro 400 ou um erro padrão...
app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3000
  })
  .then(() => {
    console.log('Server is running on port 3000')
  })
