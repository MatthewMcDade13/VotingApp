module app.controllers
{
    import Poll = app.models.Poll;
    import Vote = app.models.Vote;
    import AppHttpService = app.services.AppHttpService;

    export class HomeController
    {
        polls: Array<Poll>;
        isBusy: boolean;
        http: AppHttpService;

        static $inject = ["$scope", "AppHttpService"];

        constructor(public $scope: angular.IScope,
            AppHttpService: AppHttpService)
        {
            ;
            this.http = AppHttpService;

            this.isBusy = false;
        }    

        async getAllPolls(): Promise<void>
        {
            this.isBusy = true;
            let allPollsResponse: Array<Poll>;

            allPollsResponse = await this.http.getAllPolls();

            this.$scope.$apply(() => {
                this.polls = allPollsResponse;
                this.isBusy = false;
            });
        }
    }


    angular.module("VotingApp").controller("HomeController", HomeController);
}

    
