app.controller('landingController', ['$scope', function($scope) {
    
    // Typed.js
    $(function(){
        $(".headline").typed({
            strings: ["^2000 name: 'Jason Ou'<br> ^1000 description: 'Web Developer &amp; Student Researcher'<br> ^1000 message: 'Welcome to my website porfolio!'"],
            typeSpeed: 0,
            showCursor: true,
        });
    });
    
    
}]);