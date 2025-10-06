from pathlib import Path
from threading import Lock
from app.schemas.Project import Project
import json

class ProjectService:

    _file_path: Path
    _lock : Lock
    _project: Project

    def __init__(self, file_path: Path = Path("data/persistent-storage.json")):
        """Service maintaining stored data for the system

        Args:
            file_path (Path, optional): storage location for data. Defaults to Path("app/data/persistent-storage.json").
        """
        self._file_path = file_path
        self._file_path.parent.mkdir(exist_ok=True)
        self._lock = Lock()
        self._project = self._load_file()
        

    def _load_file(self) -> Project:
        """Load stored data from file

        Returns:
            Project: Stored data from file
        """
        # guard against bad data file
        if not self._file_path.exists():
            return Project(title="Default project")
        
        # open stored data and read file
        with self._file_path.open("r") as file:
            #kwargs load the json file into the structure
            data = json.load(file)
            return Project(**data)
        
    def _save_file(self) -> None:
        """Save the project data to file
        """
        with self._file_path.open("w+") as file:
            file.write(self._project.model_dump_json(indent=2))

    @property
    def title(self) -> str:
        """Project title getter

        Returns:
            str: Current project title
        """
        with self._lock:
            return self._project.title
        
    @title.setter
    def title(self, value: str) -> None:
        """Project title setter

        Args:
            value (str): New project title
        """
        with self._lock:
            self._project.title = value
            self._save_file()

    @property
    def version(self) -> str:
        """Project version getter

        Returns:
            str: Current project version
        """
        with self._lock:
            return self._project.version
        
    @version.setter
    def version(self, value: str) -> None:
        """Project version setter

        Args:
            value (str): New project version
        """
        with self._lock:
            self._project.version = value
            self._save_file()

# Create a single instance for the app
project_service_instance = ProjectService()

# Dependency provider
def get_project_service() -> ProjectService:
    return project_service_instance