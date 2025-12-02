FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies and build the Vite bundle
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# Copy the production build from the builder stage
COPY --from=builder /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
