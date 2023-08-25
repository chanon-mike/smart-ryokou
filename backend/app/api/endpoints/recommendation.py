from fastapi import APIRouter, HTTPException

import app.use_case.recommendation as recommendation
from app.schema.recommendation_query import FreeFormatQuery, StructuredQuery

router = APIRouter(
    prefix="/recommendation",
    tags=["generate_recommendation"],
)


@router.post("/structured_format")
async def generate_recommendation(request_body: StructuredQuery) -> str:
    try:
        return recommendation.generate_recommendation_structured_format_query(
            request_body
        )
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=500, detail="Service is currently unavailable")


@router.post("/free_format")
async def generate_recommendation_free_format_query(
    request_body: FreeFormatQuery,
) -> str:
    query = request_body.query
    try:
        return recommendation.generate_recommendation_free_format_query(query)
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=500, detail="Service is currently unavailable")
