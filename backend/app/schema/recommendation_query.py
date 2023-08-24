from enum import Enum

from pydantic import BaseModel


class BudgetType(Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


class TripStyle(Enum):
    RELAXED = "relaxed"
    PACKED = "packed"


class FreeFormatQuery(BaseModel):
    query: str


class StructuredQuery(BaseModel):
    place: str
    how_long: int = 1
    budget: BudgetType
    trip_style: TripStyle
    interest: list[str]
    food: list[str]
