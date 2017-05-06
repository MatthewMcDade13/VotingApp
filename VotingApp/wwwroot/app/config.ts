module app
{
    //Interfaces that extend on Angular and Angular Route interfaces
    //for use with custom properties
    export interface IRouteParams extends angular.route.IRouteParamsService {
        userId: number | string;
    }

    export interface IAppRoute extends angular.route.IRoute {
        title: string;
    }

    export interface IAppRootService extends angular.IRootScopeService {
        title: string;
    }

    var app = angular.module("VotingApp");

    app.config(($routeProvider: angular.route.IRouteProvider) => {

        $routeProvider.when("/polls", <IAppRoute>{

            controller: "HomeController",
            controllerAs: "home",
            templateUrl: "/views/home.html",
            title: "All Polls"
        });

        $routeProvider.when("/polls/:userId/", <IAppRoute>{
            controller: "PollController",
            controllerAs: "poll",
            templateUrl: "/views/poll.html",
            title: "Poll"
        });

        $routeProvider.when("/mypolls", <IAppRoute>{
            controller: "AuthPollController",
            controllerAs: "poll",
            templateUrl: "/views/mypolls.html",
            title: "My Polls"
        });

        $routeProvider.when("/newpoll", <IAppRoute>{
            controller: "AuthPollController",
            controllerAs: "poll",
            templateUrl: "/views/newpoll.html",
            title: "New Poll"
        });



        $routeProvider.otherwise({ redirectTo: "/polls" });
    });

    app.run(['$rootScope', function ($rootScope: IAppRootService) {

        $rootScope.$on("$routeChangeSuccess", function (event: any, current: any, previous: any) {
            $rootScope.title = current.$$route.title;
        });
    }]);
}

    
    
