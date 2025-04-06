    # 1. Base image
FROM node:18-alpine AS build

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of the app and build it
COPY . .
RUN npm run build

# 5. Serve the app with a lightweight web server (e.g., nginx or serve)
FROM nginx:alpine

# 6. Copy build output to nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# 7. Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 8. Expose port and start server
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
