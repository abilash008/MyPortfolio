# database_setup.py
import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect("portfolio.db")
cursor = conn.cursor()

# Create a table for storing form submissions
cursor.execute('''
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
''')

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database and table created successfully.")
