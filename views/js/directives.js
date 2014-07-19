angular.module('angular-prestashop')
    .directive('widgetValue',function () {
        return {
            restrict: 'E',
            scope: {
                value: '@value'
            },
            template: '{{value}}'
        };
    })