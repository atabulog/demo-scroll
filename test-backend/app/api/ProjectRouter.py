from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.services.ProjectService import ProjectService, get_project_service

router: APIRouter = APIRouter()

@router.get("")
async def get_project(project_service: ProjectService = Depends(get_project_service))->JSONResponse:
    """Gets the entire project file

    Args:
        project_service (ProjectService, optional): DI'd service. Defaults to Depends(get_project_service).

    Returns:
        JSONResponse: JSON package of the project
    """
    return project_service.project.model_dump()

@router.get("/{key}")
async def get_data(key: str, project_service: ProjectService = Depends(get_project_service))->JSONResponse:
    """Generic get controller to get any specific field directly out of the project file

    Args:
        key (str): data to target
        project_service (ProjectService, optional): DI'd service. Defaults to Depends(get_project_service).

    Returns:
        JSONResponse: Json packet in the format of {"key": value}
    """
    #fetch data from service by property and return as json
    value = getattr(project_service, key, None)
    if value is None:
        return JSONResponse({"error": "Key not found"}, status_code=404)
    #populate json response with key and value
    return JSONResponse({key: value})

@router.patch("/{key}")
async def set_data(key: str, payload: dict, project_service: ProjectService = Depends(get_project_service)):
    """Generic set controller to set any specific field directly in the project file

    Args:
        key (str): data to target
        payload (dict): json payload in the format of {"key": value}
        project_service (ProjectService, optional): DI'd service. Defaults to Depends(get_project_service).

    Returns:
        _type_: _description_
    """
    if not hasattr(project_service, key):
        return JSONResponse({"error": "Key not found"}, status_code=404)

    setattr(project_service, key, payload.get(key))
    return project_service.project.model_dump()