module app.models
{
    export class Poll
    {
        id: number;
        name: string;
        userName: string;
        votes: Array<Vote>;
        adresses: Array<IpAdress>;
    }
}