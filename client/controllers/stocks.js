var myApp = angular.module('myApp');

myApp.controller('StocksController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('StocksController Loaded...')
    
    $scope.getStocks = function(){
        $http.get('/api/stocks').success(function(response){
            $scope.stocks= response;
        });
    }

    $scope.getStock = function(){
        var id = $routeParams.id;
        $http.get('/api/stocks/'+id).success(function(response){
            $scope.stock= response;
        });
    }

    $scope.addStock = function(){
        $http.post('/api/stocks/', $scope.stock).success(function(response){
            window.location.href="#/stocks"
        });
    }

    $scope.updateStock = function(){
        var id = $routeParams.id;
        $http.put('/api/stocks/'+id, $scope.stock).success(function(response){
            window.location.href="#/stocks"
        });
    }

    $scope.removeStock = function(id){
        $http.delete('/api/stocks/'+id).success(function(response){
            window.location.href="#/stocks"
        });
    }
}]);