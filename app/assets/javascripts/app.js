angular.module('hackerNews', ['ui.router', 'templates', 'Devise'])
	.config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'home/_home.html',
					controller: 'MainCtrl',
					resolve: {
						postPromise: ['posts', function(posts) {
							return posts.getAll();
						}]
					}
				})
				.state('posts', {
					url: '/posts/{id}',
					templateUrl: 'posts/_posts.html',
					controller: 'PostsCtrl',
					resolve: {
						post: ['$stateParams', 'posts', function($stateParams, posts) {
							return posts.get($stateParams.id);
						}]
					}
				});

			$urlRouterProvider.otherwise('home');
}])
 .directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if(value && !/^(http):\/\//i.test(value)
                   && 'http://'.indexOf(value) === -1) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.push(ensureHttpPrefix);
        }
    };
});