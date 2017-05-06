module app.controllers
{

    import IRouteParams = app.IRouteParams;
    import Poll = app.models.Poll;
    import Vote = app.models.Vote;
    import IpAdress = app.models.IpAdress;
    import IpService = app.services.IpService;
    import FormParseService = app.services.FormParseService;
    import AppHttpService = app.services.AppHttpService;
    import GoogleChartsParseService = app.services.GoogleChartsParseService;
    import Chart = app.models.Chart;


    export class PollController
    {
        pollView: Poll;
        pollChart: Chart;
        newVoteOptionName: string;
        isBusy: boolean;
        isOwner: boolean;
        isAuthorized: boolean;
        showConfirmOverlay: boolean;
        userIp: IpAdress;
        parser: FormParseService;
        http: AppHttpService;
        googleCharts: GoogleChartsParseService;

        static $inject = ["$routeParams", "$scope", "$location", "IpService", "FormParseService", "AppHttpService", "GoogleChartsParseService"];

        constructor(public $routeParams: IRouteParams, public $scope: angular.IScope,
            public $location: angular.ILocationService,
            public IpService: IpService,
            FormParseService: FormParseService,
            AppHttpService: AppHttpService,
            GoogleChartsParseService: GoogleChartsParseService)
        {

            this.parser = FormParseService;
            this.http = AppHttpService;
            this.googleCharts = GoogleChartsParseService;

            this.isBusy = false;
            this.isOwner = false;
            this.isAuthorized = false;
            this.showConfirmOverlay = false;

            this.newVoteOptionName = "";
        }


        showOverlay(): void
        {
            this.showConfirmOverlay = true;
        }

        hideOverlay(): void
        {
            this.showConfirmOverlay = false;
        }

        async deletePoll(): Promise<void>
        {
            this.isBusy = true;
            await this.http.deletePoll(this.pollView.id, this.pollView.userName);
            this.isBusy = false;
            this.$location.path("/#!/polls");
        }

        async getUserIp(): Promise<void>
        {
            this.userIp = await this.http.getUserIp();
        }

        async getPoll(): Promise<void>
        {
            this.isBusy = true;
            let pollResponse: Poll = await this.http.getPoll(this.$routeParams.userId);

            let ownerResponse = await this.http.checkOwner(pollResponse.userName);

            let authResponse = await this.http.checkAuthorized();

            this.drawGoogleChart(pollResponse);

            this.$scope.$apply(() => {
                this.pollView = pollResponse;
                this.isOwner = ownerResponse;
                this.isAuthorized = authResponse;
                this.isBusy = false;
            });
        }

        //Func that checks if current user has voted on this poll already
        //and if not, casts vote and posts to database.
        async castVote(vote: Vote): Promise<void>
        {

            //If current user Ip is NOT found in the array of known
            //User Ips associated with this pollView
            if (this.IpService.checkIp(this.pollView.adresses, this.userIp.ip))
            {

                //Cast vote
                vote.voteCount++;
                this.pollView.adresses.push(this.userIp);

                this.isBusy = true;
                await this.http.castVote(vote, this.pollView.id);

                this.$scope.$apply(() => {
                    this.drawGoogleChart(this.pollView);
                    this.isBusy = false;
                });
                
            }
            else
            {
                //TODO: Remove this and put in some text into the 
                //HTML doc to notify user they cannot vote on this poll
                alert("You have already voted on this poll!");
            }
        }

        async createNewVoteOption(): Promise<void>
        {

            let voteOption: Vote = <Vote>{
                "name": this.newVoteOptionName,
                "voteCount": 0,
                "pollId": this.pollView.id
            };

            //If the name of the new vote option the user entered already exists, tell them so
            //and dont allow them to create a new one
            if (this.parser.validateFormInput(this.newVoteOptionName, this.pollView) === false)
            {
                //TODO: Put this alert in the HTML as a warning text
                alert("that vote option already exists!");
                return;
            }

            if (this.IpService.checkIp(this.pollView.adresses, this.userIp.ip))
            {
                this.isBusy = true;
                await this.http.createNewVoteOption(voteOption);

                //Update client so we dont have to run to server for accurate data
                voteOption.voteCount++;
                this.pollView.adresses.push(this.userIp);
                this.pollView.votes.push(voteOption);

                this.drawGoogleChart(this.pollView);

                this.$scope.$apply(() => {
                    this.isBusy = false;
                    this.newVoteOptionName = "";
                });
            }
            else
            {
                //TODO: Put this alert in the HTML as a warning text
                alert("You have voted on this poll already!");
            }
        }

        private drawGoogleChart(poll: Poll): void
        {
            let chart: any = {};
            chart.type = "PieChart";
            chart.data = this.googleCharts.convertToChart(poll);
            chart.options = {
                chartArea: { left: 0, top: 0, width: "100%", height: "100%" },
                fontSize: 25,
                vAxis: { textStyle: { fontSize: 5 } },
                height: 250,
                backgroundColor: "#f1f1f1",
                is3D: true
            };

            this.pollChart = chart;
        }
    }

    angular.module("VotingApp").controller("PollController", PollController);
}