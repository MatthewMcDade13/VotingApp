/// <reference path="globals/global.d.ts" />


module app.controllers
{

    export class HomeController
    {
        header: string;
        polls: Array<number>;
        
        constructor()
        {
            this.header = "AYY LMAO";
            this.polls = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        }
    }


    angular.module("VotingApp").controller("HomeController", HomeController);
}