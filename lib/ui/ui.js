angular.module("ui",[]);

angular.module("ui").run(function($templateCache){
    //console.log(new Date);
    $templateCache.put("view/accordion.html", '<div class="ui-accordion"><div class="ui-accordion-title" ng-click="open()">{{title}}</div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div></div>')
})

angular.module("ui").directive("uiAccordions", function() {
    return {
        controller: function($scope, $element, $attrs) {
            var accordions = [];
            this.registerAccordion = function(accordion) {
                //console.log(accordion.$id);
                accordions.push(accordion)
            };
            this.closeAll = function() {
                accordions.forEach(function (accordion) {
                    accordion.isOpened = false;
                })
            }
        }
    };
});

angular.module("ui").directive("uiAccordion", function() {
    return {
        templateUrl: "view/accordion.html",
        scope: {
            title: "@"
        },                
        transclude: true,
        require: "^uiAccordions",
        link: function (scope, element, attrs, ctrl ) {
            ctrl.registerAccordion(scope);
            scope.open = function () {
                ctrl.closeAll()
                scope.isOpened = !scope.isOpened;
            }            
        }
    };
})