from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from db_config import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    user_id = data.get("id")
    password = data.get("password")
    name = data.get("name")
    email = data.get("email")
    nationality = data.get("nationality")

    if not all([user_id, password, name, email, nationality]):
        return jsonify({"success": False, "message": "All fields are required!"})

    hashed_password = generate_password_hash(password)

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO users (id, password, name, email, nationality)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (user_id, hashed_password, name, email, nationality)
        )
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"success": True, "message": "User registered successfully!"})
    except Exception as e:
        print(f"Register error: {e}")  # 디버깅 로그
        return jsonify({"success": False, "message": f"Database error: {str(e)}"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user_id = data.get("id")
    password = data.get("password")

    if not all([user_id, password]):
        return jsonify({"success": False, "message": "ID and Password are required."})

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("SELECT password FROM users WHERE id = %s", (user_id,))
        result = cursor.fetchone()

        if result and check_password_hash(result['password'], password):
            return jsonify({"success": True, "message": "Login successful!"})
        else:
            return jsonify({"success": False, "message": "Invalid credentials."})
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({"success": False, "message": f"Server error: {str(e)}"})
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'connection' in locals():
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
