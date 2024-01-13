from fastapi import APIRouter

from app.api.endpoints.debug import router as debug_router
from app.api.endpoints.recommendation import router as recommendation_router

routers = APIRouter()
router_list = [recommendation_router, debug_router]

for router in router_list:
    routers.include_router(router)
