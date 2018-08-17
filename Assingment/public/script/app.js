angular.module('appTask',['ngRoute','ngMaterial', 'ngMessages','firebase'])
	.controller("homeCtrl",homeCtrl)
	.controller("taskCtrl",taskCtrl)
	.config(routeConfig)


function routeConfig($routeProvider){
  $routeProvider
    .when('/home',{templateUrl:'template/home.html'})
    .when('/tasks',{templateUrl:'template/tasks.html'})
    .otherwise({redirectTo:'/home'})
}

function homeCtrl($scope,$firebaseAuth,$mdToast,$location){
	$scope.formValue = true;
	$scope.loaderValue = false;
	$scope.signIn = {};
	$scope.signUp = {};
	var auth = $firebaseAuth();
	$scope.toggle = function (x)
	{
		$scope.formValue = x;
	}
	$scope.googleLogin = function()
	{
		$scope.loaderValue = true;
		auth.$signInWithPopup("google").then(function(result) {
			  console.log("Signed in as:", result.user.uid);
			  localStorage.setItem("UID", JSON.stringify(result.user.uid));
			  $mdToast.show($mdToast.simple().textContent('Login successfully!!'));
			  $location.path('/tasks');
			  $scope.loaderValue = false;
			}).catch(function(error) {
			  console.error("Authentication failed:", error);
			  $mdToast.show($mdToast.simple().textContent(error.message));
			  $scope.loaderValue = false;
			});
	}
	$scope.signUpDetails = function()
	{
		$scope.loaderValue = true;
		auth.$createUserWithEmailAndPassword($scope.signUp.Email,$scope.signUp.password)
			  .then(function(firebaseUser) {
			    console.log("User created successfully!");
			    $mdToast.show($mdToast.simple().textContent('Created successfully!! Please Login'));
			    $scope.signUp = {};
			    $scope.formValue=false;
			     $scope.loaderValue = false;
			  }).catch(function(error) {
			    console.error("Error: ", error);
			    $mdToast.show($mdToast.simple().textContent(error.message));
			     $scope.loaderValue = false;
			  });
	}
	$scope.signInDetails = function()
	{
		 $scope.loaderValue = true;
		auth.$signInWithEmailAndPassword($scope.signIn.Email,$scope.signIn.password).then(function(firebaseUser) {
			  console.log("Signed in as:", firebaseUser.user.uid);
			  localStorage.setItem("UID", JSON.stringify(firebaseUser.user.uid));
			   $mdToast.show($mdToast.simple().textContent('Login successfully!!'));
			   $location.path('/tasks');
			    $scope.loaderValue = false;
			}).catch(function(error) {
			  console.error("Authentication failed:", error);
			  $mdToast.show($mdToast.simple().textContent(error.message));
			   $scope.loaderValue = false;
			});
	}
}

function taskCtrl($scope,$firebaseArray,$mdToast,$location)
{
	if(JSON.parse(localStorage.getItem("UID")))
	{
		var ref = firebase.database().ref(JSON.parse(localStorage.getItem("UID")));

		$scope.listValue = $firebaseArray(ref);
	}
	else
	{
		$location.path('/home')
	}
	
	$scope.obj = {};
	$scope.toggleValue=true;
	$scope.showDarkTheme = false;
	var index;
	$scope.add = function()
	{
		if($scope.obj.title && $scope.obj.detail)
		{
			$scope.listValue.$add($scope.obj);
			$scope.obj = {};
		}
		else
		{
			$mdToast.show($mdToast.simple().textContent('Enter Value'));
		}
	}
	$scope.edit = function(i)
	{
		index = i;
		$scope.obj = $scope.listValue[i];
		$scope.toggleValue = false;
	}
	$scope.delete = function(i)
	{
		if(confirm("Are you sure"))
		{
			$scope.listValue.$remove($scope.listValue[i]);
		}
		else
		{
			return;
		}
	}
	$scope.update = function()
	{
		$scope.listValue.$value = $scope.obj;
		$scope.listValue.$save(index);
		$scope.obj = {};
		$scope.toggleValue = true;
	}
}