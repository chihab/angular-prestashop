angular.module('ngPrestashop', [])
    .provider('prestashop', function prestashopProvider() {
        var params = null;
        var baseUrl = null;

        function addParams(source, _params) {
            var __params = {};
            __params = angular.copy(source, __params);
            for (var param in _params) {
                __params[param] = _params[param];
            }
            return __params;
        }

        this.setParams = function (_params) {
            params = _params;
        }
        this.setBaseUrl = function (_baseUrl) {
            baseUrl = _baseUrl;
        }
        this.$get = ["$http", function ($http) {
            return {
                get: function (_params) {
                    return $http.get(baseUrl, {'params': addParams(params, _params)})
                },
                post: function (_params, body) {
                    return $http.post(baseUrl, body, {'params': addParams(params, _params)})
                }
            }
        }];
    });

angular.module('angular-prestashop', ['ngPrestashop', 'ngRoute'])
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
        prestashopProvider.setBaseUrl('/admin-dev/index.php');

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
    })
