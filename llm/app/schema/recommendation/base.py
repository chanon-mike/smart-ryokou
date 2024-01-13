from pydantic import BaseModel


class Location(BaseModel):
    place: str
    description: str
