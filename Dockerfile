# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy HTML, CSS, JS files
COPY index.html .
COPY style.css .
COPY script.js .

# Expose port
EXPOSE 8000

# Serve the files
CMD ["npx", "http-server", "-p", "8000", "--cors"]
