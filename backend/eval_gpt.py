from openai import OpenAI
from dotenv import load_dotenv
import os

# gpt-4-1106-preview	$0.01 / 1K tokens	$0.03 / 1K tokens
# https://platform.openai.com/tokenizer
load_dotenv()
key = os.getenv("OPENAI_API_KEY")


def evaluate_email(email_txt):
    client = OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key=os.getenv("OPENAI_API_KEY")
    )

    intructions = ""
    options = "1. job application confirmation; 2. job application rejection; 3. interview invitation; 4. position offered; 5. position waitlisted;"

    prompt_instr = (
        "From the given email, tell me if which of the following options is the email about: \n"
        + options
        + "\n"
    )
    prompt_context = email_txt
    further_instr = "only give a number, also find position name and company name and return everything in python list format."

    # https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
    prompt = prompt_instr + "\n" + prompt_context + "\n" + further_instr

    response = client.chat.completions.create(
        #'gpt-4'
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are an expert recruiter for tech companies with 200 years of experience.",
            },
            {"role": "user", "content": prompt},
        ],
        n=1,  # how many instances of responses
        max_tokens=2048,  # length/cost of the summary, 4096 is max, 512  is about 400 words
    )

    return response.choices[0].message.content
