var app;
(function (app) {
    var directives;
    (function (directives) {
        function waitCursor() {
            return {
                templateUrl: "/views/waitCursor.html"
            };
        }
        directives.waitCursor = waitCursor;
        angular.module("helpfulUi").directive("waitCursor", waitCursor);
    })(directives = app.directives || (app.directives = {}));
})(app || (app = {}));
//# sourceMappingURL=waitCursor.js.map