# To-Do List Full-Stack com Autenticação

### [DEPLOY](https://to-do-list-ten-rust-85.vercel.app/)

Este é um projeto full-stack completo que consiste em uma API RESTful segura construída com .NET e um front-end reativo construído com React e TypeScript. A aplicação permite que usuários se cadastrem, façam login e gerenciem suas próprias tarefas (CRUD completo), com um sistema de autenticação e autorização baseado em Tokens JWT.

Este projeto foi desenvolvido como um estudo aprofundado das melhores práticas de desenvolvimento web, focando em segurança, arquitetura limpa e integração entre back-end e front-end.

## ✨ Funcionalidades Principais

### 🔐 Autenticação de Usuários
- Endpoint para **registro** de novos usuários com validação de dados
- Endpoint para **login** que retorna um Token JWT
- Segurança de senhas garantida com **hashing e salting (BCrypt)**

### 🛡️ Autorização Segura
- Endpoints da API de tarefas são protegidos e só podem ser acessados por usuários autenticados
- Lógica de negócio que garante que um usuário só pode visualizar, criar, atualizar e deletar as **suas próprias tarefas**

### 📝 Gerenciamento de Tarefas (CRUD Completo)
- `GET /api/tasks`: Lista todas as tarefas do usuário autenticado
- `POST /api/tasks`: Cria uma nova tarefa para o usuário autenticado
- `PUT /api/tasks/{id}`: Atualiza uma tarefa existente
- `DELETE /api/tasks/{id}`: Deleta uma tarefa

### 💻 Front-end Reativo e Intuitivo
- Interface construída em React com TypeScript
- Roteamento do lado do cliente com rotas públicas e privadas
- Gerenciamento de estado para uma experiência de usuário fluida
- Formulários para login, registro e criação de tarefas com validação

## 🏗️ Arquitetura e Decisões Técnicas

Este projeto foi construído com foco em **arquitetura limpa e separação de responsabilidades**.

### Backend (.NET)

- **API RESTful:** A API foi projetada seguindo os padrões REST, utilizando os verbos HTTP e códigos de status corretamente
- **Injeção de Dependência:** Utiliza a injeção de dependência nativa do ASP.NET Core para gerenciar serviços como o `DbContext` e `IConfiguration`
- **Padrão de DTOs e Mappers:** Foram criados Data Transfer Objects (DTOs) específicos para as requisições (entrada) e respostas (saída), garantindo que a API tenha um "contrato" claro e não exponha as entidades do banco de dados. Um Mapper estático foi utilizado para a conversão, mantendo os controllers limpos
- **Entity Framework Core:** Utilizado como ORM para a comunicação com o banco de dados SQL Server, com a estrutura do banco sendo gerenciada por **Migrations**
- **Segurança:** A autenticação é stateless, utilizando Tokens JWT com tempo de vida definido. Segredos da aplicação, como a chave do JWT e a Connection String, são gerenciados de forma segura com o **User Secrets** em desenvolvimento e **variáveis de ambiente** em produção

### Frontend (React)

- **Componentização:** A interface foi dividida em componentes reutilizáveis (Formulários, Tarefas, Header)
- **Custom Hooks:** A lógica de estado e as chamadas à API do formulário de login/registro foram abstraídas para um custom hook (`useLoginForm`), separando a lógica da apresentação
- **Roteamento:** Utiliza `react-router-dom` para criar uma experiência de Single-Page Application (SPA), com um componente `ProtectedRoute` que protege as rotas que exigem autenticação
- **Gerenciamento de Token:** O token JWT é armazenado no `localStorage` e anexado a cada requisição para endpoints protegidos através do cabeçalho `Authorization`

## 📸 Screenshots
<img width="1183" height="909" alt="image" src="https://github.com/user-attachments/assets/eb42e813-56b1-4432-b220-1e3c6c890bd5" />
<img width="1189" height="911" alt="image" src="https://github.com/user-attachments/assets/2d6f5e9d-3496-45d0-80db-a6b686e2e434" />
<img width="787" height="157" alt="image" src="https://github.com/user-attachments/assets/ab28335b-8796-4e55-adbb-0ee6b69bc0b3" />






## 🚀 Tecnologias Utilizadas

### Backend
- C# e .NET 8
- ASP.NET Core Web API
- Entity Framework Core 8
- SQL Server (local) / Azure SQL Database (produção)
- Autenticação com JWT (JSON Web Tokens)
- BCrypt.Net-Next para Hashing de Senhas

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS para estilização
- React Router DOM para roteamento
- `fetch` API para comunicação com o backend

### Deploy
- **Backend:** Azure App Service
- **Banco de Dados:** Azure SQL Database
- **Frontend:** Vercel
