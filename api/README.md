# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**. 

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.

## Requisitos

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [x] O organizador deve poder visualizar a lista de participantes; 
- [x] O participante deve poder se inscrever em um evento;
- [x] O participante deve poder visualizar seu crachá de inscrição;
- [x] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [x] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [x] O check-in no evento será realizado através de um QRCode;

## Documentação da API (Swagger)

Para documentação da API, acesse o link: https://nlw-unite-nodejs.onrender.com/docs

## Banco de dados

Nessa aplicação vamos utilizar banco de dados relacional (SQL). Para ambiente de desenvolvimento seguiremos com o SQLite pela facilidade do ambiente.

### Diagrama ERD

<img src=".github/erd.svg" width="600" alt="Diagrama ERD do banco de dados" />

### Estrutura do banco (SQL)

```sql
-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "slug" TEXT NOT NULL,
    "maximum_attendees" INTEGER
);

-- CreateTable
CREATE TABLE "attendees" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "attendees_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendeeId" INTEGER NOT NULL,
    CONSTRAINT "check_ins_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendees" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_email_key" ON "attendees"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendeeId_key" ON "check_ins"("attendeeId");
```
### Comando para criar o ORM prisma em Sqlite
```bash
npx prisma init --datasource-provider SQLite

npx prisma migrate dev

npx prisma studio
```

### Comando do node para ler .env(Variaveis de ambiente)
```bash
# Maneira tradicional: Instalar a dependência dotenv
npm install dotenv

# ou

# No package.json, passar --env-file .env na execução do script. O proprio node suporta a leitura do .env. E pelo fato de estarmos usando o tsx ele ja passa o arquivo .env para o node automaticamente: node --env-file .env src/server.js
  "scripts": {
    "dev": "tsx watch --env-file .env src/server.ts"
  }


```

### Anotações:

- Métodos HTTP para fins semanticos: GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD
  -  Get - Obter dados
  -  Post - Criar dados...

- Maneiras de passar parametros para o servidor:
  - Query/search params: site.../users?name=Lucas&age=25 --> Parametros passados na URL --> Parametros de busca/filtro --> Esses parametros não são obrigatórios --> Podem ser usados para filtrar os resultados de uma busca

  - Route params: /users/10 (id do usuario) --> site.../users/:id --> site.../users/5 --> Parametros de rota passados na URL --> Identificação de recursos --> Para Put, Delete, Patch ou ate get--> fazer uma operação em um unico registro --> Por exemplo para deletar um usuario --> Esses parametros são obrigatórios

  - Body: { name: 'Lucas', age: 25 } --> Corpo da requisição

  - Headers: { Authorization : 'Bearer 123456' } --> Cabeçalhos --> Contexto da requisição --> Informações mais fixas, para detalhar a requisição/back-end --> Ex: a localização do usuario, o tipo de conteudo que ele aceita, o tipo de conteudo que ele envia, a autenticação do usuario

- Maneiras de conectar com o banco:
  -  Driver nativo: Conexão direta(Baixo nivel) com o banco de dados --> Ex: mysql, pg, sqlite --> Necessita de conhecimento avançado em SQL
  -  ORM: Object Relational Mapping --> Mapeamento de objetos para o banco de dados --> Ex: TypeORM, Sequelize, Prisma, Hibernate(Para Java)...
  -  Query Builder: Construção de queries SQL com métodos/sintaxe Javascript --> Knex.js...

  -  Migrations --> Controle de versão do banco de dados --> Criação de tabelas, alteração de tabelas, exclusão de tabelas...

- Http status code: Traz o significado da resposta
  -  2xx: Sucesso
  -  3xx: Redirecionamento
  -  4xx: Erro do cliente(Erro em alguma informação enviada por QUEM esta fazendo a chamada p/ API)
  -  5xx: Erro do servidor(Um erro que está acontecendo IDEPENDENTE do que está sendo enviado p/ o servidor)

- Caso queira gerar regex de maneira facil, basta usar o Chatgpt:
  -  Me dê uma função em typescript que gere um slug a partir de um texto sem acentos, símbolos ou espaços, ou seja, pronto para ser usado em uma URL
  ```bash
      export function generateSlug(text: string): string {
      return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
    }
  ```
- Arquivo para pre-popular nosso BD, o arquivo *seed* em prisma
- Em package.json:
```bash
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
```
depois rode o comando para popular o banco:
```bash
  npx prisma db seed
```
- Documentação da Api usando o Swagger: https://swagger.io/ e iremos usar o fastify junto com ele para gerar o arquivo de documentação yml ou json da API *fastify/swagger*, o *fastify/swagger-ui* cria a interface para visualizar/navegar pela documentação da API
```bash 
  npm i @fastify/swagger @fastify/swagger-ui
```
- Para abrir e testar a documentação da API, basta acessar a rota /docs: http://localhost:3000/docs