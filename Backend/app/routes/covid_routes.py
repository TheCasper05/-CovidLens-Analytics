from flask import Blueprint, jsonify, request
from app.config.database import get_db_connection, return_db_connection

covid_bp = Blueprint('covid', __name__)

@covid_bp.route('/continents', methods=['GET'])
def get_cases_by_continent():
    """Get total cases and deaths by continent"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            SELECT
                continent,
                MAX(total_cases) AS total_cases,
                MAX(total_deaths) AS total_deaths
            FROM covid_data
            WHERE continent IS NOT NULL
            GROUP BY continent
            ORDER BY total_cases DESC
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        result = [
            {
                'continent': row[0],
                'total_cases': int(row[1]) if row[1] else 0,
                'total_deaths': int(row[2]) if row[2] else 0
            }
            for row in rows
        ]

        cursor.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@covid_bp.route('/top-countries', methods=['GET'])
def get_top_countries():
    """Get top countries by metric"""
    conn = None
    try:
        metric = request.args.get('metric', 'total_cases')
        limit = int(request.args.get('limit', 10))

        valid_metrics = ['total_cases', 'total_deaths', 'total_vaccinations', 'people_vaccinated']
        if metric not in valid_metrics:
            return jsonify({'error': 'Invalid metric'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        query = f"""
            SELECT
                location,
                MAX({metric}) AS value
            FROM covid_data
            WHERE continent IS NOT NULL
                AND {metric} IS NOT NULL
            GROUP BY location
            ORDER BY value DESC
            LIMIT %s
        """
        cursor.execute(query, (limit,))
        rows = cursor.fetchall()

        result = [
            {
                'location': row[0],
                'value': float(row[1]) if row[1] else 0
            }
            for row in rows
        ]

        cursor.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@covid_bp.route('/time-series', methods=['GET'])
def get_time_series():
    """Get time series data for a location"""
    conn = None
    try:
        location = request.args.get('location', 'World')
        metric = request.args.get('metric', 'total_cases')

        valid_metrics = ['total_cases', 'total_deaths', 'total_vaccinations', 'new_cases', 'new_deaths']
        if metric not in valid_metrics:
            return jsonify({'error': 'Invalid metric'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        query = f"""
            SELECT
                date,
                {metric} AS value
            FROM covid_data
            WHERE location = %s
                AND {metric} IS NOT NULL
            ORDER BY date ASC
        """
        cursor.execute(query, (location,))
        rows = cursor.fetchall()

        result = [
            {
                'date': row[0].strftime('%Y-%m-%d'),
                'value': float(row[1]) if row[1] else 0
            }
            for row in rows
        ]

        cursor.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@covid_bp.route('/locations', methods=['GET'])
def get_locations():
    """Get all unique locations (countries)"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            SELECT DISTINCT location
            FROM covid_data
            WHERE continent IS NOT NULL
            ORDER BY location ASC
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        result = [row[0] for row in rows]

        cursor.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@covid_bp.route('/summary', methods=['GET'])
def get_summary():
    """Get global summary statistics"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            SELECT
                total_cases,
                total_deaths,
                total_vaccinations,
                date as last_update
            FROM covid_data
            WHERE location = 'World'
            ORDER BY date DESC
            LIMIT 1
        """
        cursor.execute(query)
        row = cursor.fetchone()

        if row:
            result = {
                'total_cases': float(row[0]) if row[0] else 0,
                'total_deaths': float(row[1]) if row[1] else 0,
                'total_vaccinations': float(row[2]) if row[2] else 0,
                'last_update': row[3].strftime('%Y-%m-%d')
            }
        else:
            result = {}

        cursor.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)

@covid_bp.route('/date-range', methods=['GET'])
def get_data_by_date_range():
    """Get data for a specific date range"""
    conn = None
    try:
        location = request.args.get('location', 'World')
        start_date = request.args.get('startDate')
        end_date = request.args.get('endDate')

        if not start_date or not end_date:
            return jsonify({'error': 'startDate and endDate are required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            SELECT
                date,
                total_cases,
                total_deaths,
                new_cases,
                new_deaths,
                total_vaccinations
            FROM covid_data
            WHERE location = %s
                AND date BETWEEN %s AND %s
            ORDER BY date ASC
        """
        cursor.execute(query, (location, start_date, end_date))
        rows = cursor.fetchall()

        result = [
            {
                'date': row[0].strftime('%Y-%m-%d'),
                'total_cases': float(row[1]) if row[1] else 0,
                'total_deaths': float(row[2]) if row[2] else 0,
                'new_cases': float(row[3]) if row[3] else 0,
                'new_deaths': float(row[4]) if row[4] else 0,
                'total_vaccinations': float(row[5]) if row[5] else 0
            }
            for row in rows
        ]

        cursor.close()
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if conn:
            return_db_connection(conn)
