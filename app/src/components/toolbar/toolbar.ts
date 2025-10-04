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