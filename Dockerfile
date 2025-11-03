# Railway Dockerfile for Python Backend
FROM python:3.10-slim

WORKDIR /app

# Copy backend files
COPY Backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY Backend/ ./

# Railway provides PORT env variable
CMD gunicorn --bind 0.0.0.0:$PORT run:app
