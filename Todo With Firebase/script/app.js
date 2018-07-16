angular.module('laxaar',['ngRoute','firebase'])
	.controller("homeCtrl",homeCtrl)
	.controller("taskCtrl",taskCtrl)
	.controller("loginCtrl",loginCtrl)
	.config(routeConfig)
	.factory("title",title)
	.factory("note",note)
	.factory("uid",uid)


function routeConfig($routeProvider){
  $routeProvider
    .when('/home',{templateUrl:'template/home.html'})
    .when('/task/:taskName',{templateUrl:'template/tasks.html'})
    .when('/login',{templateUrl:'template/loginPage.html'})
    .otherwise({redirectTo:'/login'})
}
function uid()
{
	return {};
}
function note()
{
	return {}
}
function title()
{
	return [];	
}


function taskCtrl($scope,note,$routeParams,$firebaseArray,uid)
{
   var ref = firebase.database().ref(uid.id);
   var messagesRef = ref.child($routeParams.taskName);
   $scope.index;
   $scope.showButton = true;
   $scope.noteTasks = $firebaseArray(messagesRef);
   $scope.addNote = function(add)
   {
   		$scope.noteTasks.$add(add);
   		$scope.noteDetails="";
   };
   $scope.editTitle = function(i)
   {
   		$scope.index = i;
   		$scope.noteDetails = $scope.noteTasks[i];
   		$scope.showButton = false;
   };
   $scope.update = function(add)
   {
	   	$scope.noteTasks[$scope.index]=add
	   	$scope.noteDetails="";
	   	$scope.showButton = true;
   }
   $scope.deleteTitle = function(i)
   {
  	   $scope.noteTasks.splice(i,1);
   }
}

function loginCtrl($scope,$location,$firebaseAuth,$firebaseArray,uid)
{
	$scope.add = function()
	{
		var auth = $firebaseAuth();
		auth.$signInWithPopup("google").then(function(result) {
			  console.log("Signed in as:", );
			  console.log(typeof(result.user.uid))
			  uid['id']=result.user.uid;
			  $location.path('/home');
			}).catch(function(error) {
			  console.error("Authentication failed:", error);
			});
	}
			
};
function homeCtrl($scope,$firebaseArray,$firebaseObject,$location,uid)
{
	var ref = firebase.database().ref(uid.id);
	var messagesRef = ref.child('todoList');
	$scope.index;
	$scope.showButton=true;
	$scope.titleOfnote=$firebaseArray(messagesRef);
	$scope.addTitle = function(add)
	{
		$scope.titleOfnote.$add(add);
		$scope.titles ='';
	};
	$scope.editTitle=function(i)
	{
		$scope.index=i;
		$scope.titles = $scope.titleOfnote[i].$value;
		$scope.showButton=false;
	};
	$scope.update=function(add)
	{
		$scope.titleOfnote[$scope.index].$value=add;
		$scope.titleOfnote.$save($scope.index);
		$scope.titles ='';
		$scope.showButton=true;
	};
	$scope.deleteTitle = function(i)
	{
		firebase.database().ref(uid.id).child($scope.titleOfnote[i].$value).remove();
		$scope.titleOfnote.$remove($scope.titleOfnote[i]);
	};
};