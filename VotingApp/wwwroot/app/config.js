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
        $routeProvider.when("/polls/:userId/", {
            controller: "PollController",
            controllerAs: "poll",
            templateUrl: "/views/poll.html",
            title: "Poll"
        });
        $routeProvider.when("/mypolls", {
            controller: "AuthPollController",
            controllerAs: "poll",
            templateUrl: "/views/mypolls.html",
            title: "My Polls"
        });
        $routeProvider.when("/newpoll", {
            controller: "AuthPollController",
            controllerAs: "poll",
            templateUrl: "/views/newpoll.html",
            title: "New Poll"
        });
        $routeProvider.otherwise({ redirectTo: "/polls" });
    });
    app.run(['$rootScope', function ($rootScope) {
            $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                $rootScope.title = current.$$route.title;
            });
        }]);
})(app || (app = {}));
//# sourceMappingURL=config.js.map