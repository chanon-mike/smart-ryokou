from pydantic import BaseModel

from app.schema.recommendation.base import Location


class RecommendationNewLocationQuery(BaseModel):
    trip_title: str
    user_prompt: str
    suggested_places: list[str]


class RecommendationNewLocationResponse(BaseModel):
    place: str
    recommendations: list[Location]
