ARG VITE_API_URL=/api

FROM node:20-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install

# Copy source
COPY . .

# Build the app
RUN npm run build

# ─── Production: Serve with nginx ─────────────────────────────────────
FROM nginx:alpine

# Copy the built frontend files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a clean nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
