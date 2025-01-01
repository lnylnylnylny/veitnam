import csv
from db_config import get_db_connection

def insert_patent_data(csv_file):
    connection = get_db_connection()
    cursor = connection.cursor()

    with open(csv_file, "r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            cursor.execute(
                """
                INSERT INTO patents (title, description, date)
                VALUES (%s, %s, %s)
                """,
                (row["title"], row["description"], row["date"])
            )
    connection.commit()
    cursor.close()
    connection.close()
    print("Patent data inserted successfully!")

# CSV 파일 경로
insert_patent_data("patent_data.csv")
