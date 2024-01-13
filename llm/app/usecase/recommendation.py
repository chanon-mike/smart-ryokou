import logging
from datetime import datetime, timedelta

from app.repository.openai import OpenAIParser, OpenAIRepository
from app.repository.prompt import RecommendationNewLocationPrompt, RecommendationPrompt
from app.schema.recommendation.new_location import (
    RecommendationNewLocationQuery,
    RecommendationNewLocationResponse,
)
from app.schema.recommendation.recommendation import (
    RecommendationQuery,
    RecommendationResponse,
)

logger = logging.getLogger(__name__)


# TODO: Error make it run again
class BaseRecommendationUseCase:
    def __init__(self):
        self.client = OpenAIRepository()


class RecommendationUseCase(BaseRecommendationUseCase):
    def __init__(self):
        super().__init__()

    async def get_recommendations(
        self, query: RecommendationQuery
    ) -> RecommendationResponse:
        structured_recommendation_prompt = RecommendationPrompt(query)
        logger.debug(f"Query: {query}")

        openai_response = await self.client.get_completions(
            messages=[
                {
                    "role": "system",
                    "content": "Use Japanese name when possible",
                },
                {
                    "role": "user",
                    "content": structured_recommendation_prompt.prompt,
                },
            ],
            tools=structured_recommendation_prompt.functions,
        )
        response: RecommendationResponse = OpenAIParser.parse_completion(
            openai_response
        )
        response["title"] = f"{query.place}の旅行プラン"
        response["place"] = query.place
        response = self._assign_date_to_response(query, response)

        logger.debug(f"Response: {response}")
        return response

    def _assign_date_to_response(
        self,
        query: RecommendationQuery,
        response: RecommendationResponse,
    ) -> RecommendationResponse:
        """
        GPT returns a list of locations with 'date' properties as `day 1`, `day 2`.
        This function convert to date in format of `yyyy-mm-dd` to each activity based on user input.
        """
        new_response = response.copy()
        current_date = datetime.strptime(query.date_from, "%Y-%m-%d")
        recommendations = new_response["recommendations"]

        for recommendation in recommendations:
            current_date_str = current_date.strftime("%Y年%m月%d日")
            recommendation["date"] = current_date_str
            current_date = current_date + timedelta(days=1)

        return new_response


class RecommendationNewLocationUseCase(BaseRecommendationUseCase):
    def __init__(self):
        super().__init__()

    async def get_recommendations(
        self, query: RecommendationNewLocationQuery
    ) -> RecommendationNewLocationResponse:
        prompt_recommendation_prompt = RecommendationNewLocationPrompt(query)
        logger.debug(f"Query: {query}")

        openai_response = await self.client.get_completions(
            messages=[
                {
                    "role": "system",
                    "content": "Use Japanese name when possible",
                },
                {
                    "role": "user",
                    "content": prompt_recommendation_prompt.prompt,
                },
            ],
            tools=prompt_recommendation_prompt.functions,
        )

        response: RecommendationNewLocationResponse = OpenAIParser.parse_completion(
            openai_response
        )
        logger.debug(f"Response: {response}")
        return response
