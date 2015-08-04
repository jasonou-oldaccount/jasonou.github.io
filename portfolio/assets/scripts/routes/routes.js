app.config(function($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'assets/views/landing.htm',
        controller: 'landingController'
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