from flask import Flask, render_template, request
import mysql.connector
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

app = Flask(__name__)

# ✅ Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT"))  # This ensures it uses 22443
    )

# ✅ Home route
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return "TEST WORKING"

# ✅ Form submit route
@app.route('/submit', methods=['POST'])
def submit():
    try:
        # 🔥 Get form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')

        # 🔍 DEBUG print
        print("DEBUG:", name, email, phone, message , flush=True)

        # DB connection
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert query
        query = "INSERT INTO contacts (name, email, phone, message) VALUES (%s, %s, %s, %s)"
        values = (name, email, phone, message)

        cursor.execute(query, values)
        conn.commit()

        cursor.close()
        conn.close()

        return "✅ Data submitted successfully!"

    except Exception as e:
        return f"❌ Error: {str(e)}"

# ✅ Run app
if __name__ == '__main__':
    app.run(debug=True)