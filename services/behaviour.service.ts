export interface Behaviour {
    id: number;
    name: string;
    isDisabled: boolean;
}

export class BehaviourService{
    private static readonly backend: string = 'http://localhost:4000';

    public static async getBehaviours(token: string): Promise<Behaviour[]> {
        const response = await fetch(`${BehaviourService.backend}/behaviour/all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    }
}