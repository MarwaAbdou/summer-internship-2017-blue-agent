angular
    .module('angular-simple-chat.directives')
    .directive('rest', rest);

/* @ngInject */
function rest() {
    var directive = {
        bindToController: true,
        controller: restController,
        controllerAs: 'rc',
        link: link,
        restrict: 'AE',
        require: ['^simpleChat', 'rest'],
    };
    return directive;

    function link(scope, element, attrs, controllers) {
        var simpleChatCtrl = controllers[0],
        restController = controllers[1];

        restController.sendFunction = simpleChatCtrl.sendFunction;
        restController.options = simpleChatCtrl.options;
        restController.messages = simpleChatCtrl.messages;
        restController.liveFlagFunction = simpleChatCtrl.liveFlagFunction;
    }
}

/* @ngInject */
function restController($scope,$http) {
	 $http.get('http://rest-service.guides.spring.io/greeting').
     then(function(response) {
         $scope.rawmessage = response.data;
     }
    var that = this,
        resetLiveLastMessageReference = false,
        _sendFx = function() {
            if (!angular.isDefined(that.rawmessage.content)) {
                return;
            }
            var _message = {
                id: 'sc' + Date.now(),
                type: 'message',
                text: that.rawmessage.content,
                userId: '535d625f898df4e80e2a125e',
                avatar: 'http://polyligne.be/wp-content/uploads/2014/06/Man_Avatar.gif',
                userName: 'Blue Agent',
                date: Date.now()
            };
            if (that.options.liveMode && angular.isDefined(that.liveFlagFunction) && that.rawmessage.content.length === 1) {
                that.liveFlagFunction({
                    id: 'sc' + Date.now(),
                    type: 'flag',
                    userId: '535d625f898df4e80e2a125e',
                    label: 'startSentence'
                });
            }
            if (!resetLiveLastMessageReference) {
                that.sendFunction(_message);
            }
            if (that.options.liveMode && !resetLiveLastMessageReference) {
                if (that.messages.length === 0) {
                    that.messages.push(_message);
                } else {
                    if (that.rawmessage.content.length === 1) {
                        that.messages.push(_message);
                    } else {
                        that.messages[that.messages.length - 1] = _message;
                    }
                }
            } else if (that.options.liveMode && resetLiveLastMessageReference) {
                resetLiveLastMessageReference = false;
                that.rawmessage.content = '';
                that.liveFlagFunction({
                    id: 'sc' + Date.now(),
                    type: 'flag',
                    userId: '535d625f898df4e80e2a125e',
                    label: 'endSentence'
                });
            } else {
                that.messages.push(_message);
            }
            $scope.$emit('simple-chat-message-posted');
            if (!that.options.liveMode) {
                that.rawmessage.content = '';
            }
        };
    this._send = function() {
        if (this.options.liveMode) {
            resetLiveLastMessageReference = true;
        }
        _sendFx();
    };
    this._onKeyUp = function() {
        if (this.options.liveMode) {
            _sendFx();
        }
    };
}
