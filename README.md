<b>PROGRAMA STARTER FULL STACK WEB - GROWDEV</b>

<b>Módulo: BANCO DE DADOS II</b>

<b>Atividade final do módulo</b>

<b>GROWTWITTER BD API</b>

<hr>

Este projeto consiste em uma aplicação desenvolvida em Node.js com o uso de TypeScript e Prisma (ORM), que simula comandos básicos do Twitter:

##### CADASTRO DE USUÁRIOS
##### CRIAÇÃO DE TWEET'S
##### LIKES
##### REPLIES
##### AUTENTICAÇÃO DE USUÁRIOS

<hr>

Requisitos / Features: 

1. instalar o Prisma no projeto para modelar e criar as tabelas da aplicação, com os seguintes requisitos:
- Cadastro de usuários;
- Cadastro de tweets por usuários;
- Likes em tweets.
- Autenticação de usuários.;
  
2. Requisitos do Bando de Dados:
- Configurar o Prisma ORM.
- Conectar a um banco de dados PostgreSQL.
• Criar no BD todas as tabelas necessárias para armazenar os dados, usando os models do Prisma.
  
3. Requisitos API:
- Criar uma API usando o Express para o projeto.
- Fazer o CRUD para as seguintes funcionalidades:
• Usuários
• Tweets
• Likes
- Implementar rota para login de usuários.
- A autenticação deve ser feita com username/email e senha.
- As seguintes funcionalidades só poderão ser executadas mediante login:
• Tweets
• Likes

4. Regras para Tweets:
- Devem ter id único.
- Possui um tipo (Tweet ou Reply).
- Devem ser de apenas 1 usuário.
- Podem conter likes e replies.
   
5. Regras para a feature Like:
- Um usuário poderá curtir (like) um Tweet específico.
- Um tweet pode ter zero ou vários likes.
- Um usuário não pode curtir mais de uma vez o mesmo tweet.
  
<hr>

### Tecnologias

- Nodejs
- TypeScript
- React
- BD (Postgres)
- Primas (ORM)

<hr>

<b>Instalação</b>

1 - Clone este repositório: https://github.com/Ligueja/growtwitter_api_db.git

2 - Execute npm install para instalar as dependências.

<hr>

<b>Execução:</b>
Execute npm run dev para iniciar o servidor.
