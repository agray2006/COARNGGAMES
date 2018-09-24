/* - BASE HTML TEMPLATE
------------------------------------------------- 
	Description: JS Scripts
	Author:Shane Prendergast
	Author URL:http://www.webknit.co.uk
	Template URL:http://base.webknit.co.uk/
*/

// JS EXAMPLE

var WWTBAM = WWTBAM || {};

WWTBAM.Game = function()
{	
	// Here's our array of questions in the following format :
	// [question, potential answers, answer, money]
	questions = [
	 ['Out of the 50 states, Colorado joined chronologically as what number?',['30th','32nd','35th','38th'] ,'38th', 0],
	 ['LTC William R. Grove is the only official Medal of Honor recipient from the Colorado National Guard. In what War did he earn his medal?', ['Indian Wars', 'WWI', 'Spanish-American War', 'WWII'],'Spanish-American War', 100],
     ['Name the first unit from the CONG to serve in Afghanistan after 9/11.', ['220th MP CO', '193rd MP BN', '5/19th SFG(A)', '101st Army Band'],'5/19th SFG(A)', 200],
     ['Name the Civil War battle where Colorado and New Mexico troops engaged with Texas Confederates in 1862 outside of Sante Fe.', ['Battle of Poncha Springs', 'Battle of Glorieta Pass', 'Battle of Raton Pass', 'Battle of Milk Creek'],'Battle of Glorieta Pass', 300],
     ['Who was the first Governor of the Territory of Colorado?', ['Gilpin', 'Evans', 'Romer', 'Buchtel'],'Gilpin', 500],
     ['How many beach landings did Colorados 157th Infantry Regiment make during WWII?',['Five','Two','Three','Four'] ,'Four', 1000],
     ['In 1937 hundreds of CONG troops are put on State Active Duty to help against an invasion in the state. An invasion of what?',['Bees','Mosquitos','Locusts','Wolverines'] ,'Locusts', 2000],
     ['Frank D. Baldwin, Colorados Adjutant General in 1906, was awarded the Medal of Honor twice. How many men in the history of the US military have received the MOH twice?',["fourteen","seventeen","nineteen","twenty-three"],"nineteen", 4000],
     ['In 1929, the CONG is called up as a riot erupts, killing 8 guards and 5 inmates, at the State Penitentiary in this Colorado town.', ['Canon City', 'Florence', 'Pueblo', 'Alamosa'],'Canon City', 8000],
     ['Colorado\'s 5/19th SF mobilized for Operation Uphold Democracy in 1994 to stabilize this Caribbean country.', ['Dominican Republic', 'Haiti', 'Bahamas','Puerto Rico'] ,'Haiti', 16000],
     ['What year did the Army adopt the HUMVEE as a replacement for the old quarter ton Jeep?',['\185','\186','\187','\188'], '\185', 32000],
     ["The infantry uses crossed rifles for their branch insignia, but what was their ORIGINAL symbol?",['Crossed Arrows','Bugle','Cannons','Crossed Bayonets'] ,'Bugle', 64000],
     ["The COARNG values can be memorized by the acronym PACT. What does PACT stand for?", ['Propriety, Action, Citizens, Timing', 'Preparedness, Authority, Citizen-Soldiers, Tireless', 'Professionalism, Accountable, Character, Trust', 'Policy, Aspiration, Commanding, Triumphant'],'Professionalism, Accountable, Character, Trust', 125000],
     ['Nil Sine Numine is the official motto of Colorado and also on the insignia for many COARNG units. If you translate the latin, what does it mean?', ['For God and Country', 'No Farther West', 'To Free the Oppressed', 'Nothing Without Providence'],'Nothing Without Providence', 150000],
        ['What is the maximum range of the M249 Squad Automatic Weapon?',['1000 meters','2800 meters','3600 meters','4200 meters'] ,'3600 meters', 1000000]
	];
	
	// Here are out variables
	// This will store the correct answer each time a question is asked
	var correctAnswer;
	// This is to output the question in the HTML
	var questionBox = $('.question');
	// Output the question number in here
	var questionNumber = $('.question-number');
	// This is the answers box, so we can output them inside
	var answers = $('.answers');
	// Restart button for if they go bust
	var restart = $('.restart');
	// This will show the amount of funds a player has
	var bank = $('.bank');
	// Fifty fifty button
	var fiftyFifty = $('.fifty-fifty');
	// Free Pass Button
	var freePass = $('.free-pass');
	// Lineline shared class
    var lifeLine = $('.lifeline');
    // Your a millionaire high scores 
    var highScores = $('.high-scores');
	
	// This is our question counter so we can go through each
	Qnum = -1;
	
	// These are the functions we call initially
	function init()
	{
		// We start off by calling the nextQuestion() function to start the quiz	
		nextQuestion();
		
		// If the restart button is clicked then we call the reStart() function
        restart.click(reStart);
		
		// Free pass functionality
		freePass.click(function(){
		
			// Hide the button
            freePass.hide();
			
			// Jump to next question
			nextQuestion();
			
        });

        highScores.hide();
	}
	
	// Here's our starting point, it's also the place we will come back to when we want to ask the next question
	function nextQuestion() {
	
		// Starting the question number off at 0, as arrays start at 0
		// If we're coming here for a second time it's going to add one onto the previous number 
		// so the 2nd time this function is called the Qnum would be 1 therefore asking the 2nd question from the array
		Qnum = Qnum + 1;
		
		console.log("qnum is " + Qnum)
		
		// Find out the total length of the questions, we need to know when to stop
		var total = questions.length;
		
		// If the question number is lower than the total then we can ask that question
		if(Qnum < total) {
		
			// Ask the question and pass the question number onto the function
			askQuestion(Qnum);
			
		}
		
		// If they've answered every question then lucky them - they're a millionaire
		else {
			
			// Change balance to a million
			bank.html("Balance : $1m");
			// We don't want to see a question so outputting a message instead
			questionBox.html("You're a millionaire");
			// We don't want to see any answers here
            answers.hide();
            // Show high score form
            highScores.show();
			// We don't want to see a reset button here
			restart.show();
			// We don't want to see the question number here
			questionNumber.hide();
			//Hide the lifeline buttons
			lifeLine.hide();
			
		}
				
	}
	
	// This outputs the question so the user can answer notice the counterNum which gives us the correct question from the array
	function askQuestion(counterNum) {
		
		// Take the question from the array and output it into $('.question')
		// Notice the [][], I'm accessing the [1st element in the questions array] and [first thing inside that 1st element] 
		questionBox.html(questions[counterNum][0]);
		
		questionNumber.html('Question number ' + (counterNum + 1));
		
		// Clear the answers box
		$('.answers').empty();
		
		// Output the answers also incuding a data attribute which contains the answer
		// Remove any whitesapce from the answers
		answers.append('<li data-answer=' + questions[counterNum][1][0].replace(/ /g,'') + '>' + questions[counterNum][1][0] + '</li>');
		answers.append('<li data-answer=' + questions[counterNum][1][1].replace(/ /g,'') + '>' + questions[counterNum][1][1] + '</li>');
		answers.append('<li data-answer=' + questions[counterNum][1][2].replace(/ /g,'') + '>' + questions[counterNum][1][2] + '</li>');
		answers.append('<li data-answer=' + questions[counterNum][1][3].replace(/ /g,'') + '>' + questions[counterNum][1][3] + '</li>');
		
		// Taking the 4th element from the array(money) and outputting it
		bank.html("Balance : $" + questions[counterNum][3]);
		
		// Taking the answer from the array and storing it in global variable
		correctAnswer = questions[counterNum][2];
		
		console.log("Answer is " + correctAnswer);
		
		// Remove spaces and change to lowercase
		correctAnswer = correctAnswer.replace(/ /g,'').toLowerCase();
		
		// Once they click an answer we call the answerQuestion function 
		$('.answers li').on('click', answerQuestion);
		
		// Fifty Fifty functionality
		fiftyFifty.click(function(){
		
			// Hide the button
			fiftyFifty.hide();
			
			// start a count as we only want to remove 2 answers
			fiftyFiftycount = 0;
			
			//Loop through each li and check what the answers are
			$(".answers li").each(function() {
			
				// If count is lower than 2 then we will remove 2 incorrect answers
				if(fiftyFiftycount < 2) {
				
					// If the li answer is NOT equal to the correct answer then we can remove it
					if($(this).data('answer').replace(/ /g,'').toLowerCase() != correctAnswer) {
					
						// Hide it
						$(this).hide();
						
						// Add one to the count!
						fiftyFiftycount = fiftyFiftycount + 1;
						
					}
					
				}
				
			});
			
		});
		
	}
	
	// This function detects if they answered correctly
	function answerQuestion() {
	
		// Unbind the answer button
		$('.answers li').off();
		
		// Take the data attribute form the answer the user clicked and remove spaces and change to lowercase
		var UserAnswer = $(this).data('answer').replace(/ /g,'').toLowerCase();
		
		// Does the answer match the correct answer we stored in the variable?
		if (UserAnswer == correctAnswer) {
		
			// If it does then ask the next question
			nextQuestion();
			
		}
		
		// If it doesn't then they have lost and we need to reset the game
		else {
		
			// Tell them they've lost
			questionBox.html("Sorry you've lost your money");
			// Reset the bank balance
			bank.html("Balance : $0");
			// We don't want to see any answers here
            answers.hide();
            // High sore form hide
            highScores.hide();
			// We do want to see a reset button here
			restart.show();
			// We don't want to see the question number here
			questionNumber.hide();
			//Show the lifeline buttons
			lifeLine.hide();
		}
				
	}
	
	// If they player fails the game they need to restart with this function
	function reStart() {
		
		// Reset the Qnum back to the beginning
		Qnum = -1;
		// Start the quiz off just as we did at the start calling the nextQuestion() function
		nextQuestion();
		// We need to see the answers again
		answers.show();
		// We don't want to see a reset button here 
		restart.hide();
		// We do want to see the question number here
		questionNumber.show();
		//Show the lifeline buttons
		lifeLine.show();
		// Show the button
		fiftyFifty.show();
		// Show the button
        freePass.show();
        highScores.hide();
		
	}

	init();
};


// ON DOC READY
$(function()
{	
    new WWTBAM.Game();

	
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}