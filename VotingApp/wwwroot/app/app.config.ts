/// <reference path="global.d.ts" />

module app
{
    angular.module("VotingApp")
        .config(($routeProvider: angular.route.IRouteProvider) => {

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
}