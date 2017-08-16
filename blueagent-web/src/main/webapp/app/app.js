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

       vm.messages_2 = MockMessagesService.beginConversation()[0];
       
       setTimeout(function() {
    	   for (var j=0 ; j<vm.messages_2.length ; j+=1){
    		   vm.messages.push(vm.messages_2[j]);
    	   }console.log(vm.messages);
    	 }, 1500); 
       
       vm.context = MockMessagesService.beginConversation()[1];
//       console.log(vm.context);
         
       vm.sendMessage = function(message) {
           
           console.log('sendMessage');
           //var messagesTmp = vm.messages_2;
          
           vm.messages_2 = MockMessagesService.sendMessagesToRest(message.text, vm.context[0])[0];
//           console.log(messagesTmp[0]);
//           for(var i=0 ; i<messagesTmp.length ; i+=1){
//        	   vm.messages_2.push(messagesTmp[i]);
//           }           
           console.log(vm.messages_2);
           console.log("first length: "+ vm.messages_2.length);
           
           setTimeout(function() {
        	   for (var j=0 ; j<vm.messages_2.length ; j+=1){
        		   vm.messages.push(vm.messages_2[j]);
        	   }console.log(vm.messages);
        	 }, 1500); 
           
           
           
           vm.context = MockMessagesService.sendMessagesToRest(message.text, vm.context[0])[1];
//           console.log(message);
//           console.log(vm.messages);
//           console.log(message.text);
         
       }
       

//       vm.wrapperFn = function(){
//    	       	   console.log("hellooooooooooo");
//       }
        
//       vm.sendMessage = function(message){
//    	   console.log('sendMessage');
//    	   vm.messages = MockMessagesService.sendMessages(message.text);
//       }
//        
        $scope.results= MockMessagesService.getResults();
        
        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });
        
    }

    /* @ngInject */
    function MockMessagesService($http ) {
        this.sendMessagesToRest = sendMessagesToRest;
        this.getResults = getResults;
        this.beginConversation = beginConversation;
   
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
        	 
//        	 console.log(results_array);
        	 return results_array;
        	  }
        
        function beginConversation(){
        	console.log("i am in beginConversation");
        	var tempObject = {
        			"input":{"text":""}
        	},
        	arrayOfContext = [],
        	arrayOfObjects = [],
        	wantedContext,
        	result = $http.post('/blueagent-web/rest/services/conversation', tempObject);
        	
        	result.success(function(data, status, headers, config) {  
        		
    			    	var anotherTempObject = {
            				id: 'BA' + Date.now(),
            				text: data.output.text[0],
            				userId: 'hilsqdhfods5990K226DHS01NOHoh',
            				userName: 'Blue Agent',
            				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            				date: Date.now()
            			}
//    			    	console.log(data.output.text[0]);
    			    	arrayOfObjects.push(anotherTempObject);
    			    	wantedContext = data.context;
    			    	arrayOfContext.push(wantedContext);
//    			    	console.log(data.context);
//    				console.debug(anotherTempObject);
        	});
        	result.error(function(data, status, headers, config) {
    			alert( "failure message: " + JSON.stringify({data: data}));
    		});
//        	console.log(arrayOfObjects);
//        	console.log(arrayOfObjects);
        	return [arrayOfObjects,arrayOfContext];
        }
        
        function sendMessagesToRest(temp, context) {
        	console.log("Tmp: ", temp);
        	var arrayOfObjects = [],
        	arrayOfContext = [],        	
        	tempObject = {
        			"input":{"text":temp},
        			"context": context
        	}, 
        	wantedContext,
//        	tempObject = JSON.stringify({"input":{"text":temp},"context":contextParameter}); 
        	
        	result = $http.post('/blueagent-web/rest/services/conversation', tempObject);
        	
        	result.success(function(data, status, headers, config) {  
        		    			
    			for(var i = 0 ; i < data.output.text.length ; i++){
    				var anotherTempObject = {
    						id: 'BA' + Date.now(),
            				text: data.output.text[i],
            				userId: 'hilsqdhfods5990K226DHS01NOHoh',
            				userName: 'Blue Agent',
            				avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
            				date: Date.now()
            			}
//    				console.debug(anotherTempObject);
        			arrayOfObjects.push(anotherTempObject);
    			}
    			wantedContext = data.context;
    			arrayOfContext.push(wantedContext);
//    			console.log(arrayOfObjects);
        	});
        	
        	result.error(function(data, status, headers, config) {
    			alert( "failure message: " + JSON.stringify({data: data}));
    		});
//        	console.log(arrayOfObjects);
        	return [arrayOfObjects,arrayOfContext];
        	}
        }
})();
