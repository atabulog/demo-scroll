//import template and style
import toolbarHtml from "./toolbar.html?raw";
import "./toolbar.css";

//create toolbar element
export function Toolbar(): HTMLElement {
    const template = document.createElement("div");
    template.innerHTML = toolbarHtml;

    const element = template.firstElementChild as HTMLElement;

    return element;
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