angular.module('laxaar',['ngRoute'])
	.controller("homeCtrl",homeCtrl)
	.controller("taskCtrl",taskCtrl)
	.controller("loginCtrl",loginCtrl)
	.config(routeConfig)
	.factory("title",title)
	.factory("note",note)

function routeConfig($routeProvider){
  $routeProvider
    .when('/home',{templateUrl:'template/home.html'})
    .when('/task/:taskName',{templateUrl:'template/tasks.html'})
    .when('/login',{templateUrl:'template/loginPage.html'})
    .otherwise({redirectTo:'/login'})
}

function note()
{
	return {}
}
function title()
{
	return [];	
}


function taskCtrl($scope,note,$routeParams)
{
	$scope.index;
	$scope.showButton = true;
   $scope.titleName = $routeParams.taskName;
   $scope.noteTasks = note[$scope.titleName];
   $scope.addNote = function(add)
   {
   		$scope.noteTasks.push(add);
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

function loginCtrl($scope,$location)
{
	$scope.toggleValue =1;
	$scope.signUpValue ={};
	$scope.signInValue={};
	$scope.userDetails=[];

	$scope.toggleTab = function(i)
	{
		$scope.toggleValue =i;
	};
	$scope.signUp = function()
	{
		$scope.userDetails.push($scope.signUpValue);
		$scope.signUpValue={};
		myJSON = JSON.stringify($scope.userDetails);
		localStorage.setItem("details", myJSON);
		window.alert("Succesful..Now logIn");
		$scope.toggleValue=1;
	};
	$scope.logIn = function()
	{
		detail = localStorage.getItem("details");
		obj = JSON.parse(detail);
		var count = 0;
		if(obj)
		{
			for(var i = 0; i< obj.length; i++)
			{
				if($scope.signInValue.email == obj[i].email && $scope.signInValue.password == obj[i].password)
				{
					count++
				}
			}
			if(count == 1)
				{
					window.alert("Succesful login");
					$location.path('/home');
				}
			else
				{
					window.alert("Incorrect");
				}
		}
		else
		{
			window.alert("Nothing Present in dataBase");
			$scope.toggleValue=0;
		}
		$scope.signInValue={};

	}
};
function homeCtrl($scope,title,note)
{
	$scope.index;
	$scope.showButton=true;
	$scope.titleOfnote=title;
	$scope.addTitle = function(add)
	{
		$scope.titleOfnote.push(add);
		note[add]=[];
		$scope.titles ='';
	};
	$scope.editTitle=function(i)
	{
		$scope.index=i;
		$scope.titles = $scope.titleOfnote[i];
		delete note[$scope.titleOfnote[i]];
		$scope.showButton=false;
	};
	$scope.update=function(add)
	{
		$scope.titleOfnote[$scope.index]=add;
		note[add]=[];
		$scope.titles ='';
		$scope.showButton=true;
	};
	$scope.deleteTitle = function(i)
	{
		delete note[$scope.titleOfnote.splice(i,1)];
	};
};