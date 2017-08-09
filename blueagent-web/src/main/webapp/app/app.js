(function() {
    'use strict';

    angular
        .module('app', [
            'angular-simple-chat'
        ])

    .controller('AppController', AppController)
        .service('MockMessagesService', MockMessagesService);

    /* @ngInject */
    function AppController(MockMessagesService, $scope) {
        var vm = this;
        //this.$scope = $scope;
        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
            userName: 'Anna'
        };

        
       vm.messages = MockMessagesService.getMessages();
       
//       console.debug(vm.messages);
       

        vm.sendMessage = function(message) {
            console.log('sendMessage');
            vm.messages = MockMessagesService.getMessages(message);
            console.debug(message);
        };

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });

        ////////////////
    }

    /* @ngInject */
    function MockMessagesService($http ) {
        this.getMessages = getMessages;
        //this.sendMessages = sendMessages;

        ////////////////
//        function sendMessages(temp){
//        	temp = "";
//        	var tempObject = {
//        			text: temp
//        	},
//        	result = $http.post('/rest/services/conversation?text=temp', tempObject);
//        	
//        	result.success(function(data, status, headers, config) {  
//    			$scope.message = data;
//        	});
//        	
//        	res.error(function(data, status, headers, config) {
//    			alert( "failure message: " + JSON.stringify({data: data}));
//    		});
//        }

        function getMessages(temp) {
        	temp = "";
        	var arrayOfObjects = [];
        	var tempObject = {
        			text: temp
        	},
        	result = $http.get('/blueagent-web/rest/services/conversation?text=temp', tempObject);
        	
        	result.success(function(data, status, headers, config) {  
        		
    			console.debug(data.output.text);
    			
    			for(var i = 0 ; i < data.output.text.length ; i++){
    				var anotherTempObject = {
            				id: '535d625f898df4e80e2a125e',
            				text: data.output.text[i],
            				userId: 'hilsqdhfods5990K226DHS01NOHoh',
            				userName: 'Blue Agent',
            				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            				date: Date.now()
            			}
        			arrayOfObjects.push(anotherTempObject);
    			}
    			console.debug(arrayOfObjects);
//    			vm.messages= arrayOfObjects;
    			
        	});
        	result.error(function(data, status, headers, config) {
    			alert( "failure message: " + JSON.stringify({data: data}));
    		});
        	return arrayOfObjects;
        	}
        }
})();

//var emptyStr = "";
//$http.get('/rest/services/conversation?text=emptyStr').
//then(function(response){
//	$scope.tempResult = response.data;
//	var anotherTempObject = {
//			id: '535d625f898df4e80e2a125e',
//			text: tempResult.output.text,
//			userId: 'hilsqdhfods5990K226DHS01NOHoh',
//			userName: 'Blue Agent',
//			avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
//			date: Date.now()
//		}
//	return anotherTempObject;


//angular
//.module('recieve', ['angular-simple-chat']) 
//.controller(recieveCtrl, function($scope, $http){
//	var emptyStr = '';
//	$http.get('/rest/services/conversation?text=emptyStr')
//	.then(function(response){
//		$scope.result = response.data;
//		var	message = {
//				id: '535d625f898df4e80e2a125e',
//				text: result.output.text,
//				userId: 'hilsqdhfods5990K226DHS01NOHoh',
//				userName: 'Blue Agent',
//				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
//				date: Date.now()
//			}
//		this.messages.push(message);
//	})
//})

//
//$scope._sendConversation= function(){
//	if (!angular.isDefined(that.rawmessage)) {
//      return;
//  }
//  var _message = {
//      text: that.rawmessage
//  };
//  var res = $http.post('/rest/services/conversation?text=that.rawmessage', _message);
//	res.success(function(data, status, headers, config) {  
//		$scope.message = data;
//	});
//	res.error(function(data, status, headers, config) {
//		alert( "failure message: " + JSON.stringify({data: data}));
//	});	
//	return response.data.output;
//	// Make fields empty...??!! or they already will be empty in _sendFX().......................??
//};
