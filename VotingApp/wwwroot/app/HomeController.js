/// <reference path="global.d.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController() {
                this.header = "AYY LMAO";
            }
            return HomeController;
        }());
        controllers.HomeController = HomeController;
        angular.module("VotingApp").controller("HomeController", [HomeController]);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=HomeController.js.map