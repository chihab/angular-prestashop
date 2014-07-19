angular.module('angular-prestashop')
    .controller('SettingsCtrl', function ($scope, configuration) {
        $scope.config = {};
        $scope.load = function () {
            configuration.get('appearance')
                .success(function (data, status, headers, config) {
                    $scope.config = data;
                });
        }
        $scope.save = function () {
            configuration.set('appearance', $scope.config)
                .success(function (data, status, headers, config) {
                    if (data == 'ok')
                        console.log("Settings saved");
                    else
                        console.error("Something bad happened");
                });
        }
        $scope.load();
    })