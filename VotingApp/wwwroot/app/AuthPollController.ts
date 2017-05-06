
module app.controllers
{
    import Poll = app.models.Poll;
    import FormParseService = app.services.FormParseService;
    import AppHttpService = app.services.AppHttpService;

    export class AuthPollController
    {
        parser: FormParseService;
        newPoll: Poll;        
        myPolls: Array<Poll>;
        isBusy: boolean;
        textAreaIsValid: boolean;
        voteOptions: string;
        http: AppHttpService;

        static $inject = ["$location", "$scope", "FormParseService", "AppHttpService" ];

        constructor(public $location: angular.ILocationService, public $scope: angular.IScope,
            FormParseService: FormParseService, AppHttpService: AppHttpService)
        {
            this.parser = FormParseService;
            this.isBusy = true;
            this.textAreaIsValid = true;
            this.voteOptions = "";
            this.http = AppHttpService;
        }

        async getUserPolls(): Promise<void>
        {
            let userPollResponse: Array<Poll> = await this.http.getUserPolls();

            this.$scope.$apply(() => {
                this.myPolls = userPollResponse;
                this.isBusy = false;
            });
        }

        async createNewPoll(): Promise<void>
        {
            //If the parseTextArea func successfully parses the text area
            if (this.parser.parseTextArea(this.voteOptions, this.newPoll))
            {
                this.textAreaIsValid = true;
                await this.http.createNewPoll(this.newPoll);

                this.$scope.$apply(() => {
                    this.newPoll = null;
                    this.voteOptions = null;
                    this.$location.path("/#!/mypolls");
                });
            }
            else
            {
                this.textAreaIsValid = false
            }
        }
    }

    angular.module("VotingApp").controller("AuthPollController", AuthPollController);

}
    