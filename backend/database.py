from pymongo import MongoClient

from dotenv import load_dotenv
import os

from datetime import datetime

load_dotenv()

connection = os.getenv("MONGO_DB_URL")


def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = connection

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client["users"]


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":
    # Get the database
    dbname = get_database()


def in_database(dbname, username, position_name, company_name):
    collection_name = dbname[username]
    x = collection_name.find_one({"position": position_name, "company": company_name})
    if x == None:
        return False
    else:
        return True


def add_database(dbname, username, status, position_name, company_name):
    dbname = get_database()
    collection_name = dbname[username]

    # generate some shit
    now = datetime.now()

    application = {
        # "_id" : "U1IT00002",
        "class": status,
        "position": position_name,
        "company": company_name,
        "date": now,
    }

    collection_name.insert_one(application)
    # collection_name.insert_many([table_1,table_2])


def update_database(dbname, username, email_id, status, position_name, company_name):
    collection_name = dbname[username]

    x = collection_name.find_one({"position": position_name, "company": company_name})
    last_status = x["status"]

    if status != last_status:
        now = datetime.now()

        my_query = {"position": position_name, "company": company_name}

        new_values = {
            "$set": {"status": status, "date": now}  # New value for 'is_full'
        }

        collection_name.update_one(my_query, new_values)


dbname = get_database()
