from google_auth_oauthlib.flow import InstalledAppFlow
from google.cloud import pubsub_v1
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os
from googleapiclient.errors import HttpError

load_dotenv()

# Scopes for Gmail API
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]


def get_credentials():
    flow = InstalledAppFlow.from_client_secrets_file(
        "backend/client_secret.json", scopes=SCOPES
    )
    creds = flow.run_local_server()

    session = flow.authorized_session()

    return creds


creds = get_credentials()

service = build("gmail", "v1", credentials=creds)
results = service.users().messages().list(userId="me").execute()
messages = results.get("messages", [])
print(messages)
