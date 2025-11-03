# Railway Dockerfile for Python Backend
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY Backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend files
COPY Backend/ .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Expose port (Railway will override with $PORT)
EXPOSE 8080

# Start gunicorn
CMD gunicorn --bind 0.0.0.0:${PORT:-8080} run:app
