import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib";

const app = fastify()

// Mantendo a rota no plural, isso é identificação de recurso: Events
app.post('/events', async (request, reply) => {
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        // Um numero, em inteiro, somente positivo e pode ser nulo
        maximumAttendees: z.number().int().positive().nullable(),
    })

    // O parse faz a validação dos dados
    const { details, maximumAttendees, title } = createEventSchema.parse(request.body)

    const event = await prisma.event.create({
            data: {
                details,
                maximumAttendees,
                title,
                slug: new Date().toISOString(),
            }
        })

    // return { eventId: event.id }
    return reply.status(201).send({ eventId: event.id })
})


app.listen({
    port: 3000,
}).then(() => {
    console.log('Server is running on port 3000')
})