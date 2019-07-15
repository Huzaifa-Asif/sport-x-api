var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller:'StocksController',
        templateUrl:'views/stocks.html'
    })

    .when('/stocks', {
        controller:'StocksController',
        templateUrl:'views/stocks.html'
    })

    .when('/stocks/details/:id',{

        controller:'StocksController',
        templateUrl:'views/stock_details.html'
    })

   .when('/stock/add',{

        controller:'StocksController',
        templateUrl:'views/add_stock.html'
    })

    .when('/stock/edit/:id',{

        controller:'StocksController',
        templateUrl:'views/edit_stock.html'
    })

    .when('/stock/delete/:id',{

        controller:'StocksController',
        templateUrl:'views/stock.html'
    })

    // Demand Routes

    .when('/demands',{

        controller:'DemandsController',
        templateUrl:'views/demand.html'
    })

    .when('/demand/details/:id',{

        controller:'DemandsController',
        templateUrl:'views/demand_detail.html'
    })

    .when('/demand/add',{

        controller:'DemandsController',
        templateUrl:'views/add_demand.html'
    })

    .when('/demand/edit/:id',{

        controller:'DemandsController',
        templateUrl:'views/edit_demand.html'
    })

    // Else it will be redirected to Home
    .otherwise({

        redirectTo: '/'

    });

})