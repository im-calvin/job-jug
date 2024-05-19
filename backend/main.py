from email_scrape import fetch_emails
from eval_gpt import evaluate_email
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
import json

app = Flask(__name__)
CORS(app)

MONGO_DB_URL = os.getenv("MONGO_DB_URL")
mongoClient = MongoClient(MONGO_DB_URL)
db = mongoClient.get_database("kelvinwong")


@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route('/api/analytics', methods=['GET'])
def get_analytics():
    username = request.args.get('username', type=str)
    emails = db.get_collection('emails').find({'to': username})
    res = []
    for email in emails:
        res.append(convert_db_to_fe(email))
    print(res)
    return jsonify(res)

@app.route("/api/emails", methods=["GET"])
def get_emails():
    username = request.args.get("username", type=str)
    if not username or username == 'undefined':
        return jsonify([])
    # will give user and email
    all_emails, new_emails = fetch_emails(db)
    res = []

    # will give company name, position name and status
    for email in all_emails:
        # only evaluate the email if it is new
        if email in new_emails:
            prev_jobs = db.get_collection('jobs').find({'user': username})
            eval_data = evaluate_email(f'{email['subject']}{email["body"]}', prev_jobs)

            status = eval_data[0]
            position_name = eval_data[2]
            company_name = eval_data[1]

            # only insert if company, position, user does not exist
            if not db.get_collection('jobs').find_one({'company': company_name, 'user': username, 'position': position_name}):
                db.get_collection('jobs').insert_one({'company': company_name, 'user': username, 'position': position_name})

            email.update(
                {
                    "status": status,
                    "position": position_name,
                    "company": company_name,
                }
            )

            # then update the database
            if db.get_collection("emails").find_one({"email_id": email["email_id"]}):
                db.get_collection("emails").update_one({
                    "email_id": email["email_id"]
                }, {
                    "$set": {
                        "status": status,
                        "position": position_name,
                        "company": company_name,
                    }
                }) # this probably will never happen.
                print('Something weird happened. Email already exists in the database.') # maybe an email reply will trigger this actually 
            elif db.get_collection('emails').find_one({'position': position_name, 'company': company_name}):
                # if there is no previous email then check for position and company and then update the status
                prev = db.get_collection('emails').find_one({'position': position_name, 'company': company_name})
                db.get_collection("emails").update_one(
                    {
                        "position": position_name,
                        "company": company_name,
                    },
                    {
                        "$set": {
                            "status": f"{prev['status']}{status}",
                            "position": position_name,
                            "company": company_name,
                        }
                    },
                )
            else:
                # the email is completely new (status should be 1)
                # assert status == 1
                db.get_collection("emails").insert_one(email)
        # if the email is not new, then check if it matches the username
    for email in all_emails:
        if email["to"] == username:
            res.append(email)
    fe_res = []
    for d_json in res:
        fe_res.append(convert_db_to_fe(d_json))
    print(fe_res)
    return jsonify(fe_res)


def convert_db_to_fe(db_json):
    return {
        "id": str(db_json["email_id"]),
        "status": db_json["status"],
        "new": db_json["new"],
        "title": db_json["position"],
        "company": db_json["company"],
        "date": db_json["str_time"],
    }


if __name__ == "__main__":
    app.run(debug=True, port=5000)
