import { ProjectService } from "../../services/project-service";
//import template and style
import toolbarHtml from "./toolbar.html?raw";
import "./toolbar.css";

const projectService = ProjectService.getInstance();

export class Toolbar {
    private toolbarElement: HTMLElement;
    private titleElement: HTMLElement;
    private unsubscribe: () => void;

    constructor() {
        // Select toolbar and title DOM elements
        const template = document.createElement("div");
        template.innerHTML = toolbarHtml;
        this.toolbarElement = template.firstElementChild as HTMLElement;
        this.titleElement = this.toolbarElement.querySelector("#project-title")!;

        // Subscribe to title updates
        this.unsubscribe = projectService.title$.subscribe((title) => {
            this.titleElement.textContent = title;
        });

        // Make title editable
        this.makeTitleEditable();
    }

    render(parent: HTMLElement) {
        parent.appendChild(this.toolbarElement);
    }

    destroy() {
        this.unsubscribe?.();
        this.titleElement.contentEditable = "false";
    }

    private makeTitleEditable() {
        this.titleElement.contentEditable = "true";
        this.titleElement.addEventListener("blur", () => {
            const newTitle = this.titleElement.textContent?.trim() || "Untitled";
            projectService.updateTitle(newTitle);
        });
        this.titleElement.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.titleElement.blur();
            }
        });
    }
}

/*
TODO: I want to make the project name editable, but this is going to require
standing up a development level backend server to handle the requests. I'm leaning
towards using python and fastapi for the demo backend for testing.

once the embedded backend is stood up from a hardware perspective,  this fast api
implementation can be used to standup the server and maintain the same behavior as before.

export function editToolbarProjectName(newTitle: string) {
    const name_element = document.getElementById("project-name");

}
*/