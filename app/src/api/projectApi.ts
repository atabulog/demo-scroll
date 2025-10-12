import type { ProjectIntf } from '../interfaces/project';
import { backend_url } from '../config';

const API_BASE_URL = `${backend_url}/project`

export async function getProjectData(): Promise<ProjectIntf> {
    //fetch project data
    const response = await fetch(API_BASE_URL);
    //handle errors
    if (!response.ok) throw new Error(`Error fetching project data: ${response.statusText}`);
    // return result
    return response.json() as Promise<ProjectIntf>;
}

/**
 * Update the project title
 * @param newTitle new title to write to server
 */
export async function updateProjectTitle(newTitle: string): Promise<ProjectIntf> {
    //post update
    const response = await fetch(`${API_BASE_URL}/title`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newTitle })
    });
    //handle errors
    if (!response.ok) throw new Error(`Error updating project title: ${response.statusText}`);
    //return title received from backend after update
    return response.json() as Promise<ProjectIntf>;
}