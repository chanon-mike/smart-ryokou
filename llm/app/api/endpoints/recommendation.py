import logging

from fastapi import APIRouter, HTTPException

from app.schema.recommendation.new_location import (
    RecommendationNewLocationQuery,
    RecommendationNewLocationResponse,
)
from app.schema.recommendation.recommendation import (
    RecommendationQuery,
    RecommendationResponse,
)
from app.usecase.recommendation import (
    RecommendationNewLocationUseCase,
    RecommendationUseCase,
)

router = APIRouter(
    prefix="/recommendation",
    tags=["generate_recommendation"],
)

logger = logging.getLogger(__name__)


@router.post("/")
async def generate_recommendations(
    request_body: RecommendationQuery,
) -> RecommendationResponse:
    recommendation_usecase = RecommendationUseCase()
    logger.info(f"Recommendation Query: {request_body}")
    try:
        response = await recommendation_usecase.get_recommendations(request_body)
        logger.info(f"Response: {response}")
        return response
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=403,
            detail={
                "status": "failed",
                "message": str(e),
            },
        )


@router.post("/new")
async def generate_recommendations_new_locations(
    request_body: RecommendationNewLocationQuery,
) -> RecommendationNewLocationResponse:
    recommendation_usecase = RecommendationNewLocationUseCase()
    logger.info(f"New Location Query: {request_body}")
    try:
        response = await recommendation_usecase.get_recommendations(request_body)
        logger.info(f"Response: {response}")
        return response
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=403,
            detail={
                "status": "failed",
                "message": str(e),
            },
        )
