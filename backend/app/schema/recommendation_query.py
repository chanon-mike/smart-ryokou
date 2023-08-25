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
    '''
    Only place and how_long are required. Other properties are optional
    '''
    place: str
    how_long: int = 1
    budget: BudgetType | None
    trip_style: TripStyle | None
    interest: list[str] | None
    food: list[str] | None
