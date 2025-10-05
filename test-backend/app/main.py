from fastapi import FastAPI
from app.api import ProjectRouter

app = FastAPI()

app.include_router(ProjectRouter.router, prefix="/project", tags=["Project"])