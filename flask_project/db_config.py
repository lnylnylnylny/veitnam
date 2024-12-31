import pymysql

def get_db_connection():
    try:
        connection = pymysql.connect(
            host="localhost",
            user="root",
            password="nayoung0626.",  # 비밀번호 확인
            database="patent_system",  # DB 이름 확인
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        return connection
    except Exception as e:
        print(f"Database connection error: {e}")
        raise
