import { prisma } from '../src/lib/'

async function seed() {
  await prisma.event.create({
    data: {
      // https://www.uuidgenerator.net
      id: 'dbedfd35-e191-4411-b412-1c42e3dfe418',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
})
