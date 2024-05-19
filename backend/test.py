print("Hello World!")
      
      
# Database

from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

connection = os.getenv("mongodb_connection")

from pymongo import MongoClient
def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = connection
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)

   # Create the database for our example (we will use the same database throughout the tutorial
   return client['tables']
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()

print(dbname)

# Get the database using the method we defined in pymongo_test_insert file

# Import date class from datetime module
from datetime import datetime
#datetime.now()

collection_name = dbname["tables"]
# Create an index on the collection
category_index = collection_name.create_index("category")

now = datetime.now()

table_1 = {
    #"_id" : "U1IT00002",
    "last_updated" : now,
    "last_occupied" : now,
    "table_id" : "A0",
    "location" : "IKB",
    "battery" : 0.78,
    "popularity" : 0.1,
    "total_users" : 5,
    "is_empty" : True
}

table_2 = {
    #"_id" : "U1IT00002",
    "last_updated" : now,
    "last_occupied" : now,
    "table_id" : "A1",
    "location" : "IKB",
    "battery" : 0.78,
    "popularity" : 0.1,
    "total_users" : 5,
    "is_empty" : True
}

table_3 = {
    #"_id" : "U1IT00002",
    "last_updated" : now,
    "last_occupied" : now,
    "table_id" : "A2",
    "location" : "IKB",
    "battery" : 0.78,
    "popularity" : 0.1,
    "total_users" : 5,
    "is_empty" : True
}


collection_name.insert_many([table_1,table_2])

collection_name.insert_one(table_3)