var app;
(function (app) {
    var models;
    (function (models) {
        var Vote = (function () {
            function Vote(name) {
                this.name = name;
            }
            return Vote;
        }());
        models.Vote = Vote;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=Vote.js.map