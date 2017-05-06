var app;
(function (app) {
    var services;
    (function (services) {
        var FormParseService = (function () {
            function FormParseService() {
                this.voteOptions = [];
            }
            FormParseService.prototype.validateTextArea = function (textArea) {
                var _this = this;
                //Set voteOptions property here
                this.voteOptions = textArea.split("\n");
                //remove duplicates
                this.voteOptions = this.voteOptions.filter(function (ele, index) {
                    return _this.voteOptions.indexOf(ele) === index;
                });
                if (this.voteOptions.length < 2) {
                    return false;
                }
                for (var i = 0; i < this.voteOptions.length; i++) {
                    if (/^\s*$/.test(this.voteOptions[i]) || this.voteOptions[i].length > 25) {
                        return false;
                    }
                }
                return true;
            };
            FormParseService.prototype.parseTextArea = function (textArea, poll) {
                if (this.validateTextArea(textArea)) {
                    //declare votes to make Js happy
                    poll.votes = [];
                    for (var i = 0; i < this.voteOptions.length; i++) {
                        this.voteOptions[i] = this.voteOptions[i].trim();
                        //JS cant find/doesnt like when I instantiate a Vote class with new keyword?
                        //This is my workaround.
                        poll.votes.push({ "name": this.voteOptions[i] });
                    }
                    return true;
                }
                return false;
            };
            FormParseService.prototype.validateFormInput = function (text, poll) {
                if (poll.votes === null) {
                    return false;
                }
                for (var i = 0; i < poll.votes.length; i++) {
                    if (text === poll.votes[i].name) {
                        return false;
                    }
                }
                return true;
            };
            return FormParseService;
        }());
        services.FormParseService = FormParseService;
        angular.module("VotingApp").service("FormParseService", FormParseService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=FormParseService.js.map