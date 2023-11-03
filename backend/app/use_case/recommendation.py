import logging
from typing import Union

import json5
import openai

from app.core.config import settings
from app.schema.recommendation import (
    BUDGET_TYPE_JA,
    INTEREST_JA,
    TRIP_PACE_JA,
    TRIP_TYPE_JA,
    PromptRecommendationResponse,
    PromptRecommendationsQuery,
    RecommendationResponse,
    StructuredQuery,
)

# Get logger
logger = logging.getLogger(__name__)

# Get openai api key
opeanai_api_key = settings.OPENAI_API_KEY

openai.api_key = opeanai_api_key
openai.api_base = "https://api.openai.iniad.org/api/v1"

additional_recommendation_functions = [
    {
        "name": "send_recommendations",
        "description": "Send additional recommendations to user.",
        "parameters": {
            "type": "object",
            "properties": {
                "recommendations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "place": {
                                "type": "string",
                                "description": "Name of a recommended place.",
                            },
                            "description": {
                                "type": "string",
                                "description": "Description of a recommended place.",
                            },
                        },
                    },
                }
            },
        },
    }
]

openai_functions = [
    {
        "name": "send_itinerary",
        "description": "Send itinerary to user.",
        "parameters": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "description": "Title for recommended itinerary.",
                },
                "recommendation": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "date": {
                                "type": "string",
                                "description": "Date in recommended itinerary, e.g 9月1日.",
                            },
                            "activities": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "place": {
                                            "type": "string",
                                            "description": "Name of a recommended place.",
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Description of a recommended place.",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }
]


def extract_json(
    openai_response: str,
) -> Union[RecommendationResponse, PromptRecommendationResponse]:
    """
    Extract json from openai response
    """
    # Sometimes json generated by openai have trailing comma -> invalid to parse to JSON -> need to use json5 which has more relaxed syntax than json
    # Ref: https://stackoverflow.com/questions/23705304/can-json-loads-ignore-trailing-commas
    return json5.loads(openai_response)


def generate_recommendation_structured_format_query(
    query: StructuredQuery,
) -> RecommendationResponse:
    place = query.place
    date_from = query.date_from
    date_to = query.date_to
    people_num = query.people_num
    budget = query.budget
    trip_pace = query.trip_pace
    interests = query.interests
    trip_type = query.trip_type

    prompt = f"""
下記の要望と制約条件に従って入力された観光地における観光プランを作成してください。
#場所
{place}
#期間
{date_from}から{date_to}まで
#人数
{people_num}人
"""

    if budget:
        prompt += f"#予算\n {BUDGET_TYPE_JA[budget]} \n"

    if trip_pace:
        prompt += f"#旅行ペース\n {TRIP_PACE_JA[trip_pace]} \n"

    if interests:
        prompt += (
            f"#興味\n {', '.join([INTEREST_JA[interest] for interest in interests])}\n"
        )

    if trip_type:
        prompt += f"#旅行の種類\n{TRIP_TYPE_JA[trip_type]}\n"

    logger.info("====User query====")
    logger.info(f"place: {place}")
    logger.info(f"date_from: {date_from}")
    logger.info(f"date_to: {date_to}")
    logger.info(f"people_num: {people_num}")
    logger.info(f"budget: {budget}")
    logger.info(f"trip_pace: {trip_pace}")
    logger.info(f"interests: {interests}")
    logger.info(f"trip_type: {trip_type}")

    try:
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=[
                {
                    "role": "system",
                    "content": "You are a travel planner. You suggest plan in Japanese.",
                },
                {
                    "role": "system",
                    "content": f"Ask for clarification if there is no existed location named '{place}'. In that case, do not use functions",
                },
                {"role": "user", "content": prompt},
                {"role": "user", "content": "Send generated trip to user"},
            ],
            functions=openai_functions,
        )

    except Exception as e:
        logger.error(f"OpenAI error: {e}")
        raise Exception("OpenAI service error")

    openai_functions_called = openai_response["choices"][0]["message"].get(
        "function_call"
    )

    logger.debug(f"openai_response {openai_response}")  # DEBUG

    if openai_functions_called:
        response_json = openai_response["choices"][0]["message"]["function_call"][
            "arguments"
        ]
        response = extract_json(response_json)

        # Below is hotfix for this ticket: https://github.com/chanon-mike/smart-ryokou/issues/85
        response["title"] = f"{place}の旅行プラン"
        logger.info(f"openai json response: {response}")
        return response
    else:
        # when user enter invalid place
        raise Exception("User input error")


def generate_prompt_recommendation(
    query: PromptRecommendationsQuery,
) -> PromptRecommendationResponse:
    trip_title = query.trip_title
    user_prompt = query.user_prompt
    suggested_places = query.suggested_places
    prompt = f"""
Suggest places in above area which match the following requirement: '{user_prompt}'. Suggested places must not include {",".join(suggested_places)}.
"""
    try:
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=[
                {
                    "role": "system",
                    "content": "You are a travel planner. You suggest plan in Japanese.",
                },
                {
                    "role": "user",
                    "content": f"Return the name of place in this trip title: {trip_title}",
                },
                {"role": "user", "content": prompt},
                {"role": "user", "content": "Send recommended places to user"},
            ],
            functions=additional_recommendation_functions,
        )

    except Exception as e:
        logger.error(f"OpenAI error: {e}")
        raise Exception("OpenAI service error")

    openai_functions_called = openai_response["choices"][0]["message"].get(
        "function_call"
    )

    if openai_functions_called:
        response_json = openai_response["choices"][0]["message"]["function_call"][
            "arguments"
        ]
        response = extract_json(response_json)
        logger.info(f"openai json response: {response}")
        return response
    else:
        # when user enter invalid place
        raise Exception("User input error")


def generate_recommendation_free_format_query(query: str) -> str:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは私の旅行プランナー"},
                {"role": "user", "content": query},
            ],
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        logger.error(f"OpenAI error: {e}")
        raise Exception("OpenAI error")
