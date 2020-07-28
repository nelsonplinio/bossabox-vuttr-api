<h1 align="center">
  <a>
    <img src='https://bossabox.com/img/logo__bossabox_full.svg'>
  </a>
</h1>

<h2 align="center">
  🚀VUTTR API🐱‍👤
</h2>


## 🔍 Sobre

Uma aplicação VUTTR (Very Useful Tools to Remember). A aplicação é um simples repositório para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.
Está aplicação foi desenvolvida utilizando <b>Node.Js</b> com <b>Typescript</b> utilizando o <b> micro-framework express</b> com um arquitetura bem escalavel.

## 🔧 Configuração
###### Clone o repositorio
    ssh
     git clone git@github.com:nelsonplinio/bossabox-vuttr-api.git

    ou

    http
     git clone https://github.com/nelsonplinio/bossabox-vuttr-api.git

###### Instale as dependencias
    cd bossabox-vuttr-api
    yarn ou npm install

###### Configuração do banco de dados
    cp ormconfig.debug.json ormconfig.json

###### Configuração das variaveis de ambiente
    cp .env.example .env

## 🚀 Começar utilizar
###### Rodar container do banco de dados
    docker-compose up

###### Rodar api
    yarn dev:server

    ou

    npm run dev:server

##### 😁 Pronto !!🎉
    Api está rodando na porta :3000

##### Caso queira utilizar o insomnia
  Caso queira utilizar o insomnia para realizar os testes na api, click no butão abaixo.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=VUTTR_API&uri=https%3A%2F%2Fgithub.com%2Fnelsonplinio%2Fbossabox-vuttr-api%2Fblob%2Fmaster%2FVUTTR_API_INSOMNIA.json)

##### 🧪Rodar Testes !!
    yarn test

    ou

    npm run test

## ⚙️ Oque foi utilizado
  - <a href='https://nodejs.org/en/'>Node.Js</a>
  - <a href='https://expressjs.com/'>Express</a>
  - <a href='https://expressjs.com/'>TypeORM</a>
  - <a href='https://www.typescriptlang.org/'>TypeScript</a>
  - <a href='https://docs.mongodb.com/drivers/node'>MongoDB</a>
  - <a href='https://github.com/arb/celebrate#readme'>Celebration</a>
  - <a href='https://github.com/microsoft/tsyringe'>Tsyringe</a>
  - <a href='https://github.com/thenativeweb/uuidv4#readme'>uuidv4</a>
  - <a href='https://eslint.org/'>Eslint</a>
  - <a href='https://prettier.io/'>Prettier</a>
  - <a href='https://jestjs.io/'>Jest</a>
  - <a href='https://www.docker.com/'>Docker</a>
