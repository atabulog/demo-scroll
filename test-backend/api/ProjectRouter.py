from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from services.ProjectService import ProjectService, get_project_service

router: APIRouter = APIRouter()

@router.get("/api/project/{key}")
async def get_data(key: str, project_service: ProjectService = Depends(get_project_service))->JSONResponse:
    """Generic get controller to get any specific field directly out of the project file

    Args:
        key (str): data to target
        project_service (ProjectService, optional): DI'd service. Defaults to Depends(get_project_service).

    Returns:
        JSONResponse: Json packet in the format of {"key": value}
    """
    value = project_service.get(key)
    if value is None:
        return JSONResponse({"error": "Key not found"}, status_code=404)
    return JSONResponse({key: value})

@router.post("/api/project/{key}")
async def set_data(key: str, payload: dict, project_service: ProjectService = Depends(get_project_service)):
    value = payload.get("value")
    if value is None:
        return JSONResponse({"error": "Missing value"}, status_code=400)
    project_service.set(key, value)
    return JSONResponse({"success": True, "key": key, "value": value})