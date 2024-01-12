from datetime import datetime
from typing import List, Optional
from app.schema.recommendation import (
    Interest,
    PromptRecommendationQuery,
    StructuredRecommendationQuery,
)
from openai.types.chat.completion_create_params import Function


class BasePrompt:
    def __init__(self, prompt: str, functions: List[Function]) -> None:
        self.prompt = prompt
        self.functions = functions


class StructuredRecommendationPrompt(BasePrompt):
    def __init__(self, query: StructuredRecommendationQuery):
        prompt = self._build_prompt(query)
        functions: List[Function] = [
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
            },
        ]
        super().__init__(prompt, functions)

    def _build_prompt(self, query: StructuredRecommendationQuery) -> str:
        DATE_FORMAT = "%Y-%m-%d"
        date_from = datetime.strptime(query.date_from, DATE_FORMAT)
        date_to = datetime.strptime(query.date_to, DATE_FORMAT)
        trip_days_num = (date_to - date_from).days

        prompts = self._create_prompts(query)
        intermediate_data_vars = [f"data{i}" for i in range(1, len(prompts) + 1)]
        prompt = f"You are a travel planner. You suggest plan in Japanese. {'. '.join(prompts)}. From above variables {', '.join(intermediate_data_vars)}, generate a plan for a {trip_days_num + 1} days trip in Japanese."

        return prompt

    def _create_prompts(self, query: StructuredRecommendationQuery) -> List[str]:
        prompts = []
        data_num = 1
        interests = query.interests or [None]
        for interest in interests:
            prompts.append(self._create_interest_prompt(query, interest, data_num))
            data_num += 1

        if query.optional_prompt:
            prompts.append(
                f"Recommend places to visit in {query.place} which are suitable for '{query.optional_prompt}' and save results as variable data{data_num}"
            )

        return prompts

    def _create_interest_prompt(
        self,
        query: StructuredRecommendationQuery,
        interest: Optional[Interest],
        data_num: int,
    ) -> str:
        if interest:
            return f"Recommend places to visit in {query.place} which are suitable for {interest.value} and save results as variable data{data_num}"
        else:
            return f"Recommend places to visit in {query.place} and save results as variable data{data_num}"


class PromptRecommendationPrompt(BasePrompt):
    def __init__(self, query: PromptRecommendationQuery):
        prompt = self._build_prompt(query)
        functions: List[Function] = [
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
        super().__init__(prompt, functions)

    def _build_prompt(self, query: PromptRecommendationQuery) -> str:
        prompt = (
            f"#Instruction\nYou are a travel planner. You suggest plan in Japanese.\n\n"
            f"#Instruction\nSave the name of place {query.trip_title.split('の')[0]} as variable data1.\n\n"
            f"#Instruction\nTranslate this command to English '{query.user_prompt}' and save as variable data2.\n\n"
            f"#Instruction\nSuggest places in variable data1 which match the requirement in variable data2.\n\n"
            f"#Instruction\nResponse is in Japanese"
        )
        return prompt
