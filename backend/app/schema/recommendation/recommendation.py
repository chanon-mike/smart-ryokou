from enum import Enum
from typing import Optional

from pydantic import BaseModel

from app.schema.recommendation.base import Location


class BudgetType(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

    @staticmethod
    def mapper() -> dict:
        return {
            BudgetType.LOW: "少なめ",
            BudgetType.MEDIUM: "普通",
            BudgetType.HIGH: "多め",
        }

    def to_japanese(self) -> str:
        return BudgetType.mapper()[self]


class TripPace(Enum):
    RELAXED = "relaxed"
    NORMAL = "normal"
    PACKED = "packed"

    @staticmethod
    def mapper() -> dict:
        return {
            TripPace.RELAXED: "ゆっくり",
            TripPace.NORMAL: "普通",
            TripPace.PACKED: "早い",
        }

    def to_japanese(self) -> str:
        return TripPace.mapper()[self]


class Interest(Enum):
    NATURE = "nature"
    CULTURE = "culture"
    ART = "art"
    HISTORY = "history"
    MUSEUM = "museum"
    ADVENTURE = "adventure"
    SIGHTSEEING = "sightseeing"

    @staticmethod
    def mapper() -> dict:
        return {
            Interest.NATURE: "自然",
            Interest.CULTURE: "文化",
            Interest.ART: "芸術",
            Interest.HISTORY: "歴史",
            Interest.MUSEUM: "博物館",
            Interest.SIGHTSEEING: "観光",
        }

    def to_japanese(self) -> str:
        return Interest.mapper()[self]


class TripType(Enum):
    SOLO = "solo"
    COUPLE = "couple"
    FAMILY = "family"
    FRIENDS = "friends"

    @staticmethod
    def mapper() -> dict:
        return {
            TripType.SOLO: "一人",
            TripType.COUPLE: "カップル",
            TripType.FAMILY: "家族",
            TripType.FRIENDS: "友達",
        }

    def to_japanese(self) -> str:
        return TripType.mapper()[self]


class RecommendationQuery(BaseModel):
    place: str
    date_from: str
    date_to: str
    trip_pace: Optional[TripPace] = None
    interests: Optional[list[Interest]] = None
    trip_type: Optional[TripType] = None
    optional_prompt: Optional[str] = None


class DateRecommendation(BaseModel):
    date: str
    locations: list[Location]


class RecommendationResponse(BaseModel):
    title: str
    recommendations: list[DateRecommendation]
