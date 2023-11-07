import logging

from fastapi import APIRouter, HTTPException

from app.schema.recommendation import (
    PromptRecommendationQuery,
    PromptRecommendationResponse,
    StructuredRecommendationQuery,
    StructuredRecommendationResponse,
)
from app.use_case.recommendation import (
    PromptRecommendationUseCase,
    StructuredRecommendationUseCase,
)

router = APIRouter(
    prefix="/recommendation",
    tags=["generate_recommendation"],
)

logger = logging.getLogger(__name__)


@router.post("/structured-format")
async def generate_recommendation(
    request_body: StructuredRecommendationQuery,
) -> StructuredRecommendationResponse:
    recommendation_usecase = StructuredRecommendationUseCase()
    try:
        return recommendation_usecase.get_recommendations(request_body)
    except Exception as e:
        logger.error(f"Error: {e}")
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
    request_body: PromptRecommendationQuery,
) -> PromptRecommendationResponse:
    recommendation_usecase = PromptRecommendationUseCase()
    try:
        return recommendation_usecase.get_recommendations(request_body)
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "failed",
                "message": "Service is currently unavailable",
                "error": str(e),
            },
        )
