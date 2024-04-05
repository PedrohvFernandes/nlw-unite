// Essa rota retorna as credenciais do cracha de um participante

import { prisma } from '../lib'

import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { FastifyInstance } from 'fastify'
import z from 'zod'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          // O id do participante é um number no bd, mas quando passamos parametros via URL eles chegam como string
          // attendeeId: z.string().transform(Number)
          // o coerce converte, pode ser que o valor seja uma string, mas ele vai tentar converter para number
          attendeeId: z.coerce.number().int()
        }),
        response: {}
      }
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          // Como a tabela attendee tem uma relação com a tabela event, podemos selecionar os campos que queremos da tabela Event relacionado ao participante
          event: {
            select: {
              title: true
            }
          }
        },
        where: {
          id: attendeeId
        }
      })

      if (attendee === null) {
        throw new Error('Attendee not found')
      }

      return reply.send({
        attendee
      })
    }
  )
}
