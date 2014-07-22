angular.module('ngPrestashop', [])
    .provider('prestashop', function prestashopProvider() {
        var params = {};
        this.setParams = function (_params) {
            params = _params;
        };
        this.$get = ["$http", function ($http) {
            return {
                get: function (_params) {
                    return $http.get(location.pathname, {'params': $.extend(true, {}, params, _params)})
                },
                post: function (_params, body) {
                    return $http.post(location.pathname, body, {'params': $.extend(true, {}, params, _params)})
                }
            }
        }];
    });

angular.module('angular-prestashop', ['ngPrestashop', 'ngRoute', 'angular-md5'])
    .config(function ($interpolateProvider, $routeProvider, prestashopProvider) {

        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');

        $routeProvider
            .when("/", {redirectTo: "/settings"})
            .when("/settings", {controller: 'SettingsCtrl', templateUrl: "settings.html"})
            .when("/404", {templateUrl: "404.html"})
            .otherwise({redirectTo: "/"});

        prestashopProvider.setParams({
            'ajax': 1,
            'controller': 'AdminAngular',
            'token': ctrl_token
        });
    })
    .provider('configuration', function ConfigurationProvider() {
        this.$get = ["$http", "prestashop", function ($http, prestashop) {
            return {
                set: function (key, value) {
                    return prestashop.post({'action': 'updateConfiguration', 'key': key}, value)
                },
                get: function (key) {
                    return prestashop.get({'action': 'getConfiguration', 'key': key})
                }
            };
        }];
    });