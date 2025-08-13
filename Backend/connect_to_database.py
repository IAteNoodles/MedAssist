from fastmcp import FastMCP

mcp = FastMCP("HospitalDB")
from mariadb import connect, Error

import os
from dotenv import load_dotenv

load_dotenv()

user = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
database = os.getenv("DB_NAME")
host = os.getenv("DB_HOST")
port = int(os.getenv("DB_PORT"))


try:
    connection = connect(user=user, password=password, host=host, database=database, port=port)
    print("Connection to MariaDB Platform successful")
except Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")


@mcp.tool()
def change_database(new_database: str) -> str:
    """
    Changes the database connection to a new database.

    Args:
        new_database (str): The name of the new database to connect to.

    Returns:
        str: Confirmation message of the database change.
    """
    global connection
    try:
        connection.close()  # Close the current connection
        connection = connect(
            user=user, password=password, host=host, database=new_database
        )
        return f"Successfully changed to database: {new_database}"
    except Error as e:
        return f"Error changing database: {e}"


@mcp.tool()
def describe_tables() -> str:
    """
    Describes the tables in the hospital database.

    Returns:
        str: A description of the tables in the database.
    """
    query = "SHOW TABLES;"
    return execute_query(query)


@mcp.tool()
def execute_query(query: str) -> str:
    """
    Executes a SQL query on the hospital database.

    Args:
        query (str): The SQL query to execute.

    Returns:
        str: The result of the query execution.
    """
    cursor = None
    try:
        cursor = connection.cursor()
        cursor.execute(query)

        # For SELECT or SHOW queries, fetch and return results
        if query.strip().upper().startswith(("SELECT", "SHOW")):
            result = cursor.fetchall()
            return str(result)
        # For INSERT, UPDATE, DELETE, commit and return affected rows
        else:
            connection.commit()
            return f"Query executed successfully. Rows affected: {cursor.rowcount}"

    except Error as e:
        return f"Error executing query: {e}"
    finally:
        if cursor:
            cursor.close()


if __name__ == "__main__":
    mcp.run(
        transport="http",
        host="0.0.0.0",
        port=8000,
        log_level="debug",
    )

