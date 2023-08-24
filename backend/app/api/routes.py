from fastapi import APIRouter

from app.api.endpoints.debug import router as debug_router
from app.api.endpoints.generate_recommendation import (
    router as generate_recommendation_router,
)

routers = APIRouter()
router_list = [generate_recommendation_router, debug_router]

for router in router_list:
    routers.include_router(router)
