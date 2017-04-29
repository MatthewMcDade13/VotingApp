/// <reference path="globals/global.d.ts" />


//We are using custom properties to change page title 
//so we cant use Angular Types ):
module app
{
    let app = angular.module("VotingApp");

        app.config(($routeProvider: any) => {

            $routeProvider.when("/", {

                controller: "HomeController",
                controllerAs: "home",
                templateUrl: "/views/home.html",
                title: "All Polls"
            });

            $routeProvider.when("/test", {
                controller: "HomeController",
                controllerAs: "home",
                templateUrl: "/views/test.html",
                title: "Test"
            });

            $routeProvider.otherwise({ redirectTo: "/" });
         });

        app.run(['$rootScope', function ($rootScope: any) {

        $rootScope.$on("$routeChangeSuccess", function (event: any, current: any, previous: any) {
            $rootScope.title = current.$$route.title;
        });
     }]);
}