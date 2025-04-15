# WhatsApp API - Docker

This project is an API that uses the **Venom** library to integrate with WhatsApp, running inside a Docker container.

---

## 📦 Prerequisites

- [Docker](https://www.docker.com/) installed on your machine.
- A `.env` file with the required environment variables (example below).

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the project with the following variables:

```env
# PostgreSQL database variables
DB_HOST=host.docker.internal
DB_NAME=desluc
DB_USER=postgres
DB_PASS=admin
DB_PORT=5432

# Application variables
JWT_SECRET=token
