from google_auth_oauthlib.flow import InstalledAppFlow
from google.cloud import pubsub_v1
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from googleapiclient.errors import HttpError
from pymongo import MongoClient
import base64

load_dotenv()

# Scopes for Gmail API
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

# all messages from jobjug.co in the inbox of kelvinwong0519@gmail.com
MONGO_DB_URL = os.getenv("MONGO_DB_URL")
mongoClient = MongoClient(MONGO_DB_URL)
db = mongoClient.get_database("kelvinwong")

flow = InstalledAppFlow.from_client_secrets_file(
    "backend/client_secret.json", scopes=SCOPES
)
creds = flow.run_local_server()

service = build("gmail", "v1", credentials=creds)


def get_emails_from_google():
    results = service.users().messages().list(userId="me", q="@jobjug.co").execute()
    messages = results.get("messages", [])

    return messages


def get_emails_from_mongo():
    emails = db.get_collection("emails").find({})

    # for email in emails:
    # print(email)
    return emails


def fetch_new_emails():
    emails = get_emails_from_google()
    mgemails = get_emails_from_mongo()

    for email in emails:
        message_id = email["id"]
        email = service.users().messages().get(userId="me", id=message_id).execute()
        payload = email["payload"]
        headers = payload["headers"]
        time = email["internalDate"]
        snippet = email["snippet"]
        parts = payload["parts"]
        body_text: str = ""

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

        for header in headers:
            if header["name"] == "From":
                from_email: str = header["value"]
                if not "jobjug.co" in from_email:
                    print("Email not from jobjug.co")
                    continue
            elif header["name"] == "To":
                to_email: str = header["value"]
                email_name = to_email.split("@")[0]
            elif header["name"] == "Date":
                date: str = header["value"]  # printable time
            elif header["name"] == "Subject":
                subject: str = header["value"]

        email_json = {
            "from": from_email,
            "to": to_email,
            "str_time": date,
            "subject": subject,
            "body": body_text,
            "snippet": snippet,
            "unix_time": time,
        }


fetch_new_emails()
