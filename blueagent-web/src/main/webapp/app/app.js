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
            userName: 'Anna'
        };

        vm.messages = MockMessagesService.getMessages();

        vm.sendMessage = function(message) {
            console.log('sendMessage');
        };

        $scope.$on('simple-chat-message-posted', function() {
            console.log('onMessagePosted');
        });

        ////////////////
    }

    /* @ngInject */
    function MockMessagesService() {
        this.getMessages = getMessages;

        ////////////////

        function getMessages() {
            return [{
                id: '535d625f898df4e80e2a125e',
                text: 'Hello Anna, I am here to guide you in Bluemix.',
                userId: 'hilsqdhfods5990K226DHS01NOHoh',
                userName: 'Blue Agent',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                date: Date.now()
            }, {
                id: '535f13ffee3b2a68112b9fc0',
                text: 'Hello Blue Agent.',
                userId: '4562KDJYE72930DST283DFY202Dd',
                date: Date.now()
            }]
        }
    }

})();
