app.controller('mainController', ['$scope', 'Post', function($scope, Post) {
    
    $scope.posts = Post.get();
    
    $scope.post = { url: 'http://', title: '', description: ''};
    
    $scope.submitPost = function() {
        Post.save($scope.post, function(ref) {
            $scope.posts[ref.name] = $scope.post;
            $scope.post = { url: 'http://', title: '', description: ''};
        });
    }
    
    $scope.deletePost = function(postId) {
        Post.delete({ id:postId}, function() {
            delete $scope.posts[postId];
        });
    }
    
}]);