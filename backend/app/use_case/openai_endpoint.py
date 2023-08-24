import os

import openai
from dotenv import load_dotenv

from app.schema.recommendation_query import StructuredQuery

# Load env variables from .env file
load_dotenv()

# Get env variables
opeanai_api_key = os.environ.get("OPENAI_API_KEY")

openai.api_key = opeanai_api_key
openai.api_base = "https://api.openai.iniad.org/api/v1"


def generate_recommendation_structured_format_query(query: StructuredQuery):
    place = query.place
    how_long = query.how_long
    budget = query.budget
    trip_style = query.trip_style
    interest = query.interest
    food = query.food

    prompt = f"Recommend itinerary in {place} for {how_long} days. "

    if budget:
        prompt += f"The budget for this trip is {budget.value}. "

    if trip_style:
        prompt += f"This trip pace is {trip_style.value}. "

    if interest:
        prompt += f"In this trip, I want to have activities with {','.join(interest)}. "

    if food:
        prompt += f"In this trip, I want to eat {','.join(food)}."

    print("Prompt: ", prompt)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    return response["choices"][0]["message"]["content"]


def generate_recommendation_free_format_query(query: str):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": query},
        ],
    )
    return response["choices"][0]["message"]["content"]
