FROM python:3.11-slim

WORKDIR /app
COPY server.py .

# Copy the main SPA (VitePress/React)
# This becomes /app/static/
COPY dist/ /app/static/

# Copy the Javadoc files
# This becomes /app/static/javadoc/
COPY javadoc/ /app/static/javadoc/

# Set permissions for all static content
RUN chmod -R 755 /app/static

EXPOSE 8080

CMD ["python", "server.py"]