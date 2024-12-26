import pymysql

def get_db_connection():
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="nayoung0626.",
        database="patent_system",
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection
