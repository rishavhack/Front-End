var playing = false;
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
}