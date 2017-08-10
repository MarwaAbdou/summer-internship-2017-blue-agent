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
        
        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
            userName: 'User'
        };

       vm.messages = MockMessagesService.sendMessages("");
       console.log(vm.messages);
       vm.sendMessage = function(message) {
           
           console.log('sendMessage');
//           console.log(message);
           console.log(vm.messages);
//           console.log(message.text);
           return message.text;
       }
       console.log("VM: ", vm.sendMessage);
        vm.messages = MockMessagesService.sendMessages(vm.sendMessage);
       
//       vm.sendMessage = function(message){
//    	   console.log('sendMessage');
//    	   vm.messages = MockMessagesService.sendMessages(message.text);
//       }
//        
        $scope.results= MockMessagesService.getResults();
//        $scope.show = true;
//        if($scope.resutls.length === 0){
//        	$scope.show = false;
//        }
        
        console.log($scope.results);

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });
        
    }

    /* @ngInject */
    function MockMessagesService($http ) {
        this.sendMessages = sendMessages;
        this.getResults = getResults;
        
   
        function getResults(){
        	var results_array = [];
        	var _tempObject = {
        			query: "chatbot"
        	},
        	 results_var = $http.get('/blueagent-web/rest/services/discovery?query=chatbot', _tempObject);
        	 results_var.success(function(data, status, headers, config){
        		 for (var j = 0 ; j < data.length ; j++){
        			 results_array.push(data[j]);
        		 }
        	 });	
        	 results_var.error(function(data, status, headers, config) {
     			alert( "failure message: " + JSON.stringify({data: data}));
         		});
        	 
        	 console.log(results_array);
        	 return results_array;
        	  }
        
        function sendMessages(temp) {
        	console.log("Tmp: ", temp);
        	var arrayOfObjects = [];
        	var tempObject = {
        			text: temp
        	},
        	result = $http.get('/blueagent-web/rest/services/conversation?text=temp', tempObject);
        	
        	result.success(function(data, status, headers, config) {  
        		
    			
    			for(var i = 0 ; i < data.WCSResponse.output.text.length ; i++){
    				var anotherTempObject = {
            				id: '535d625f898df4e80e2a125e',
            				text: data.WCSResponse.output.text[i],
            				userId: 'hilsqdhfods5990K226DHS01NOHoh',
            				userName: 'Blue Agent',
            				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            				date: Date.now()
            			}
    				console.debug(anotherTempObject);
        			arrayOfObjects.push(anotherTempObject);
    			}
    			console.log(arrayOfObjects);
        	});
        	result.error(function(data, status, headers, config) {
    			alert( "failure message: " + JSON.stringify({data: data}));
    		});
        	console.log(arrayOfObjects);
        	return arrayOfObjects;
        	}
        }
})();
