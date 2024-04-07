import { faker } from '@faker-js/faker'

export const attendees = Array.from({ length: 200 }).map(() => {
  return {
    id: faker.number.int({ min: 10000, max: 20000 }),
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    // O faker tem um método chamado date.recent que gera uma data recente, e você pode passar um objeto com a propriedade days, que é o intervalo de dias que você quer que ele gere uma data recente, nesse caso 30 dias(mes passado, ontem, hoje, uma data...)
    createdAt: faker.date.recent({ days: 30 }),
    // Essa semana, ultima sexta...
    checkedInAt: faker.date.recent({ days: 7 })
  }
})
