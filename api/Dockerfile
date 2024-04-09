# Construindo a nossa imagem para produção

# Primeiro estagio
# Queremos trabalhar com base na imagem do node, basicamente um link https://hub.docker.com/_/node/ --> 1.1Giga bytes uma versão pura/completa, essa 20 trabalha com debian. Como iremos usar o alpine que é mais leve para executar a aplicação, iremos usar a versão 20 para caso precisarmos de algo mais pesado ou de algum pacote/recurso que não tenha no alpine, podemos usar essa versão --> Conceito de multi-estaged build, ou seja, podemos fazer um build em multiplos estagios. Aqui iremos pegar a imagem node:20 para instalar as dependencias e fazer o build da aplicação
# O nome base nada mais é que um alias para a imagem node:20
FROM node:20 AS base

# O run é um comando que roda alguma instrução dentro de uma imagem base
# O comando abaixo instala o pnpm porque a node:20 não tem ele, mas isso seria para quem estiver usando o pnpm
# RUN npm i -g pnpm

# Segundo estagio, toda vez que eu coloco um from é outro estagio, e os demais estagios pode usar recusos do estagio anterior e tudo o que você instalou no estagio anterior, você pode reaproveitar.
FROM base AS dependencies

# Quando entramos em um sistema operacional, precisamos definir um diretorio de trabalho, com isso, usamos o workdir é um comando que muda o diretorio de trabalho. Se não definir ele vai para o diretorio raiz do Sistema operacional(SO)
WORKDIR /usr/src/app

# COPY package*.json ./     ou:
COPY package.json package-lock.json ./
# Ele gera o node_module apos a instalação do npm install
RUN npm install

# Terceiro estagio
FROM base AS build

WORKDIR /usr/src/app

# Copia tudo . . é o diretorio atual. Mas dentro do .dockerignore podemos ignorar o node_modules entre outras coisas que estão aqui nesse diretorio atual
COPY . .
# E por conta que ignoramos o node_modules, precisamos usar a node_module gerada no estagio anterior e não desse diretorio atual
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm run build
RUN nopm prune --prod

# quarto  estagio, vamos rodar o projeto e executar o prisma. So que dessa vez iremos utilizar uma base que pesa menos que a anterior por conta da via de regra porque aqui nos trabalhamos com alpine --> 135mb. O alpine nos usamos mais para executar a nossa aplicação
FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app

# Poderiamos reaproveitar o node_modules do estagio anterior, mas para facilitar podemos instalar novamente
#RUN npm i -g pnpm prisma
RUN npm i -g prisma

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma

RUN npx prisma generate

# PARA EXPOR A PORTA
EXPOSE 3000

# CMD npm run start
CMD [ "npm", "start" ]