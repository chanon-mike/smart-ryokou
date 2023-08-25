import openai
from fastapi import HTTPException

from app.core.config import settings
from app.schema.recommendation_query import StructuredQuery

# Get openai api key
opeanai_api_key = settings.OPENAI_API_KEY

openai.api_key = opeanai_api_key
openai.api_base = "https://api.openai.iniad.org/api/v1"


def generate_recommendation_structured_format_query(query: StructuredQuery) -> str:
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

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt},
            ],
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        print("Error openai: ", e)
        raise HTTPException(status_code=500, detail="Currently, service is unavailable")


def generate_recommendation_free_format_query(query: str) -> str:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": query},
            ],
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        print("Error openai: ", e)
        raise HTTPException(status_code=500, detail="Currently, service is unavailable")
