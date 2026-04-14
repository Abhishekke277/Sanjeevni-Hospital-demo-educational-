from flask import Flask, render_template, request
import mysql.connector
import os

app = Flask(__name__)

# ✅ Database connection function
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQLHOST"),
        user=os.getenv("MYSQLUSER"),
        password=os.getenv("MYSQLPASSWORD"),
        database=os.getenv("MYSQLDATABASE"),
        port=int(os.getenv("MYSQLPORT"))
    )

# ✅ Home route (form page)
@app.route('/')
def index():
    return render_template('index.html')

# ✅ Form submit route
@app.route('/submit', methods=['POST'])
def submit():
    try:
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')

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