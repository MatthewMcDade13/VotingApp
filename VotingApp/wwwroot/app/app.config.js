/// <reference path="globals/global.d.ts" />
//We are using custom properties to change page title 
//so we cant use Angular Types ):
var app;
(function (app_1) {
    var app = angular.module("VotingApp");
    app.config(function ($routeProvider) {
        $routeProvider.when("/polls", {
            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/home.html",
            title: "All Polls"
        });
        $routeProvider.when("/polls/test", {
            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/test.html",
            title: "Test"
        });
        $routeProvider.otherwise({ redirectTo: "/polls" });
    });
    app.run(['$rootScope', function ($rootScope) {
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                $rootScope.title = current.$$route.title;
            });
        }]);
})(app || (app = {}));
//# sourceMappingURL=app.config.js.map