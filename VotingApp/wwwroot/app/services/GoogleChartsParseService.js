var app;
(function (app) {
    var services;
    (function (services) {
        var GoogleChartsParseService = (function () {
            function GoogleChartsParseService() {
            }
            GoogleChartsParseService.prototype.convertToChart = function (poll) {
                var chart = { "cols": [], "rows": [] };
                chart.cols.push({ "label": poll.name, "type": "string" });
                chart.cols.push({ "label": "Vote Options", "type": "number" });
                for (var i = 0; i < poll.votes.length; i++) {
                    chart.rows.push({
                        "c": [
                            { "v": poll.votes[i].name, "f": null },
                            { "v": poll.votes[i].voteCount, "f": null }
                        ]
                    });
                }
                console.log(chart);
                return chart;
            };
            GoogleChartsParseService.prototype.addRowToChart = function (chart, voteOption) {
                chart.rows.push({
                    "c": [
                        { "v": voteOption.name, "f": null },
                        { "v": "" + voteOption.voteCount, "f": null }
                    ]
                });
            };
            return GoogleChartsParseService;
        }());
        services.GoogleChartsParseService = GoogleChartsParseService;
        angular.module("VotingApp").service("GoogleChartsParseService", GoogleChartsParseService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=GoogleChartsParseService.js.map