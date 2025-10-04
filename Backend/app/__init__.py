from flask import Flask
from flask_cors import CORS
from app.config.database import init_db_pool, close_db_pool
from app.routes.covid_routes import covid_bp

def create_app():
    """Application factory pattern"""
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # Initialize database pool
    init_db_pool()

    # Register blueprints
    app.register_blueprint(covid_bp, url_prefix='/api/covid')

    # Health check endpoints
    @app.route('/')
    def index():
        return {
            'message': 'COVID-19 Dashboard API',
            'version': '1.0.0',
            'status': 'running'
        }

    @app.route('/health')
    def health():
        from app.config.database import get_db_connection, return_db_connection
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) FROM covid_data')
            count = cursor.fetchone()[0]
            cursor.close()
            return_db_connection(conn)

            return {
                'status': 'healthy',
                'database': 'connected',
                'total_records': count
            }
        except Exception as e:
            return {
                'status': 'unhealthy',
                'database': 'disconnected',
                'error': str(e)
            }, 500

    return app
