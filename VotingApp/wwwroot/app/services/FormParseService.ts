module app.services
{
    import Poll = app.models.Poll;
    import Vote = app.models.Vote;
    

    export class FormParseService
    {
        voteOptions: Array<string>;

        constructor()
        {
            this.voteOptions = [];
        }

        private validateTextArea(textArea: string): boolean
        {
            //Set voteOptions property here
            this.voteOptions = textArea.split("\n");

            //remove duplicates
            this.voteOptions = this.voteOptions.filter((ele, index) => {
                return this.voteOptions.indexOf(ele) === index;
            });

            if (this.voteOptions.length < 2) {
                return false;
            }

            for (let i = 0; i < this.voteOptions.length; i++) {
                if (/^\s*$/.test(this.voteOptions[i]) || this.voteOptions[i].length > 25) {
                    return false;
                }
            }

            return true;
        }

        parseTextArea(textArea: string, poll: Poll): boolean
        {
            if (this.validateTextArea(textArea))
            {
                //declare votes to make Js happy
                poll.votes = [];                               

                for (let i = 0; i < this.voteOptions.length; i++)
                {
                    this.voteOptions[i] = this.voteOptions[i].trim();

                    //JS cant find/doesnt like when I instantiate a Vote class with new keyword?
                    //This is my workaround.
                    poll.votes.push(<Vote>{ "name": this.voteOptions[i] });
                }

                return true;
            }
            
            return false;
        }

        validateFormInput(text: string, poll: Poll): boolean
        {
            if (poll.votes === null)
            {
                return false;
            }

            for (let i = 0; i < poll.votes.length; i++)
            {
                if (text === poll.votes[i].name)
                {
                    return false;
                }
            }

            return true;
        }

       
    }

    angular.module("VotingApp").service("FormParseService", FormParseService);
}