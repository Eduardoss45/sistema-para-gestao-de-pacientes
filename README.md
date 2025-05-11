# Sistema de Gestão de Pacientes

Este é um sistema de gestão de pacientes com funcionalidades de cadastro, atualização, e acompanhamento de atendimentos médicos. O sistema também inclui a capacidade de enviar e-mails de boas-vindas para os pacientes.

### Tecnologias Utilizadas:

- **Node.js**: Backend com servidor HTTP.
- **Express**: Framework para criação do servidor.
- **Prisma**: ORM para gerenciamento de banco de dados.
- **MySQL**: Banco de dados relacional utilizado para armazenar informações de pacientes e atendimentos.
- **Nodemailer**: Biblioteca para envio de e-mails.
- **Handlebars**: Motor de templates para renderização de páginas HTML no servidor.
- **Method-Override**: Permite o uso de métodos HTTP como PUT e DELETE em formulários HTML.

---

## Estrutura de Arquivos

```
├── config/                    # Configurações
│   └── email.js               # Configurações de email
├── controllers/               # Lógica de negócios
│   └── controllers.js         # Funções para manipulação de dados
├── prisma/                    # Configurações do Prisma
│   └── client.js              # Instância do Prisma Client
│   └── schema.prisma          # Model do Prisma Client
├── public/                    # Arquivos estáticos (CSS, JS, imagens)
├── routes/                    # Definição das rotas
│   └── routes.js              # Roteamento da aplicação
├── views/                     # Templates Handlebars
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências e scripts
└── index.js                   # Configuração do servidor Express
```

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Eduardoss45/express-prisma-sql.git
```

### 2. Navegar para o diretório do projeto

```bash
cd express-prisma-sql-main
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="mysql://root@localhost:3306/nodeprisma"
USERAPP="seu-email@gmail.com"
PASSAPP="sua-senha"
```

### 5. Iniciar o servidor

```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`.

---

## Funcionalidades

- **Cadastro de Pacientes**: Criação de novos pacientes com nome e e-mail.
- **Listagem de Pacientes**: Visualização de todos os pacientes cadastrados.
- **Atualização de Pacientes**: Edição de dados do paciente e criação de atendimentos relacionados.
- **Cadastro de Atendimentos**: Criação de novos atendimentos para pacientes.
- **Envio de E-mail de Boas-vindas**: Envio de e-mail para pacientes recém-cadastrados.

---

## Endpoints da API

| Método   | Rota                      | Descrição                                  |
| -------- | ------------------------- | ------------------------------------------ |
| `GET`    | `/`                       | Página inicial                             |
| `POST`   | `/create/paciente`        | Cadastrar um novo paciente                 |
| `GET`    | `/get/pacientes`          | Listar todos os pacientes                  |
| `GET`    | `/get/paciente/:id`       | Detalhar um paciente específico            |
| `POST`   | `/create/atendimento`     | Cadastrar um novo atendimento              |
| `GET`    | `/get/atendimentos`       | Listar todos os atendimentos               |
| `GET`    | `/get/atendimento/:id`    | Detalhar um atendimento específico         |
| `PATCH`  | `/edit/paciente/:id`      | Editar um paciente                         |
| `PATCH`  | `/edit/atendimento/:id`   | Editar um atendimento                      |
| `DELETE` | `/remove/atendimento/:id` | Deletar um atendimento                     |
| `DELETE` | `/remove/paciente/:id`    | Deletar um paciente                        |
| `POST`   | `/email/paciente`         | Enviar e-mail de boas-vindas para paciente |

---

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

### Observações

Se houver algo mais a ser adicionado ou alguma dúvida, fique à vontade para abrir um novo issue ou pull request.
