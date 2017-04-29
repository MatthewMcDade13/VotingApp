/// <reference path="globals/global.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController() {
                this.header = "AYY LMAO";
                this.polls = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            }
            return HomeController;
        }());
        controllers.HomeController = HomeController;
        angular.module("VotingApp").controller("HomeController", HomeController);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map