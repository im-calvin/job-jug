from openai import OpenAI
from dotenv import load_dotenv
import os
import ast


# gpt-4-1106-preview	$0.01 / 1K tokens	$0.03 / 1K tokens
# https://platform.openai.com/tokenizer
load_dotenv()
key = os.getenv("OPENAI_API_KEY")


def evaluate_email(email_txt, prev_jobs):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    options = "1. job application confirmation; 2. job application rejection; 3. interview invitation; 4. position offered; 5. position waitlisted;"
    prev_jobs_list = [
        f"{info_json['company']}, {info_json['position']}" for info_json in prev_jobs
    ]
    prev_jobs_str = "\n".join(prev_jobs_list)

    prompt = f"""
        From the given email, tell me which option it is about:
        {options}
        
        {email_txt}
        
        If the email is about an interview, offer, or rejection, check the pairs of company/position names below and if you think they are similar, then copy them exactly in the response. Otherwise create a new pair.
        {prev_jobs_str}
        Return the result as a Python list.

        For example, if the email is about an interview invitation for a position at Google, the response should be [3, 'Google', 'position name'].
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are an expert recruiter for tech companies with 200 years of experience. Respond only in Python Lists without any quotes or Markdown.",
            },
            {"role": "user", "content": prompt},
        ],
        n=1,
        max_tokens=512,
        temperature=0.0,
    )

    str_res = response.choices[0].message.content
    lst_res = ast.literal_eval(str_res)
    if len(lst_res) != 3:
        raise ValueError("The response does not have 3 elements", lst_res)
    return lst_res
