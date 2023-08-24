from fastapi import APIRouter

import app.use_case.openai_endpoint as openai_endpoint
from app.schema.recommendation_query import FreeFormatQuery, StructuredQuery

router = APIRouter(
    prefix="/generate_recommendation",
    tags=["generate_recommendation"],
)


@router.post("/structured_format")
async def generate_recommendation(request_body: StructuredQuery):
    return openai_endpoint.generate_recommendation_structured_format_query(request_body)


@router.post("/free_format")
async def generate_recommendation_free_format_query(request_body: FreeFormatQuery):
    query = request_body.query
    return openai_endpoint.generate_recommendation_free_format_query(query)
