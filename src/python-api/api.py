from fastapi import FastAPI

import httpx
import asyncio
import pydantic
import ms_active_directory


app = FastAPI()


@app.get('/')
def personer():
    return {"people": [
        "simen",
        "simen 2",
        "tomas",
        "ole",
        "jonathan",
        "jon",
        "august",
        "felix"
    ]}