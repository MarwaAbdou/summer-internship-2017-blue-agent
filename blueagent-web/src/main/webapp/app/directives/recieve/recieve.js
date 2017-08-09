//angular
//    .module('angular-simple-chat.directives') //should i make directive here to be able to use "messages"............?!
//    .controller(recieveCtrl, function($scope, $http){
//    	var emptyStr = '';
//    	$http.get('/rest/services/conversation?text=emptyStr').
//    	then(function(response){
//    		$scope.result = response.data;
//    	})
//    	var object = JSON.parse(result),
//    			message = {
//    				id: '535d625f898df4e80e2a125e',
//    				text: object.output.text,
//    				userId: 'hilsqdhfods5990K226DHS01NOHoh',
//    				userName: 'Blue Agent',
//    				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
//    				date: Date.now()
//    			}
//    		sc.messages.push(message);
//    })

/////or
    
    
//    angular
//    	.module('recieve', ['angular-simple-chat']) 
//    	.controller(recieveCtrl, function($scope, $http){
//    		var emptyStr = '';
//    		$http.get('/rest/services/conversation?text=emptyStr')
//    		.then(function(response){
//    			$scope.result = response.data;
//    			var	message = {
//        				id: '535d625f898df4e80e2a125e',
//        				text: result.output.text,
//        				userId: 'hilsqdhfods5990K226DHS01NOHoh',
//        				userName: 'Blue Agent',
//        				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
//        				date: Date.now()
//        			}
//        		this.messages.push(message);
//    		})
//    	})