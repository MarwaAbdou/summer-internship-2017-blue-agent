var app = module("resultApp", []);
app.factory('myService',function($resource){

    return $resource('',{},{

           query:{
        	   
                  method:'GET',

                  params:{},

                  isArray:true
           }
    });
    
});

app.controller("appCtrl",['myService','$scope', function(myService, $scope){
	myService.query(function(myService){
		$scope.response=myService
	})
}])