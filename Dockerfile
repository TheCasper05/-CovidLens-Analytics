# Railway Dockerfile for Python Backend
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY Backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend files
COPY Backend/ .

# Make start script executable
RUN chmod +x start.sh

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Expose port
EXPOSE 8080

# Start using the script
CMD ["./start.sh"]
