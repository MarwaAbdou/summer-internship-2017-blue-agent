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
		   MockMessagesService.sendMessagesToRest(null,null,vm);
		  
		   vm.sendMessage = function(message) {
		       MockMessagesService.sendMessagesToRest(message.text, vm.context,vm);
		   }
		   
		    
		$scope.$on('simple-chat-message-posted', function() {
			console.log('onMessagePosted');
		});
        
    }

    /* @ngInject */
    function MockMessagesService($http) {
    	this.getResults = getResults;
    	this.sendMessagesToRest = sendMessagesToRest;
    	
        function getResults(query,appController){
        	 var results_var = $http.get('/blueagent-web/rest/services/discovery?query='+query);
        	 results_var.success(function(data, status, headers, config){
        		 appController.results = data;
        		 appController.context.SEARCH_COUNT = data.length;
        		 sendMessagesToRest("SearchResults",appController.context,appController);
        	 });	
        	 results_var.error(function(data, status, headers, config) {
     			alert( "failure message: " + JSON.stringify({data: data}));
         	 });
        }
        
        function sendMessagesToRest(textInput, context,appController) {
        	console.log("textInput: ", textInput);	
            var msg = {
        			"input":{"text":textInput},
        			"context": context
        	},
        	result = $http.post('/blueagent-web/rest/services/conversation', msg);
        	
        	result.success(function(data, status, headers, config) {  
        		    			
    			for(var i = 0 ; i < data.output.text.length ; i++){
    				if (data.output.text[i] != ""){
	    				var anotherTempObject = {
	    						id: 'BA' + Date.now(),
	            				text: data.output.text[i],
	            				userId: 'hilsqdhfods5990K226DHS01NOHoh',
	            				userName: 'Blue Agent',
	            				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
	            				date: Date.now()
	            			}
	    				console.debug(anotherTempObject);
	    				appController.messages.push(anotherTempObject);
    				}
    			}
    			appController.context = data.context;
    			if (appController.context.ACTION == "SearchWDS"){
    				appController.context.ACTION = "";
    				getResults(appController.context.SEARCH_TERM,appController);
    			}
        	});
        	
        	result.error(function(data, status, headers, config) {
    			alert( "failure message: " + JSON.stringify({data: data}));
    		});
        }
    }
})();
