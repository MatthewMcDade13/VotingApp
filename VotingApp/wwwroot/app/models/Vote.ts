﻿module app.models
{
    export class Vote
    {
        name: string;
        voteCount: number;
        pollId: number;
        userIp: string;

        constructor(name: string)
        {
            this.name = name;
        }
    }
}