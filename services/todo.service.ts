import { DB_SERVICES } from './CONSTANTS';

export class TodoService{
    private static readonly backend: string = DB_SERVICES;

    public static async listAllTodos(token: string, behaviourId: number) {
        const response = await fetch(`${TodoService.backend}/todo/list/${behaviourId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }

    public static async addTodo(token: string, message: string, behaviourId: number) {
        const response = await fetch(`${TodoService.backend}/todo/create`, {
            body: JSON.stringify({message, behaviourId}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }

    public static async editTodo(token: string, message: string, todoId: number) {
        const response = await fetch(`${TodoService.backend}/todo/update`, {
            body: JSON.stringify({message, todoId}),
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
    
    public static async  removeTodo(token: string, todoId: number) {
        const response = await fetch(`${TodoService.backend}/todo/delete`, {
            body: JSON.stringify({todoId}),
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
}