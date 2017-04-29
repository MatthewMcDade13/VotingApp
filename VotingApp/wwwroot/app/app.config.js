/// <reference path="global.d.ts" />
var app;
(function (app) {
    angular.module("VotingApp")
        .config(function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/home.html"
        });
        $routeProvider.when("/test", {
            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/test.html"
        });
        $routeProvider.otherwise({ redirectTo: "/" });
    });
})(app || (app = {}));
//# sourceMappingURL=app.config.js.map