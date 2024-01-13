import logging
from typing import List

import json5
from openai import AsyncOpenAI
from openai.resources.chat.completions import ChatCompletion, ChatCompletionMessageParam
from openai.types.chat.completion_create_params import Function

from app.core.config import settings

logger = logging.getLogger(__name__)


class OpenAIRepository:
    def __init__(self):
        openai_api_key = settings.OPENAI_API_KEY
        base_url = "https://api.openai.iniad.org/api/v1"

        self.client = AsyncOpenAI(
            api_key=openai_api_key,
            base_url=base_url,
        )

    async def get_completions(
        self,
        model: str = "gpt-3.5-turbo",
        messages: List[ChatCompletionMessageParam] = None,
        tools: List[Function] = None,
        temperature: float = 0.5,
    ) -> ChatCompletion:
        response = await self.client.chat.completions.create(
            model=model,
            messages=messages,
            tools=tools,
            temperature=temperature,
        )
        return response


class OpenAIParser:
    @staticmethod
    def _extract_json(response: str):
        """Extract json from openai response."""
        # Sometimes json generated by openai have trailing comma -> invalid to parse to JSON -> need to use json5 which has more relaxed syntax than json
        # Ref: https://stackoverflow.com/questions/23705304/can-json-loads-ignore-trailing-commas
        try:
            return json5.loads(response)
        except Exception as e:
            logger.error(f"Error decoding JSON: {e}")
            raise ValueError("Invalid JSON format") from e

    @staticmethod
    def parse_completion(response: ChatCompletion):
        tool_calls = json5.loads(response.json())["choices"][0]["message"]["tool_calls"]
        if len(tool_calls) > 0:
            response_json = OpenAIParser._extract_json(
                tool_calls[0]["function"]["arguments"]
            )
            logger.debug(f"Response: {response_json}")
            return response_json
        else:
            logger.error(f"Error: {response}")
            raise ValueError("Invalid response from OpenAI")
