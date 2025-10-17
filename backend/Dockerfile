# 1️⃣ Base image
FROM node:22-bookworm-slim

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first (da cache radi ispravno)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm ci

# 5️⃣ Copy ostatak koda
COPY . .

# 6️⃣ Pokreni dev server
CMD [ "npm", "run", "dev" ]