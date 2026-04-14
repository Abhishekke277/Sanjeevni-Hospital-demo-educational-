from flask import Flask, request, jsonify
import mysql.connector
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)

# MySQL connection
try:
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )
    print("✅ Connected to MySQL successfully")
except mysql.connector.Error as err:
    print("❌ Database connection failed:", err)

# Home route (fix for 404)
@app.route('/')
def home():
    return "🚀 Server is running successfully!"

# Form submit route
@app.route('/submit', methods=['POST'])
def submit():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')

        cursor = db.cursor()

        query = """
        INSERT INTO contacts (name, email, phone, message)
        VALUES (%s, %s, %s, %s)
        """

        cursor.execute(query, (name, email, phone, message))
        db.commit()

        return jsonify({"message": "✅ Data Saved Successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)})

# Run server
if __name__ == '__main__':
    app.run(debug=True)