export interface Behaviour {
    id: number;
    name: string;
    isDisabled: boolean;
}

export class BehaviourService{
    private static readonly backend: string = 'https://eubrics-project.herokuapp.com';

    public static async getBehaviours(): Promise<Behaviour[]> {
        const response = await fetch(`${BehaviourService.backend}/behaviour/all`, {
            method: 'GET',
        });
        console.log(response);
        return (await response.json() || []);
    }
}