from functools import lru_cache

from pydantic import BaseModel, BaseSettings


class Settings(BaseSettings):
    """
    Settings for the application
    """

    AUTH0_DOMAIN: str
    AUTH0_AUDIENCE: str

    OPENAI_API_KEY: str

    AWS_KEY: str = None
    AWS_SECRET: str = None

    class Config:
        """
        Tell BaseSettings the env file path
        """

        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache()
def get_settings(**kwargs) -> Settings:
    """
    Get settings. ready for FastAPI's Depends.

    lru_cache - cache the Settings object per arguments given.
    """
    settings = Settings(**kwargs)
    return settings


settings: Settings = get_settings()


class LogConfig(BaseModel):
    """Logging configuration to be set for the server"""

    LOGGER_NAME: str = "root"
    LOG_FORMAT: str = (
        "%(levelprefix)s [%(asctime)s %(name)s (%(filename)s:%(lineno)s)] %(message)s"
    )
    LOG_LEVEL: str = "INFO"

    # Logging config
    version = 1
    disable_existing_loggers = False
    formatters = {
        "default": {
            "()": "uvicorn.logging.DefaultFormatter",
            "fmt": LOG_FORMAT,
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    }
    handlers = {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        },
    }
    loggers = {
        LOGGER_NAME: {"handlers": ["default"], "level": LOG_LEVEL},
    }
