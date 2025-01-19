# Sistema de Gerenciamento de Abrigos Temporários

Este projeto é parte do Trabalho de Conclusão de Curso (TCC) de Rafael Huszcza Machado no curso de Sistemas de Informação da Universidade Federal do Rio Grande (FURG). O sistema foi desenvolvido para gerenciar abrigos temporários no município de Rio Grande, facilitando a organização, a comunicação e a alocação de recursos.

## Tecnologias Utilizadas

### Front-End

- **Next.js**: Framework React para construção do front-end.
- **React-Leaflet**: Biblioteca para renderização de mapas interativos.
- **ShadCN UI**: Biblioteca para estilização moderna com suporte a temas claro e escuro.
- **React Hook Form**: Gerenciamento e validação de formulários.

### Back-End

- **Next.js API Routes**: Implementação de rotas de API no back-end.
- **Prisma**: ORM para manipulação de dados com PostgreSQL.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados.

### Infraestrutura

- **Docker**: Containerização da aplicação para facilitar o desenvolvimento e a implantação.
- **DigitalOcean**: VPS utilizada para hospedagem do sistema.
- **Cloudflare**: Gerenciamento de DNS e caching.

## Funcionalidades Principais

1. **Mapa Interativo**:

   - Exibe os abrigos cadastrados no sistema com marcadores no mapa.
   - Cada marcador contém informações detalhadas sobre o abrigo, como capacidade e status.

2. **Autenticação**:

   - Implementada com NextAuth.js, utilizando autenticação baseada em credenciais.
   - Garante a segurança de dados sensíveis e protege as funcionalidades administrativas.

3. **Gerenciamento de Abrigos**:

   - CRUD completo (criação, leitura, atualização e exclusão) de abrigos.

4. **Consulta de Dados**:
   - Implementação de consultas otimizadas via @tanstack/react-query.
   - Cache de dados para melhorar o desempenho da aplicação.

## Requisitos para Execução

1. **Pré-requisitos**:

   - Node.js 16+
   - Docker e Docker Compose

2. **Configuração de Variáveis de Ambiente**:
   Antes de iniciar, preencha o arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   NEXT_PUBLIC_API_URL=https://tcc.rafaelhuszcza.com/api
   NEXTAUTH_URL=https://tcc.rafaelhuszcza.com
   NEXTAUTH_SECRET=um-segredo-seguro
   ```

3. **Instalação**:

   - Clone este repositório:
     ```bash
     git clone https://github.com/RafaelHuszcza/tcc.git
     cd tcc
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```

4. **Configuração do Banco de Dados**:

   - Gere os arquivos do Prisma:
     ```bash
     npx prisma generate
     ```
   - Execute as migrações do banco:
     ```bash
     npx prisma migrate dev
     ```

5. **Execução**:
   - Para rodar localmente:
     ```bash
     npm run dev
     ```
   - Para executar com Docker:
     ```bash
     docker-compose up
     ```

## Deploy

O sistema está atualmente hospedado em: [tcc.rafaelhuszcza.com](https://tcc.rafaelhuszcza.com)

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça um commit com suas alterações:
   ```bash
   git commit -m 'Minha nova feature'
   ```
4. Envie as alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no repositório original.

## Licença

Este projeto está licenciado sob os termos da licença MIT. Consulte o arquivo `LICENSE` para mais informações.

## Contato

Para mais informações sobre este projeto, entre em contato com o autor:

- **Rafael Huszcza Machado**
- Email: [rafaelhuszcza@gmail.com](mailto:rafaelhuszcza@gmail.com)
- GitHub: [RafaelHuszcza](https://github.com/RafaelHuszcza)
