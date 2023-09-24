import json

import openai

from app.core.config import settings
from app.schema.recommendation import (
    BUDGET_TYPE_JA,
    INTEREST_JA,
    TRIP_PACE_JA,
    TRIP_TYPE_JA,
    RecommendationResponse,
    StructuredQuery,
)

# Get openai api key
opeanai_api_key = settings.OPENAI_API_KEY

openai.api_key = opeanai_api_key
openai.api_base = "https://api.openai.iniad.org/api/v1"


def extract_json(openai_response: str) -> RecommendationResponse:
    """
    Extract json from openai response
    """
    json_start_pos = openai_response.find("{")
    json_end_pos = openai_response.rfind("}")
    data = openai_response[json_start_pos : json_end_pos + 1]
    return json.loads(data)


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
#目的
あなたには私の旅行プランナーとして、下記の要望と制約条件に従って入力された観光地における観光プランを作成してください。
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

    prompt += """
#出力形式
出力は概要などがなくデータだけ返してください。場所の説明は適度な長さでお願いします。
```json
{
  "recommendation": [
    {
        "date": "9月1日",
        "activities": [
            {
            "place": "xxxx",
            "description": "xxxx"
            },
            {
            ...
            }
        ],
    },
    {
        ...
    }
  ]
}
```
"""

    print("Prompt: ", prompt)

    try:
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは私の旅行プランナー"},
                {"role": "user", "content": prompt},
            ],
        )
        response_content = openai_response["choices"][0]["message"]["content"]
        return extract_json(response_content)

    except Exception as e:
        print("OpenAI error: ", e)
        raise Exception("OpenAI error")


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
        print("OpenAI error: ", e)
        raise Exception("OpenAI error")
