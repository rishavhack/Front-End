var playing = false;
var score = 1;
var action;
var timeremaining;
document.getElementById('startreset').onclick=function () {
	if(playing==true)
	{
		location.reload();
	}
	else
	{
		playing=true;
		document.getElementById('scoreValue').innerHTML=score;
		document.getElementById('startreset').innerHTML="Reset Game";
		document.getElementById('timeremaining').style.display="block"
		timeremaining=60;
		document.getElementById('gameOver').style.display='none';
		document.getElementById('timeremainingvalue').innerHTML=timeremaining;
		startCounter();
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