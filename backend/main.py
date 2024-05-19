from email_scrape import fetch_new_emails
from eval_gpt import evaluate_email
from database import *


def maincode():
    #will give user and email
    email_info = fetch_new_emails()
    email_txt = email_info[1]

    #will give company name, position name and status
    eval = evaluate_email(email_txt)

    username = email_info[0]
    status = eval[0]
    position_name = eval[1]
    company_name = eval[2]

    ###########################

    dbname = get_database()
    #existing position in company from user
    if in_database(dbname, username, status, position_name, company_name):
        update_database(dbname, username, status, position_name, company_name)

    #new position or company or user
    else:
        update_database(dbname, username, status, position_name, company_name)



while True:
    maincode()