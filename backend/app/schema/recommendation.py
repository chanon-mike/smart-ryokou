from enum import Enum
from typing import Optional

from pydantic import BaseModel


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

    @staticmethod
    def from_japanese(japanese: str) -> Optional["BudgetType"]:
        mapper = BudgetType.mapper()
        for pref, name in mapper.items():
            if name == japanese:
                return pref
        return None


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

    @staticmethod
    def from_japanese(japanese: str) -> Optional["TripPace"]:
        mapper = TripPace.mapper()
        for pref, name in mapper.items():
            if name == japanese:
                return pref
        return None


class Interest(Enum):
    FOOD = "food"
    NATURE = "nature"
    SHOPPING = "shopping"
    SPORTS = "sports"
    CULTURE = "culture"
    ART = "art"
    HISTORY = "history"
    MUSEUM = "museum"
    ADVENTURE = "adventure"
    SIGHTSEEING = "sightseeing"
    FESTIVAL = "festival"
    PARTY = "party"
    PHOTO = "photo"
    BEACH = "beach"
    MOUNTAIN = "mountain"
    TEMPLE = "temple"
    PARK = "park"
    ZOO = "zoo"
    AQUARIUM = "aquarium"
    AMUSEMENT = "amusement"

    @staticmethod
    def mapper() -> dict:
        return {
            Interest.FOOD: "グルメ",
            Interest.NATURE: "自然",
            Interest.SHOPPING: "買い物",
            Interest.SPORTS: "スポーツ",
            Interest.CULTURE: "文化",
            Interest.ART: "芸術",
            Interest.HISTORY: "歴史",
            Interest.MUSEUM: "博物館",
            Interest.ADVENTURE: "アドベンチャー",
            Interest.SIGHTSEEING: "観光",
            Interest.FESTIVAL: "お祭り",
            Interest.PARTY: "パーティー",
            Interest.PHOTO: "写真",
            Interest.BEACH: "海",
            Interest.MOUNTAIN: "山",
            Interest.TEMPLE: "お寺・神社",
            Interest.PARK: "公園",
            Interest.ZOO: "動物園",
            Interest.AQUARIUM: "水族館",
            Interest.AMUSEMENT: "遊園地",
        }

    def to_japanese(self) -> str:
        return Interest.mapper()[self]

    @staticmethod
    def from_japanese(japanese: str) -> Optional["Interest"]:
        mapper = Interest.mapper()
        for pref, name in mapper.items():
            if name == japanese:
                return pref
        return None


class TripType(Enum):
    SOLO = "solo"
    COUPLE = "couple"
    FAMILY = "family"
    FRIENDS = "friends"
    BUSINESS = "business"
    BACKPACKER = "backpacker"

    @staticmethod
    def mapper() -> dict:
        return {
            TripType.SOLO: "一人",
            TripType.COUPLE: "カップル",
            TripType.FAMILY: "家族",
            TripType.FRIENDS: "友達",
            TripType.BUSINESS: "ビジネス",
            TripType.BACKPACKER: "バックパッカー",
        }

    def to_japanese(self) -> str:
        return TripType.mapper()[self]

    @staticmethod
    def from_japanese(japanese: str) -> Optional["TripType"]:
        mapper = TripType.mapper()
        for pref, name in mapper.items():
            if name == japanese:
                return pref
        return None


class StructuredRecommendationQuery(BaseModel):
    """Place and duration and people_num are required. Other properties are optional"""

    place: str
    date_from: str
    date_to: str
    people_num: int = 1
    budget: Optional[BudgetType] = None
    trip_pace: Optional[TripPace] = None
    interests: Optional[list[Interest]] = None
    trip_type: Optional[TripType] = None


class PromptRecommendationsQuery(BaseModel):
    trip_title: str
    user_prompt: str
    suggested_places: list[str]


class Activity(BaseModel):
    place: str
    description: str


class DayRecommendation(BaseModel):
    date: str
    activities: list[Activity]


class StructuredRecommendationResponse(BaseModel):
    title: str
    recommendation: list[DayRecommendation]


class PromptRecommendationResponse(BaseModel):
    recommendations: list[Activity]
