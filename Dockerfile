# Multi-stage Dockerfile for the portfolio project
# Builds the frontend (Vite + React) and serves the static output with nginx.
# Backend in this repo targets Cloudflare (wrangler) so it's not packaged here.

### Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install simple build deps
COPY frontend/package.json frontend/package-lock.json* ./frontend/
WORKDIR /app/frontend
RUN npm install --no-audit --no-fund

# Copy source and build
COPY frontend/. ./
RUN npm run build


# Minimal nginx config for SPA fallback
RUN rm /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
