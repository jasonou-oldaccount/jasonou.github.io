app.config(function($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'assets/views/main.htm',
        controller: 'mainController'
    })

    .when('/about', {
        templateUrl: 'assets/views/about.htm',
        controller: 'aboutController'
    })
    
    .when('/portfolio', {
        templateUrl: 'assets/views/portfolio.htm',
        controller: 'portfolioController'
    })
    
    .otherwise({redirectTo: '/'});
});