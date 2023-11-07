from fastapi import APIRouter, HTTPException

import app.use_case.recommendation as recommendation
from app.schema.recommendation import (
    PromptRecommendationResponse,
    PromptRecommendationsQuery,
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


@router.post("/prompt")
async def generate_prompt_recommendation(
    request_body: PromptRecommendationsQuery,
) -> PromptRecommendationResponse:
    try:
        return recommendation.generate_prompt_recommendation(request_body)
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
