module app.directives
{
   
    export function waitCursor(): angular.IDirective
    {
        return {
            templateUrl: "/views/waitCursor.html"
        };
    }

    angular.module("helpfulUi").directive("waitCursor", waitCursor);
}