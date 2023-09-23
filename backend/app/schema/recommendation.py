from enum import Enum

from pydantic import BaseModel


class BudgetType(Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


BUDGET_TYPE_JA = {
    BudgetType.SMALL: "少なめ",
    BudgetType.MEDIUM: "普通",
    BudgetType.LARGE: "多め",
}


class TripStyle(Enum):
    RELAXED = "relaxed"
    PACKED = "packed"


TRIP_STYLE_JA = {
    TripStyle.RELAXED: "ゆっくり",
    TripStyle.PACKED: "忙しい",
}


class FreeFormatQuery(BaseModel):
    query: str


class StructuredQuery(BaseModel):
    """
    Place and duration and people_num are required. Other properties are optional
    """

    place: str
    duration: int = 1
    people_num: int = 1
    budget: BudgetType | None
    trip_style: TripStyle | None
    interests: list[str] | None
    trip_type: str | None
    remarks: list[str] | None
