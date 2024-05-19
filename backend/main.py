from email_scrape import fetch_new_emails
from eval_gpt import evaluate_email
from database import *
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

MONGO_DB_URL = os.getenv("MONGO_DB_URL")
mongoClient = MongoClient(MONGO_DB_URL)
db = mongoClient.get_database("kelvinwong")


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/api/emails", methods=["GET"])
def get_emails(username: str):
    # will give user and email
    email_info = fetch_new_emails(username)
    res = []

    # will give company name, position name and status
    for email in email_info:
        if not email["new"]:
            continue
        # if email is new...
        eval_data = evaluate_email(email["body"])

        status = eval_data[0]
        position_name = eval_data[1]
        company_name = eval_data[2]

        res.append(
            email.update(
                {"status": status, "position": position_name, "company": company_name}
            )
        )

        # then update the database
        if db.get_collection(username).find_one({"email_id": email["email_id"]}):
            db.get_collection(username).update_one(
                {
                    "position": position_name,
                    "company": company_name,
                },
                {
                    "$set": {
                        "status": status,
                        "position": position_name,
                        "company": company_name,
                    }
                },
            )
        else:
            # assuming that there is no previous email
            db.get_collection(username).update_one(
                {"email_id": email["email_id"]},
                {
                    "$set": {
                        "status": status,
                        "position": position_name,
                        "company": company_name,
                    }
                },
            )
    return res
