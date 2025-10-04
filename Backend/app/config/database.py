import psycopg2
from psycopg2 import pool
import os
from dotenv import load_dotenv

load_dotenv()

# Database connection pool
db_pool = None

def init_db_pool():
    """Initialize database connection pool"""
    global db_pool
    try:
        db_pool = psycopg2.pool.SimpleConnectionPool(
            1, 20,
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432'),
            user=os.getenv('DB_USER', 'labuser'),
            password=os.getenv('DB_PASSWORD', 'labpass'),
            database=os.getenv('DB_NAME', 'labdb')
        )
        print("✅ Database connection pool created successfully")
        return db_pool
    except Exception as e:
        print(f"❌ Error creating database pool: {e}")
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
