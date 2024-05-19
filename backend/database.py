from pymongo import MongoClient

from dotenv import load_dotenv
import os

from datetime import datetime
#datetime.now()
import random

load_dotenv()

connection = os.getenv("mongodb_connection")

def get_database():
 
   # Provide the mongodb atlas url to connect python to mongodb using pymongo
   CONNECTION_STRING = connection
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(CONNECTION_STRING)

   # Create the database for our example (we will use the same database throughout the tutorial
   return client['studyspaces']
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()


def add_database(table_id, location, is_full):
    dbname = get_database()
    collection_name = dbname["tables"]

    #generate some shit
    now = datetime.now()
    random_battery = random.randint(10, 99)/100
    random_pop = random.randint(10, 99)/100
    random_totalusers = random.randint(0, 99)
        
    table_0 = {
        #"_id" : "U1IT00002",
        "last_updated" : now,
        "last_occupied" : now,
        "table_id" : table_id,
        "location" : location,
        "battery" : random_battery,
        "popularity" : random_pop,
        "total_users" : random_totalusers,
        "is_full" : is_full
    }

    collection_name.insert_one(table_0)
    #collection_name.insert_many([table_1,table_2])
    
def edit_database(table_id, location, is_full):
    dbname = get_database()
    collection_name = dbname["tables"]

    #generate some shit
    now = datetime.now()
    
    x = collection_name.find_one({"table_id": table_id, "location":location})
    last_occupied = x["last_occupied"]
    
    if is_full:
        last_occupied = now
    
    my_query = {"table_id": table_id, "location":location}
    
    new_values = {
        "$set": {
            "is_full": is_full,  # New value for 'is_full'
            "last_updated" : now,
            "last_occupied": last_occupied,  # New value for 'last_occupied'
        }
    }
    
    collection_name.update_one(my_query, new_values)
    
        