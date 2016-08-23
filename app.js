// Prototype to create hashCode out of a string.
// "Prôóf" -> 77519973
String.prototype.hashCode = function () {
    var hashcode = 0, i, s, l;
    if (this.length === 0) return hashcode;
    for (i = 0, l = this.length; i < l; i++) {
        s = this.charCodeAt(i);
        hashcode = ((hashcode << 5) - hashcode) + s;
        hashcode |= 0;
    }
    return hashcode;
};

var dtoApp = angular.module("dtoApp", ["ngSanitize", "ngStorage", "ui.router", "angular.filter", "ngMaterial", "md.data.table", "getData", "ngSanitize", "angular-loading-bar", "ngMessages"]);

dtoApp.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$compileProvider', '$sceDelegateProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $compileProvider, $sceDelegateProvider, $locationProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    $locationProvider.html5Mode({
        enabled: false,
        rewriteLinks: false
    });
    // Fjern kommentar på denne før release
    // $compileProvider.debugInfoEnabled(false);

    // For ukjent url, henvis til denne stien.
    $urlRouterProvider.otherwise("/state1");

    // Setter opp forskjellige states for behandling av URLer
    $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "partials/state1.html",
            controller: ['$scope', '$stateParams', '$timeout', '$localStorage', '$http', 'GetData', '$rootScope', function ($scope, $stateParams, $timeout, $localStorage, $http, GetData, $rootScope) {
                $scope.fade = false;
                $timeout(function () {
                    $scope.fade = true;
                }, 250);
            }]
        })
        .state('state2', {
            url: "/state2",
            templateUrl: "partials/state2.html",
            controller: ['$scope', '$stateParams', '$timeout', '$localStorage', '$http', 'GetData', '$rootScope', function ($scope, $stateParams, $timeout, $localStorage, $http, GetData, $rootScope) {
                $scope.fade = false;
                $timeout(function () {
                    $scope.fade = true;
                }, 250);

            }]
        })
        .state('state3', {
            url: "/state3/:id",
            templateUrl: "partials/state3.html",
            controller: ['$scope', '$stateParams', '$timeout', '$localStorage', '$http', 'GetData', '$rootScope', function ($scope, $stateParams, $timeout, $localStorage, $http, GetData, $rootScope) {

                $scope.fade = false;
                $timeout(function () {
                    $scope.fade = true;
                }, 250);
            }]
        })
        .state('state4', {
            url: "/state4",
            templateUrl: "partials/state4.html",
            controller: ['$scope', '$stateParams', '$timeout', '$localStorage', '$http', 'GetData', '$rootScope', function ($scope, $stateParams, $timeout, $localStorage, $http, GetData, $rootScope) {

                $scope.fade = false;
                $timeout(function () {
                    $scope.fade = true;
                }, 250);
            }]
        });

    $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('grey', {
            'default': '800'
        });
    $mdThemingProvider.theme('alt')
        .primaryPalette('orange')
        .accentPalette('green');
}]);

dtoApp.controller('MainCtrl', ['$scope', '$http', '$timeout', '$rootScope', '$state', '$stateParams', '$localStorage', 'GetData', function ($scope, $http, $timeout, $rootScope, $state, $stateParams, $localStorage, GetData) {
    $scope.fade = false;
    $timeout(function () {
        $scope.fade = true;
    }, 250);

    GetData.getFromApi().then(
        function (answer) {
        },
        function (reason) {
        }
    ).finally(function () {
    });

}]);

// Module for getting data as a service, with promise.
angular.module('getData', [])
    .service('GetData', ['$http', '$q', function ($http, $q) {
        var deferObject,
            GetData = {
                getFromApi: function () {
                    var promise = $http.get('DATA', { cache: true }),
                        deferObject = deferObject || $q.defer();
                    promise.then(
                        function (answer) {
                            deferObject.resolve(answer);
                        },
                        function (reason) {
                            deferObject.reject(reason);
                        });
                    return deferObject.promise;
                }
            };
        return GetData;
    }]);