import { writable } from "svelte/store";
import type { ProjectIntf } from "../interfaces/project";
import { getProjectData, updateProjectTitle } from "../api/projectApi";

//create data store
export const project = writable<ProjectIntf | null>(null);

/**
 * Load the store with project data from the backend
 */
export async function loadProject() {
    const data: ProjectIntf = await getProjectData();
    project.set(data);
}

/**
 * Updates the project title
 * @param title New title for project
 */
export async function updateTitle(title: string) {
    const updated = await updateProjectTitle(title);
    project.set(updated);
}