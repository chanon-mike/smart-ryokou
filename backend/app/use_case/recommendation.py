import openai

from app.core.config import settings
from app.schema.recommendation_query import StructuredQuery

# Get openai api key
opeanai_api_key = settings.OPENAI_API_KEY

openai.api_key = opeanai_api_key
openai.api_base = "https://api.openai.iniad.org/api/v1"


def generate_recommendation_structured_format_query(query: StructuredQuery) -> str:
    place = query.place
    duration = query.duration
    budget = query.budget
    trip_style = query.trip_style
    interests = query.interests
    foods = query.foods

    prompt = f"Recommend itinerary in {place} for {duration} days. "

    if budget:
        prompt += f"The budget for this trip is {budget.value}. "

    if trip_style:
        prompt += f"This trip pace is {trip_style.value}. "

    if interests:
        prompt += (
            f"In this trip, I want to have activities with {','.join(interests)}. "
        )

    if foods:
        prompt += f"In this trip, I want to eat {','.join(foods)}."

    print("Prompt: ", prompt)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    return response["choices"][0]["message"]["content"]


def generate_recommendation_free_format_query(query: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": query},
        ],
    )
    return response["choices"][0]["message"]["content"]
