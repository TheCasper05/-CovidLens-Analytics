import os
from app import create_app
from dotenv import load_dotenv

load_dotenv()

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    print(f"🚀 Server running on port {port}")
    print(f"📊 API endpoints available at http://localhost:{port}/api/covid")
    app.run(host='0.0.0.0', port=port, debug=True)
