export class AuthService {
    private static readonly backend: string = 'https://eubrics-project.herokuapp.com/';

    public static async signUp(username: string, password: string) {
        const response = await fetch(`${AuthService.backend}/auth/signup`, {
            body: JSON.stringify({username, password}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    }

    public static async logIn(username: string, password: string) {
        const response = await fetch(`${AuthService.backend}/auth/login`, {
            body: JSON.stringify({username, password}),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    }
}