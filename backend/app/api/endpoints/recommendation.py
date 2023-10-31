from fastapi import APIRouter, HTTPException

import app.use_case.recommendation as recommendation
from app.schema.recommendation import (
    AdditionalRecommendationResponse,
    AdditionalRecommendationsQuery,
    FreeFormatQuery,
    RecommendationResponse,
    StructuredQuery,
)

router = APIRouter(
    prefix="/recommendation",
    tags=["generate_recommendation"],
)


@router.post("/structured-format")
async def generate_recommendation(
    request_body: StructuredQuery,
) -> RecommendationResponse:
    try:
        return recommendation.generate_recommendation_structured_format_query(
            request_body
        )
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(
            status_code=500,
            detail={
                "status": "failed",
                "message": "Service is currently unavailable",
                "error": str(e),
            },
        )


@router.post("/additional_recommendations")
async def generate_additional_recommendations(
    request_body: AdditionalRecommendationsQuery,
) -> AdditionalRecommendationResponse:
    try:
        return recommendation.generate_additional_recommendations(request_body)
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(
            status_code=500,
            detail={
                "status": "failed",
                "message": "Service is currently unavailable",
                "error": str(e),
            },
        )


@router.post("/free-format")
async def generate_recommendation_free_format_query(
    request_body: FreeFormatQuery,
) -> str:
    query = request_body.query
    try:
        return recommendation.generate_recommendation_free_format_query(query)
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(
            status_code=500,
            detail={
                "status": "failed",
                "message": "Service is currently unavailable",
                "error": str(e),
            },
        )
