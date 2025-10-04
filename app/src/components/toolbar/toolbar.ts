export function Toolbar(): HTMLElement {
    // Load the HTML template
    const template = document.createElement("div");
    template.innerHTML = require("./Toolbar.html?raw"); // vite supports ?raw imports
    const element = template.firstElementChild as HTMLElement;

    // Example behavior: log when icon is clicked
    element.querySelectorAll(".icon").forEach((icon) => {
        icon.addEventListener("click", () => {
            console.log("Icon clicked:", (icon as HTMLImageElement).alt);
        });
    });

    return element;
}
