/// <reference path="global.d.ts" />

module app.controllers
{

    export class HomeController
    {
        header: string;
        
        constructor()
        {
            this.header = "AYY LMAO";
        }
    }


    angular.module("VotingApp").controller("HomeController", HomeController);
}