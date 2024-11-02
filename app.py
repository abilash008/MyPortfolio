from flask import Flask, render_template, request, redirect, url_for, Response
import sqlite3
from functools import wraps

app = Flask(__name__)

# Replace with your actual credentials
ADMIN_USERNAME = "Abilash_3x11"
ADMIN_PASSWORD = "Itsme@bhi2230"

# Authentication functions
def check_auth(username, password):
    """Check if a username/password combination is valid."""
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD

def authenticate():
    """Send a 401 response that enables basic auth."""
    return Response(
        'Could not verify your login!\nYou need to login with proper credentials', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    """Decorator that requires authentication for a route."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated

# Initialize the database and create the table if it doesn't exist
def init_db():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # Check if form data is complete
    if not name or not email or not message:
        return "Please fill in all fields", 400
    
    # Connect to the database and save the form data
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO contacts (name, email, message)
        VALUES (?, ?, ?)
    ''', (name, email, message))
    conn.commit()
    conn.close()
    
    return redirect(url_for('index'))

# Route to view all form submissions (protected by authentication)
@app.route('/submissions')
@requires_auth
def submissions():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM contacts')
    submissions = cursor.fetchall()
    conn.close()
    
    return render_template('submissions.html', submissions=submissions)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
