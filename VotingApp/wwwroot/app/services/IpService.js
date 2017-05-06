var app;
(function (app) {
    var services;
    (function (services) {
        var IpService = (function () {
            function IpService() {
            }
            //Iterates through Ip adresses,
            //Returns false if passed in IP string matches anything
            //in the array of ip Adresses. True if none match
            IpService.prototype.checkIp = function (adresses, ip) {
                for (var i = 0; i < adresses.length; i++) {
                    if (adresses[i].adress === ip) {
                        return false;
                    }
                }
                return true;
            };
            return IpService;
        }());
        services.IpService = IpService;
        angular.module("VotingApp").service("IpService", IpService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=IpService.js.map