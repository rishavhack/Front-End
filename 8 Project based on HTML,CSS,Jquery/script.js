var playing = false;
var score;
var trailsLeft;
var step;
var action;
var fruits = ['1','2','3','4','5','6','7','8','9'];
$(function(){
	$("#startreset").click(function(){
		if(playing==true)
		{
			location.reload();
		}
		else
		{
			playing=true;
			score=0;
			$("#scoreValue").html(score);

			$("#trailsLeft").show();
			trailsLeft=3;
			addHearts();
			$("#startreset").html("Reset Game")
			
			startAction();
		}
	});
});


function addHearts()
{
	$("trailsLeft").empty();
	for(i=0;i<trailsLeft;i++)
			{
				$("#trailsLeft").append('<img src="images/heart.png" class="life">');
			}
}

function startAction()
{
	$("#fruit1").show();
	chooseFruit(); //choose a random fruit
	$("#fruit1").css({'left' :Math.round(475*Math.random()),'top':-50});
	//random position
		//generate a random step
			step =1 + Math.round(5*Math.random());
	//change the step

	//move fruit down by one step every 10ms
	action = setInterval(function(){
		$("#fruit1").css('top',$("#fruit1").position().top + step)
		
		//Check if fruit is too low
		if($("#fruit1").position().top>$("fruitsContainer").height())
		{
			//check if we have trails left
			if(trailsLeft > 1)
			{
				$("#fruit1").show();
				chooseFruit(); //choose a random fruit
				$("#fruit1").css({'left' :Math.round(475*Math.random()),'top':-50});
				//random position
					//generate a random step
				step =1 + Math.round(5*Math.random());
	 			
	 			//Reduce trails by 1
	 			trailsLeft--;
	 			//populate trailsLeft box
	 			addHearts();
			}
			else //gameover
			{
				playing = false; //we are not playing anymore
				$("#startreset").html("Start Game");
				$("#gameover").show();
				$("#gameover").html('<p>Game Over!</p><p>You score is '+ score +'</p>')
				stopAction();
			}
		}
	},10);
	
}
//stop dropping fruits
function stopAction()
{
	clearInterval(action);
	$("#fruit1").hide();
}

function chooseFruit()
{
	$("#fruit1").attr('src' , 'images/'+fruits[Math.round(8*Math.random())]+'.png')
}
















/*var playing = false;
var score = 0;
var action;
var timeremaining;
var correctAnswer;
document.getElementById('startreset').onclick=function () {
	if(playing==true)
	{
		location.reload();
	}
	else
	{
		playing=true;
		score=0;
		document.getElementById('scoreValue').innerHTML=score;
		document.getElementById('startreset').innerHTML="Reset Game";
		document.getElementById('timeremaining').style.display="block"
		timeremaining=60;
		document.getElementById('gameOver').style.display='none';
		document.getElementById('timeremainingvalue').innerHTML=timeremaining;
		startCounter();
		generateQA();
	}
}
function startCounter()
{
	action = setInterval(function()
		{
			timeremaining -=1;
			document.getElementById('timeremainingvalue').innerHTML=timeremaining
			if(timeremaining == 0)
			{
				stopCounter();
				document.getElementById('gameOver').style.display='block';
				document.getElementById('gameOver').innerHTML='<p>Game Over</p><p>Your Score is '+score+'</p>';
				document.getElementById('timeremaining').style.display='none';
				playing=false;
				document.getElementById('startreset').innerHTML="Start Game";
			}

		},1000)
}
function stopCounter()
{
	clearInterval(action);
}
function generateQA()
{
	var x = 1+Math.round(9*Math.random());
	var y = 1+Math.round(9*Math.random());
	correctAnswer = x * y ;
	document.getElementById('question').innerHTML=x+'x'+y;
	var position = 1+Math.round(3*Math.random());
	document.getElementById('box'+position).innerHTML=correctAnswer;
	var answers = [correctAnswer];
	for(i=1;i<5;i++)
	{
		if(i!=position)
		{
			var wrongAnswer;
			do
			{
			wrongAnswer=(1+Math.round(9*Math.random()))*(1+Math.round(9*Math.random()));
			}
			while(answers.indexOf(wrongAnswer)>-1)
			document.getElementById('box'+i).innerHTML=wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}
for(i=1;i<5;i++)
{
document.getElementById('box'+i).onclick=function()
{
	if(playing==true)
	{
		if(this.innerHTML==correctAnswer)
		{
			score++;
			document.getElementById('scoreValue').innerHTML=score;
			document.getElementById('correct').style.display='block';
			setTimeout(function(){
				document.getElementById('correct').style.display='none';
			},1000);
			generateQA();
		}
		else
		{
			document.getElementById('wrong').style.display='block';	
			setTimeout(function(){
				document.getElementById('wrong').style.display='none';
			},1000);
		}
	}
}
}*/