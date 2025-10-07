import { type Project } from '../interfaces/project-intf';
import { BehaviorSubject } from '../core/behaviorSubject';
import { API_BASE_URL } from '../config';

export class ProjectService {

    private static _instance: ProjectService; // Singleton instance
    private static readonly base_url = `${API_BASE_URL}/project`; // Base URL for project-related API endpoints

    private _title = new BehaviorSubject<string>('New Project'); //underlying BehaviorSubject to manage title state
    // exposed observable for title
    public title$ = {
        subscribe: (callback: (value: string) => void) => this._title.subscribe(callback)
    }

    /**
     * Private constructor to enforce singleton pattern
     */
    private constructor() {
        // Fetch the initial title when the service is instantiated
        this.getTitle().catch(error => {
            console.error('Failed to fetch initial project title:', error);
        });
    }

    /**
     * Singleton instance accessor
     * @returns The singleton instance of ProjectService
     */
    public static getInstance(): ProjectService {
        if (!this._instance) {
            this._instance = new ProjectService();
        }
        return this._instance;
    }

    /**
     * Get the project title from the backend API and update the title data
     */
    public async getTitle(): Promise<void> {
        // Fetch the project title from the backend API
        const response = await fetch(`${ProjectService.base_url}/title`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        // Handle non-OK responses
        if (!response.ok) {
            throw new Error(`Error fetching project: ${response.statusText}`);
        }
        // Update the title BehaviorSubject with the fetched title
        this._title.next((await response.json() as Project).title);
    }

    /**
     *  Update the project title on the backend and update the title data
     * @param title - The new title to set
     */
    public updateTitle(title: string) {
        // post the update to the backend API
        fetch(`${ProjectService.base_url}/title`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Error updating project title: ${response.statusText}`);
            }
            // Update the title BehaviorSubject with the new title
            this._title.next(title);
        }).catch(error => {
            console.error('Failed to update project title:', error);
        });
    }

};