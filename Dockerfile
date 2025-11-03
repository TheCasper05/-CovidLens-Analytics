# Railway Dockerfile for Python Backend
FROM python:3.10-slim

WORKDIR /app

# Copy backend files
COPY Backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY Backend/ ./

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Railway provides PORT env variable
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:$PORT run:app"]
