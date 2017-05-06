module app.services
{
    import IpAdress = app.models.IpAdress;
    import Poll = app.models.Poll;
    import Vote = app.models.Vote;


    export class AppHttpService
    {
        static $inject = ["$http"];

        constructor(public $http: angular.IHttpService)
        {
        }

        async deletePoll(pollId: number, pollUserName: string): Promise<void>
        {
            this.$http.delete(`api/poll/delete/${pollId}?user=${pollUserName}`);
        }

        async getUserIp(): Promise<IpAdress>
        {
            return this.$http.get("http://freegeoip.net/json/")
                .then(response => {
                    return <IpAdress>response.data;
                });
        }

        async getAllPolls(): Promise<Array<Poll>>
        {
            return this.$http.get("/api/poll/total")
                .then(response => {
                    return <Array<Poll>>response.data;
                });
        }

        async getPoll(routeParam: number|string): Promise<Poll>
        {
            return this.$http.get(`/api/poll/${routeParam}`)
                .then(response => {
                    return <Poll>response.data;
                });
        }

        async checkOwner(pollUserName: string): Promise<boolean>
        {
            return this.$http.get(`/api/user/${pollUserName}`)
                .then(response => {
                    let json: any = response.data;
                    //If the api responds with an object that has isOwner prop set to true,
                    //we know that the user viewing this poll is the owner
                    if (json.isOwner)
                    {
                        return true;
                    }
                    return false;
                });
        }

        async checkAuthorized(): Promise<boolean>
        {
            return this.$http.get("/api/user/auth")
                .then(response => {

                    let authResponse: any = response.data;

                    if (authResponse.isAuthenticated === true) {
                        return true;
                    }
                    return false;
                });
        }

        async castVote(vote: Vote, pollId: number): Promise<void>
        {

               await this.$http.put("/api/poll/vote", {
                    "name": vote.name,
                    "voteCount": vote.voteCount,
                    "pollId": pollId
                });            
        }

        async createNewVoteOption(voteOption: Vote): Promise<void>
        {
           await this.$http.put("api/poll/vote/new", voteOption);
        }

        async getUserPolls(): Promise<Array<Poll>>
        {
             return this.$http.get("/api/poll/userpolls")
                .then(response => {
                    return <Array<Poll>>response.data;
                });
        }

        async createNewPoll(newPoll: Poll): Promise<void>
        {
            await this.$http.post("/api/poll/new", newPoll);                
        }
    }

    angular.module("VotingApp").service("AppHttpService", AppHttpService);
}