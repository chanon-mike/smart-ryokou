import json
import logging
from datetime import datetime, timedelta
from typing import List

import json5
from openai import AsyncOpenAI
from openai.resources.chat.completions import ChatCompletion, ChatCompletionMessageParam
from openai.types.chat.completion_create_params import Function

from app.core.config import settings
from app.schema.recommendation import (
    PromptRecommendationQuery,
    PromptRecommendationResponse,
    StructuredRecommendationQuery,
    StructuredRecommendationResponse,
)

logger = logging.getLogger(__name__)


class RecommendationUseCase:
    def __init__(self):
        openai_api_key = settings.OPENAI_API_KEY
        base_url = "https://api.openai.iniad.org/api/v1"

        self.client = AsyncOpenAI(
            api_key=openai_api_key,
            base_url=base_url,
        )

    def _extract_json(self, response: str):
        """Extract json from openai response."""
        # Sometimes json generated by openai have trailing comma -> invalid to parse to JSON -> need to use json5 which has more relaxed syntax than json
        # Ref: https://stackoverflow.com/questions/23705304/can-json-loads-ignore-trailing-commas
        try:
            return json5.loads(response)
        except Exception as e:
            logger.error(f"Error decoding JSON: {e}")
            raise ValueError("Invalid JSON format") from e

    async def chat_completion_request(
        self,
        model: str = "gpt-3.5-turbo",
        messages: List[ChatCompletionMessageParam] = None,
        tools: List[Function] = None,
        temperature: float = 0.5,
    ) -> ChatCompletion:
        """Send request to OpenAI chat completion API."""
        try:
            response = await self.client.chat.completions.create(
                model=model,
                messages=messages,
                tools=tools,
                temperature=temperature,
            )
            return response
        except Exception as e:
            logger.error(f"ChatCompletion Error: {e}")
            raise Exception(f"ChatCompletion Error: {e}")

    def parse_response(self, response: ChatCompletion):
        """Parse response from OpenAI chat completion API."""
        tool_calls = json.loads(response.json())["choices"][0]["message"]["tool_calls"]
        if len(tool_calls) > 0:
            response_json = self._extract_json(tool_calls[0]["function"]["arguments"])
            logger.info(f"Response: {response_json}")
            return response_json
        else:
            logger.error(f"Error: {response}")
            raise ValueError("Invalid response from OpenAI")


class StructuredRecommendationUseCase(RecommendationUseCase):
    def __init__(self):
        super().__init__()
        self.functions: List[Function] = [
            {
                "type": "function",
                "function": {
                    "name": "generate_itinerary",
                    "description": "旅行プランを提案する",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "recommendation": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "date": {
                                            "type": "string",
                                            "pattern": "[1-9]*日",
                                            "description": "例えば：1日、２日",
                                        },
                                        "activities": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "place": {
                                                        "type": "string",
                                                        "description": "日本語で場所の名前",
                                                    },
                                                    "description": {
                                                        "type": "string",
                                                        "description": "場所の説明",
                                                    },
                                                },
                                                "required": ["place", "description"],
                                            },
                                        },
                                    },
                                    "required": ["date", "activities"],
                                },
                            },
                        },
                        "required": ["recommendation"],
                    },
                },
            }
        ]

    def _assign_date_to_response(
        self,
        query: StructuredRecommendationQuery,
        response_json: StructuredRecommendationResponse,
    ) -> StructuredRecommendationResponse:
        """
        GPT returns a list of activities with 'date' properties as `day 1`, `day 2`.
        This function convert to date in format of `yyyy-mm-dd` to each activity based on user input.
        """
        response_json_copy = response_json.copy()
        current_date = datetime.strptime(query.date_from, "%Y-%m-%d")
        recommendation_lst = response_json_copy["recommendation"]
        for recommendation in recommendation_lst:
            current_date_str = current_date.strftime("%Y年%m月%d日")
            recommendation["date"] = current_date_str
            current_date = current_date + timedelta(days=1)
        return response_json_copy

    def _build_prompt(self, query: StructuredRecommendationQuery) -> str:
        prompt = ""
        prompts = []

        date_from = query.date_from
        date_to = query.date_to

        date_format = "%Y-%m-%d"
        date_from = datetime.strptime(date_from, date_format)
        date_to = datetime.strptime(date_to, date_format)

        date_difference = date_to - date_from
        trip_days_num = date_difference.days

        if query.interests:
            num = 1
            for interest in query.interests:
                prompts.append(
                    f"Recommend places to visit in {query.place} which are suitable for {interest.value} and save results as variable data{num}"
                )
                num += 1
        else:
            prompts.append(
                f"Recommend places to visit in {query.place} and save results as variable data1"
            )

        prompt_num = len(prompts)
        intermediate_data_vars = [f"data{i}" for i in range(1, prompt_num + 1)]
        prompt = f"You are a travel planner. You suggest plan in Japanese. {'. '.join(prompts)}. From above variables {', '.join(intermediate_data_vars)}, generate a plan for a {trip_days_num + 1} days trip in Japanese."

        return prompt

    async def get_recommendations(
        self, query: StructuredRecommendationQuery
    ) -> StructuredRecommendationResponse:
        logger.info(f"Query: {query}")
        prompts = self._build_prompt(query)

        messages = []
        messages.append(
            {
                "role": "system",
                "content": "Use Japanese name when possible",
            }
        )
        messages.append({"role": "user", "content": prompts})

        logger.info(f"Messages: {messages}")

        response = await self.chat_completion_request(
            messages=messages,
            tools=self.functions,
        )
        response_json: StructuredRecommendationResponse = self.parse_response(response)
        response_json["title"] = f"{query.place}の旅行プラン"
        response_json = self._assign_date_to_response(query, response_json)
        return response_json


class PromptRecommendationUseCase(RecommendationUseCase):
    def __init__(self):
        super().__init__()
        self.functions: List[Function] = [
            {
                "type": "function",
                "function": {
                    "name": "recommend_places",
                    "description": "旅行プランを提案する",
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
                                            "description": "日本語で場所の名前",
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "場所の説明",
                                        },
                                    },
                                    "required": ["place", "description"],
                                },
                            }
                        },
                        "required": ["recommendations"],
                    },
                },
            }
        ]

    def _build_prompt(self, query: PromptRecommendationQuery) -> str:
        prompt = f"""
#Instruction
You are a travel planner. You suggest plan in Japanese.

#Instruction
Save the name of place {query.trip_title.split("の")[0]} as variable data1.

#Instruction
Translate this command to English '{query.user_prompt}' and save as variable data2.

#Instruction
Suggest places in variable data1 which match the requirement in variable data2.

#Instruction
Response is in Japanese
"""
        return prompt

    async def get_recommendations(
        self, query: PromptRecommendationQuery
    ) -> PromptRecommendationResponse:
        prompt = self._build_prompt(query)
        logger.info(f"Prompt: {prompt}")
        response = await self.chat_completion_request(
            messages=[
                {
                    "role": "system",
                    "content": "Use Japanese name when possible",
                },
                {"role": "user", "content": prompt},
            ],
            tools=self.functions,
        )
        response_json: PromptRecommendationResponse = self.parse_response(response)

        return response_json
