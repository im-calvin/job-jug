from openai import OpenAI
from dotenv import load_dotenv
import os

#gpt-4-1106-preview	$0.01 / 1K tokens	$0.03 / 1K tokens
#https://platform.openai.com/tokenizer
load_dotenv()
key = os.getenv("OPENAI_API_KEY")

def evaluate_email(email_txt):

    client = OpenAI(
        # defaults to os.environ.get("OPENAI_API_KEY")
        api_key=os.getenv("OPENAI_API_KEY")
    )

    intructions = ""
    options = "1. job application confirmation; 2. job application rejection; 3. interview invitation; 4. position offered; 5. position waitlisted;"

    prompt_instr = "From the given email, tell me if which of the following options is the email about: \n"+options+"\n"
    prompt_context = email_txt

    #https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
    prompt = prompt_instr+"\n"+prompt_context


    response = client.chat.completions.create(
        #'gpt-4'
        model='gpt-4-1106-preview',
        messages = [{"role": "system", "content": "You are an expert recruiter for tech companies with 200 years of experience."},
        {"role": "user", "content": prompt}],
        n=1, #how many instances of responses
        max_tokens=2048  # length/cost of the summary, 4096 is max, 512  is about 400 words
    )

    #print(response.choices[0].message.content)
    
    return response.choices[0].message.content


email_txt = """

Dear Kelvin,

Thank you for your interest in SAP and for your time invested in applying for SAP iXp Intern - Agile Developer, HANA and Analytics (385664). We are writing to inform you that you have not been selected for this position.

Jobs at SAP are very competitive and SAP frequently has the privilege of selecting among many highly qualified candidates. Given your background and skills, we encourage you to consider other opportunities at SAP. While this particular role is not offered today,  we are looking forward in contacting you for Fall 2024 Hiring if you are available and still interested.

While this role was not a fit, at SAP we believe that every experience is a learning opportunity. Here are some tips that we hope will be helpful in your job search.

We like to invite you to explore openSAP – SAP’s free online learning platform, offering courses on SAP’s latest innovation and how to navigate the digital economy. If you haven’t already, you can also join SAP’s talent community to stay informed about new job postings and upcoming hiring events.

Regards,

Renejane Niña Villanueva
Early Career Talent Recruiter – North America
"""

print(evaluate_email(email_txt))
