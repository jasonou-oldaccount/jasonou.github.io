app.factory('Post', function($resource) {
    return $resource('https://jo-reddit-clone.firebaseio.com//posts/:id.json');
})