# Smart Ryokou（Smart旅行）

Getting your trip advised by AI by input place, time, budget, interests, etc. information and AI will generated a plan for you. You can customize your generated plan easily by adding new location or restaurant, drag and drop each travel location to fit your needs.

<img width="1440" alt="homepage" src="https://github.com/chanon-mike/smart-ryokou/assets/27944646/7d821397-56fd-4c00-85b3-7c016d270dab">
<img width="1440" alt="recommendation" src="https://github.com/chanon-mike/smart-ryokou/assets/27944646/175b0585-4ee8-43e4-848c-e47dd3499cbf">


## Getting Started

Always checkout from and merge to develop branch (main branch is release branch)

### Installation

1. Install husky and npm-run-all packages from root directory

   ```sh
   npm install
   ```

2. Install NPM and poetry packages

   ```sh
    cd webapp
    npm install
    cp .env.example .env
   ```

3. Install Python packages (using poetry)

   ```sh
    cd llm
    poetry install
    cp .env.example .env
   ```

4. Run the project from root directory

   ```sh
    npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) for web application and [http://localhost:8000](http://localhost:8000) for openai client with to see the result.

6. Run `docker compose up -d` to boot redis and mongodb instance (`docker compose down` to stop them)
