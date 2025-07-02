# Kamus Negeri Malaysia

A CRUD API for Malaysian states dictionary using NestJS, TypeScript, and Sequelize with MySQL.

## Project Structure

```
kamus-negeri/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── kamus/    # Kamus module (dictionary entries)
│   │   ├── negeri/   # Negeri module (Malaysian states)
│   │   └── database/ # Database configuration
└── frontend/         # Frontend application (to be implemented)
```

## Backend Setup

### Prerequisites

- Node.js
- pnpm
- MySQL database (MariaDB 10.11)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mustaffa96/kamus-negeri.git
   cd kamus-negeri/backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   DB_HOST=mysql-ahmad.alwaysdata.net
   DB_PORT=3306
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database_name
   PORT=3000
   ```

4. Start the development server:
   ```bash
   pnpm run start:dev
   ```

### API Endpoints

The API will be available at `http://localhost:3000` with the following endpoints:

#### States (Negeri)

- `GET /negeri` - Get all states or search by name
- `GET /negeri/:id` - Get a specific state by ID
- `POST /negeri` - Create a new state
- `PATCH /negeri/:id` - Update an existing state
- `DELETE /negeri/:id` - Delete a state

#### Dictionary Entries (Kamus)

- `GET /kamus` - Get all dictionary entries or search by dialect
- `GET /kamus/:id` - Get a specific entry by ID
- `GET /kamus/negeri/:negeriId` - Get all entries for a specific state
- `POST /kamus` - Create a new dictionary entry
- `PATCH /kamus/:id` - Update an existing entry
- `DELETE /kamus/:id` - Delete an entry

### Swagger Documentation

API documentation is available at `http://localhost:3000/api` when the server is running.

## Database Schema

### Negeri Table

The `negeri` table contains information about Malaysian states:

- `id` - Primary key
- `name` - Name of the Malaysian state (e.g., "Selangor")
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Kamus Table

The `kamus` table contains dictionary entries with dialect words from Malaysian states:

- `id` - Primary key
- `dialek` - The dialect or local word
- `maksud` - The meaning of the dialect word in standard Malay
- `contoh_ayat` - Example sentence using the dialect word
- `negeri_id` - Foreign key referencing the state (negeri) this dialect belongs to
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Example Usage

### Create a new state

```bash
curl -X POST http://localhost:3000/negeri \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Selangor"
  }'
```

### Create a new dictionary entry

```bash
curl -X POST http://localhost:3000/kamus \
  -H "Content-Type: application/json" \
  -d '{
    "dialek": "Hangpa",
    "maksud": "Kamu semua",
    "contoh_ayat": "Hangpa nak pergi mana?",
    "negeri_id": 1
  }'
```

### Get all dictionary entries for a specific state

```bash
curl http://localhost:3000/kamus/negeri/1
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
