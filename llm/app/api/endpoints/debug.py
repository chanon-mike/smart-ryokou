from fastapi import APIRouter, Depends, Response, status

from app.core.security import VerifyToken, token_auth_scheme, verify_token
from app.schema.payload import Payload

router = APIRouter(
    prefix="/debug",
    tags=["debug"],
)


@router.get("/public")
def public():
    """No access token required to access this route"""

    result = {
        "status": "success",
        "msg": "Hello from a public endpoint! You don't need to be authenticated to see this.",
    }
    return result


@router.get("/private")
def private(response: Response, token: str = Depends(token_auth_scheme)):
    """A valid access token is required to access this route"""

    result = VerifyToken(token.credentials).verify()

    if result.get("status"):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return result

    return result


@router.get("/private-token")
def private_token(token: Payload = Depends(verify_token)):
    """
    A valid access token is required to access this route
    This `verify_token` function has the same function as route `/api/debug/private`
    """

    return token
