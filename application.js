
$(document).ready(function() {
	var answer = Math.floor(Math.random()*100) + 1;
	$('.answer').text(answer);
	var guesses = 5;
	var arrayOfGuesses = [];

	$('#homeMenu').on('click', function(){
		$('.gamePlayScene').hide();
		$('.mainMenuScene').show();
		
		//reload page
		location.reload();
	});
	
	$('#playButton').on('click', function(){
		$('.gamePlayScene').show();
		$('.mainMenuScene').hide();
	});
	
	$('.btn-success').on('click', function(){//give a hint
		alert("THE ANSWER IS " + answer);
	});
	
	$('.btn-primary').on('click', function(event){//submit an input
		event.preventDefault();
				
		var currentGuess = $('#numberInput').val();
		
		if(currentGuess > 100 || currentGuess < 1){
			$('.hotterLabel').hide();
			$('.colderLabel').hide();
			$('.messageLabel').show();
			$('.messageLabel').text('MUST CHOOSE FROM 1-100');
			return
		}
			
		if(currentGuess == answer){//win scene
			$('.hotterLabel').hide();
			$('.colderLabel').hide();
			$('.list-inline').hide();
			$('.inputContainer').hide();
			$('.answer').show();
			$('.messageLabel').show();
			$('.messageLabel').text('YOU WIN!');
			$('#homeMenu').show();
			$('.temperatureBarContainer').hide();
			
			$('.messageLabel').css({ 'color': 'red', 'font-size': '1000%' });
			
			$('.gamePlayScene').css('background-image', 'url(' + 'images/smiley.png' + ')');
			
			
			return;
		}
		
		//if number inputed previuosly
		for(var i=0; i<arrayOfGuesses.length; i++){
			if(currentGuess == arrayOfGuesses[i]){
				$('.hotterLabel').hide();
				$('.colderLabel').hide();
				$('.messageLabel').show();
				$('.messageLabel').text('YOU ALREADY GUESSED THAT');
				return;
			}
		}
		
		var end;
		
		if(Math.abs(currentGuess-answer)<5)
			end = 5;
		else if(Math.abs(currentGuess-answer)<15)
			end = 4;
		else if(Math.abs(currentGuess-answer)<30)
			end = 3;
		else if(Math.abs(currentGuess-answer)<60)
			end = 2;
		else
			end = 1;

		
		for(var i = 1; i<end+1; i++){
			var str = '.section' + i;
			if ($(str).css('display') == 'none' ){
				$(str).show();
			}
		}
		
		for(var i = end+1; i<5+1; i++){
			var str = '.section' + i;
			
			if ($(str).css('display') != 'none' ){
				$(str).hide();
			}
		}
		
		
		arrayOfGuesses.push(currentGuess);
		guesses = guesses - 1;
		$('.badge').text(guesses);
		
		if(arrayOfGuesses.length == 1){
			$('.messageLabel').text('TRY AGAIN');
			return;
		}
		
		
		var prevGuess = arrayOfGuesses[arrayOfGuesses.length-2];
		

		if(Math.abs(prevGuess-answer) > Math.abs(currentGuess-answer)){
			$('.hotterLabel').show();
			$('.colderLabel').hide();
			$('.messageLabel').hide();
		}
		else{
			$('.hotterLabel').hide();
			$('.colderLabel').show();
			$('.messageLabel').hide();
		}
		
		if(guesses == 0){//lose scene
			$('.hotterLabel').hide();
			$('.colderLabel').hide();
			$('.list-inline').hide();
			$('.inputContainer').hide();
			$('.answer').show();
			$('.messageLabel').show();
			$('.messageLabel').text('YOU LOSE!');
			$('#homeMenu').show();
			$('.temperatureBarContainer').hide();
			$('.smileyImgage').prepend($('<img>',{id:'sadFace',src:'images/sadSmiley.png'}))
			$('.smileyImgage').show();
			return;
		}		
	});
});