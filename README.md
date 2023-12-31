# Smart Ryokou（Smart旅行）

Getting your trip advised by AI

## Getting Started

Always checkout from and merge to develop branch

### Installation

1. Install husky and npm-run-all packages from root directory

   ```sh
   npm install
   ```

2. Install NPM and poetry packages

   ```sh
    cd frontend
    npm install
    cp .env.example .env
   ```

3. Install Python packages

   ```sh
    cd backend
    poetry install
    cp .env.example .env
   ```

4. Run the project from root directory

   ```sh
    npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) for frontend and [http://localhost:8000](http://localhost:8000) for backend with to see the result.

6. Run `docker compose up -d` to boot redis and mongodb instance (`docker compose down` to stop them)