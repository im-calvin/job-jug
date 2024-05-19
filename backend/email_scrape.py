from google_auth_oauthlib.flow import InstalledAppFlow
from google.cloud import pubsub_v1
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from googleapiclient.errors import HttpError
from pymongo import MongoClient
import base64
import pickle

load_dotenv()

# Scopes for Gmail API
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

# all messages from jobjug.co in the inbox of kelvinwong0519@gmail.com
MONGO_DB_URL = os.getenv("MONGO_DB_URL")
mongoClient = MongoClient(MONGO_DB_URL)
db = mongoClient.get_database("kelvinwong")


def get_credentials():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first time.
    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(
            "backend/client_secret.json", SCOPES
        )
        creds = flow.run_local_server(port=8080)
        # Save the credentials for the next run
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)
    return creds


creds = get_credentials()


def get_emails_from_google():
    service = build("gmail", "v1", credentials=creds)
    results = service.users().messages().list(userId="me", q="@jobjug.co").execute()
    messages = results.get("messages", [])

    return messages


def fetch_emails(db):
    service = build("gmail", "v1", credentials=creds)
    emails = get_emails_from_google()
    all_emails, new_emails = [], []

    for email in emails:
        message_id = email["id"]
        # if message_id already in database then skip
        if db.get_collection("emails").find_one({"email_id": message_id}):
            all_emails.append(
                db.get_collection("emails").find_one({"email_id": message_id})
            )
            continue

        # if email not in database (new)
        email = service.users().messages().get(userId="me", id=message_id).execute()
        payload = email["payload"]
        headers = payload["headers"]
        time = email["internalDate"]
        snippet = email["snippet"]
        parts = payload["parts"]
        body_text: str = ""

        for header in headers:
            if header["name"] == "From":
                from_email: str = header["value"]  # company
            elif header["name"] == "To":
                to_email: str = header["value"]
                email_name = to_email.split("@")[0]
            elif header["name"] == "Date":
                date: str = header["value"]  # printable time
            elif header["name"] == "Subject":
                subject: str = header["value"]

        if payload["mimeType"] == "multipart/alternative":
            parts = payload["parts"]
            for part in parts:
                mimeType = part["mimeType"]
                body = part["body"]
                data = body["data"]
                data = data.replace("-", "+").replace("_", "/")
                decoded_data = base64.b64decode(data)

                if mimeType == "text/plain":
                    # The data from Gmail API is base64 URL safe encoded
                    # Decode the base64 data
                    print(decoded_data)
                    body_text += decoded_data.decode("utf-8")

        email_json = {
            "email_id": message_id,
            "from": from_email,
            "to": email_name,
            "str_time": date,
            "subject": subject,
            "body": body_text,
            "snippet": snippet,
            "unix_time": time,
            "new": True,
        }
        all_emails.append(email_json)
        new_emails.append(email_json)

        # db.get_collection("emails").insert_one(email_json)

    return all_emails, new_emails
