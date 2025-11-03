import psycopg2
from psycopg2 import pool
import os
from dotenv import load_dotenv
import time

load_dotenv()

# Database connection pool
db_pool = None

def init_db_pool(max_retries=30, retry_delay=2):
    """Initialize database connection pool with retry logic"""
    global db_pool
    
    host = os.getenv('DB_HOST', 'localhost')
    port = os.getenv('DB_PORT', '5432')
    user = os.getenv('DB_USER', 'labuser')
    password = os.getenv('DB_PASSWORD', 'labpass')
    database = os.getenv('DB_NAME', 'labdb')
    
    for attempt in range(max_retries):
        try:
            db_pool = psycopg2.pool.SimpleConnectionPool(
                1, 20,
                host=host,
                port=port,
                user=user,
                password=password,
                database=database,
                connect_timeout=5
            )
            print(f"✅ Database connection pool created successfully on attempt {attempt + 1}")
            return db_pool
        except Exception as e:
            print(f"⏳ Attempt {attempt + 1}/{max_retries}: Error connecting to database: {e}")
            if attempt < max_retries - 1:
                print(f"   Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                print(f"❌ Failed to connect to database after {max_retries} attempts")
                raise e

def get_db_connection():
    """Get a connection from the pool"""
    if db_pool:
        return db_pool.getconn()
    else:
        raise Exception("Database pool not initialized")

def return_db_connection(conn):
    """Return a connection to the pool"""
    if db_pool:
        db_pool.putconn(conn)

def close_db_pool():
    """Close all connections in the pool"""
    if db_pool:
        db_pool.closeall()
        print("🔒 Database connection pool closed")
