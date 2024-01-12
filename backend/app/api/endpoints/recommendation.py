import logging

from fastapi import APIRouter, HTTPException

from app.schema.recommendation import (
    PromptRecommendationQuery,
    PromptRecommendationResponse,
    StructuredRecommendationQuery,
    StructuredRecommendationResponse,
)
from app.usecase.recommendation import (
    PromptRecommendationUseCase,
    StructuredRecommendationUseCase,
)

router = APIRouter(
    prefix="/recommendation",
    tags=["generate_recommendation"],
)

logger = logging.getLogger(__name__)


@router.post("/structured-format")
async def generate_recommendations(
    request_body: StructuredRecommendationQuery,
) -> StructuredRecommendationResponse:
    recommendation_usecase = StructuredRecommendationUseCase()
    try:
        return await recommendation_usecase.get_recommendations(request_body)
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(
            status_code=403,
            detail={
                "status": "failed",
                "message": str(e),
            },
        )


@router.post("/prompt")
async def generate_prompt_recommendations(
    request_body: PromptRecommendationQuery,
) -> PromptRecommendationResponse:
    recommendation_usecase = PromptRecommendationUseCase()
    try:
        return await recommendation_usecase.get_recommendations(request_body)
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(
            status_code=403,
            detail={
                "status": "failed",
                "message": str(e),
            },
        )
