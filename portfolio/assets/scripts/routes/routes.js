app.config(function($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'assets/views/home.htm',
        controller: 'homeController'
    })

    .when('/about', {
        templateUrl: 'assets/views/about.htm',
        controller: 'aboutController'
    })

    .when('/built', {
        templateUrl: 'assets/views/built.htm',
        controller: 'builtController'
    })
    
    .when('/connect', {
        templateUrl: 'assets/views/connect.htm',
        controller: 'connectController'
    })
    
    .when('/didyouknow', {
        templateUrl: 'assets/views/didyouknow.htm',
        controller: 'didyouknowController'
    })
    .otherwise({redirectTo: '/'});
});