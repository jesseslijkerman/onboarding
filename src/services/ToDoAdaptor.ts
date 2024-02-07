import {ToDo} from "../Interfaces.ts";

export class ToDoAdaptor {
    resourcesUrl: string;

    constructor(resourceUrl: string) {
        this.resourcesUrl = resourceUrl;
        console.log("Created ToDoAdaptor for " + resourceUrl);
    }

    async fetchJson(url: string, options: any = null): Promise<any> {
        let response = await fetch(url, options);
        if (response.ok) {
            return await response.json();
        } else {
            // response body provides the http-error information
            console.log(response, !response.bodyUsed ? await response.text() : "");
            return null;
        }
    }

    async asyncFindAll(): Promise<ToDo[] | null> {
        console.log("ToDoAdaptor.asyncFindAll()...");
        return await this.fetchJson(this.resourcesUrl);
    }

    async asyncSave(todo: ToDo): Promise<ToDo | null> {
        console.log("ToDoAdaptor.asyncSave()...");
        const selectedTodo = await this.fetchJson(this.resourcesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        return selectedTodo;
    }

    async asyncEditById(id: number, todo: ToDo): Promise<ToDo | null> {
        console.log("ToDoAdaptor.asyncDeleteById()...");
        const editedTodo = await this.fetchJson(this.resourcesUrl + "/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        });
        return editedTodo;
    }

    async asyncDeleteById(id: number): Promise<ToDo | null> {
        console.log("ToDoAdaptor.asyncDeleteById()...");
        const deletedTodo = await this.fetchJson(this.resourcesUrl + "/" + id, {
            method: "DELETE"
        });
        return deletedTodo;
    }
}
