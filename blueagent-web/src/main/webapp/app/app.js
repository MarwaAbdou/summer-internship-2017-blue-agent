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
        
        $scope.results= MockMessagesService.getResults();
        console.debug($scope.results);
        
        vm.you = {
            userId: '4562KDJYE72930DST283DFY202Dd',
            avatar: 'http://www.freelanceweb16.fr/wp-content/uploads/2015/08/Woman_Avatar.gif',
            userName: 'Anna'
        };

       vm.messages = MockMessagesService.sendMessages();
              
        vm.sendMessage = function(message) {
            console.log('sendMessage');
            vm.messages = MockMessagesService.sendMessages(message.text);
            console.debug(message);
        };

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });
        
    }

    /* @ngInject */
    function MockMessagesService($http ) {
        this.sendMessages = sendMessages;
        this.getResults = getResults;
        
        function getResults(){
        	var results = [];
        	 $http.get('/blueagent-web/rest/services/discovery?query=chatbot').
        	    then(function(response) {
        	    	results = response.data;})
        	    	
        	    	return results;
        	    }
        
        function sendMessages(temp) {
        	temp = "";
        	var arrayOfObjects = [];
        	var tempObject = {
        			text: temp
        	},
        	result = $http.post('/blueagent-web/rest/services/conversation?text={"input":{"text":"text"},"context":"contextString"}', tempObject);
        	
        	result.success(function(data, status, headers, config) {  
        		
    			
    			for(var i = 0 ; i < data.output.text.length ; i++){
    				var anotherTempObject = {
            				id: '535d625f898df4e80e2a125e',
            				text: data.output.text[i],
            				userId: 'hilsqdhfods5990K226DHS01NOHoh',
            				userName: 'Blue Agent',
            				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            				date: Date.now()
            			}
    				console.debug(anotherTempObject);
        			arrayOfObjects.push(anotherTempObject);
    			}
    			console.debug(arrayOfObjects);
    			
        	});
        	result.error(function(data, status, headers, config) {
    			alert( "failure message: " + JSON.stringify({data: data}));
    		});
        	console.debug(arrayOfObject);
        	return arrayOfObjects;
        	}
        }
})();
