angular.module('angular-prestashop')
    .controller('SettingsCtrl', function ($scope, configuration, $timeout, md5) {
        $scope.hash = null;
        $scope.alert = {};
        $scope.config = {};

        $scope.load = function () {
            configuration.get('appearance')
                .success(function (data, status, headers, config) {
                    $scope.config = data;
                });
        };
        $scope.alertClass = function () {
            return "alert-" + $scope.alert.level;
        };
        $scope.$watch('text', function (newVal, oldVal) {
            if (oldVal != newVal && newVal != '')
                $scope.hash = md5.createHash(newVal);
            else
                $scope.hash = '';
        });
        $scope.save = function () {
            configuration.set('appearance', $scope.config)
                .success(function (data) {
                    if (data == 'ok') {
                        $scope.alert.message = "Settings saved";
                        $scope.alert.level = 'success';
                    }
                    else {
                        $scope.alert.message = "Settings not saved";
                        $scope.alert.level = 'warning';
                    }
                    $timeout(function () {
                        $scope.alert.message = '';
                    }, 2000)
                })
                .error(function () {
                    $scope.alert.message = "Something bad happened";
                    $scope.alert.level = 'danger';
                    $timeout(function () {
                        $scope.alert.message = '';
                    }, 2000)
                });
        };
        $scope.load();
    });