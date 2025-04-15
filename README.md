# API WhatsApp - Docker

Este projeto é uma API que utiliza a biblioteca **Venom** para integração com o WhatsApp, executada dentro de um container Docker.

---

## 📦 Pré-requisitos

- [Docker](https://www.docker.com/) instalado na sua máquina.
- Um arquivo `.env` com as variáveis de ambiente necessárias (exemplo abaixo).

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Variáveis de banco de dados PostgreSQL
DB_HOST=host.docker.internal
DB_NAME=desluc
DB_USER=postgres
DB_PASS=admin
DB_PORT=5432

# Variáveis da aplicação
JWT_SECRET=token
