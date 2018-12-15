var trivia = {
    correct: 0,//correct start at 0
    wrong: 0,//wrong starts at 0
    unanswered: 0,//unanswered starts at 0
    currentset: 1,
    timeleft: 2,//setting the time to 30 MAKE SURE TO CHANGE BACK TO 30
    transitiontime: 5,//5 seconds transition between seeing answer to next question
    timerrun: false,//timer not running until the game starts
    intervalID: "",//variable that will hold our interval ID when time executes
    intervalID2: "",
    //question data
    questions: {
        q1: "Which of the following is the father of Hercules?",
        q2: "Which of the following are not siblings?",
        q3: "Which of the following did not participate in the battle of Thermopylae (BATTLE OF THE 300!)",
        q4: "Where was Alexander the Great from?",
        q5: "Who won the Peloponnesian War?",
    },
    //choices data
    choices: {
        q1: ["Posidon", "Hera", "Zeus", "Athena"],
        q2: ["Zeus", "Apollo", "Posidon", "Hades"],
        q3: ["Athenians", "Corinthians", "Thespians", "Phocians"],
        q4: ["Sparta", "Thebes", "Corinth", "Macedonia"],
        q5: ["Delian League", "Peloponnesian League", "Achaemenid Empire", "Persian Empire"],
    },
    //answer data
    answers: {
        q1: "Zeus",
        q2: "Apollo",
        q3: "Athenians",
        q4: "Macedonia",
        q5: "Peloponnesian League",
    },
    images: {
        q1: "assets/images/Hercimg.jpg",
        q2: "assets/images/siblings.jpeg",
        q3: "assets/images/noparticipation.jpg",
        q4: "assets/images/nationality.jpg",
        q5: "assets/images/nationality.jpg",
    }
};

$(document).ready(function() {//on document start
    $("#startgame").on("click",gameStart) //click button to start

    $("#optionsdiv").on("click",".option",checkAnswer)




    //function to start the game
        //hide the start button NEEDS TO BE DONE
        //show the choices
        //show and start the timer
    function gameStart() {
        trivia.currentset = 1;//the questions are indexed here
        trivia.correct = 0;//correct start at 0
        console.log("correct "+trivia.correct);
        trivia.wrong = 0;//wrong starts at 0
        console.log("wrong "+trivia.wrong);
        trivia.unanswered = 0;//unanswered starts at 0
        console.log("unanswered "+trivia.unanswered);
        clearInterval(trivia.intervalID);//clears intervalID
        $("#gamediv").show();//show the question
        $("#resultdiv").html("");//empties out the last results
        $("#timerspan").text("Time Remaining: " + trivia.timeleft);//shows the amount of time left
        $("#startgame").hide();//hides the start game button
        $("#timersection").show();//shows the timer
        starttimer();
        nextQ();
        
    };
    function nextQ() {
        var questionContent = Object.values(trivia.questions)[trivia.currentset];//takes the questions then indexes the current question
        $("#question").text(questionContent);//puts the indexed question to the question div
        for(var i=0;i<4;i++){
            
            var question = "q"+trivia.currentset;
            
            var choicesOptions = trivia.choices[question][i];//takes the choices and indexes the current one
            
            $("#optionsdiv").append($('<button id="questionbutton" class="option btn btn-info btn-lg" data-q="'+ question + '">'+choicesOptions+'</button>'));
        }
    };
    function checkAnswer() {
            
        console.log("my this ",$(this));
        
        // right answer clicked
        var answerbtn = $(this).text();
        var expectedanswer = $(this).attr("data-q");
        console.log({expectedanswer});
        console.log({answerbtn});

        if(trivia.timeleft === 0) {//DOES NOT FIRE UNTIL A BUTTON IS CLICKED
            console.log("out of time");//CONFIRMED FUNCTIONAL
            trivia.unanswered++;//CONFIRMED FUNCTIONAL
            console.log("unanswered:" + trivia.unanswered);//CONFIRMED FUNCTIONAL
            $("#question").hide();//hides the question//CONFIRMED FUNCTIONAL
            $("#resultdiv").html('<h3>Out of Time! The correct answer was ' + trivia.answers[expectedanswer],'</h3>');//says player is ran out of time CONFIRMED FUNCTIONAL
            $("#optionsdiv").hide();//hides the buttons for the choices
            stop();//CONFIRMED FUNCTIONAL
            $("#imagediv").html("<img src='./assets/images/Hercimg.jpg' alt='image'/>");//shows the image associted with the correct answer
            nextQ();//UNCONFIRMED
            // transition();//restarts the timer to 5 seconds
            // traninterval();
                //shows the next question
                //shows the next choices
        }


        else if(answerbtn === trivia.answers[expectedanswer]) {//CONFIRMED OPERATIONAL
            console.log("correct answer clicked");
            trivia.correct++;//CONFIRMED OPERATIONAL
            $("#question").hide();//hides the question, CONFIRMED OPERATIONAL
            $("#resultdiv").html("<h3>You are correct!</h3>");//says player is correct CONFIRMED OPERATIONAL
            $("#optionsdiv").hide();//hides the buttons for the choices CONFIRMED OPERATIONAL
            stop();//stops the timer CONFIRMED OEPRATIONAL
            $("#imagediv").html("<img src='./assets/images/Hercimg.jpg' alt='image'/>");//shows the image associted with the correct answer
            // transition();//restarts the timer to 5 seconds
            // traninterval();
                //shows the next question
                //shows the next choices
        }

        else {
           console.log("wrong answer clicked");
            trivia.wrong++;
            $("#question").hide();//hides the question
            $("#resultdiv").html('<h3>Nope! The correct answer was ' + trivia.answers[expectedanswer],'</h3>');//says player is wrong
            $("#optionsdiv").hide();//hides the buttons for the choices
            stop();//stops the timer
            $("#imagediv").html("<img src='./assets/images/Hercimg.jpg' alt='image'/>");//shows the image associted with the correct answer
            // transition();//restarts the timer to 5 seconds
            // traninterval();
        }

        




    }

    function reset() {
        $("#startgame").html('<h3>Play Again!</h3>');
        $("#startgame").on("click",function() {
        trivia.correct=0;
        trivia.wrong=0;
        trivia.unanswered=0;
        })
        gameStart();
    }
    


if(trivia.currentset === Object.keys(trivia.questions).length) {
    $("#resultdiv")
        .html("<h3>The Correct Answer Was: "+trivia.correct+"</h3>");
};




//function for timer
function starttimer() {//clearing intervalID prior to setting our new intervalID  to prevent multiple timers
    clearInterval(trivia.intervalID);
    intervalID = setInterval(decrement, 1000);//sets an interval
}

function decrement() {
    trivia.timeleft--;
    $("#timerspan").html("Time Remaining: " + trivia.timeleft);//"Time Remaining....." placed in timerdiv
    if(trivia.timeleft === 0) {//stop the timer when it reaches 0
        stop();//runs the stop function
        
    }
}

function transition() {
    clearInterval(trivia.intervalID2);
    intervalID2 = setInterval(decrement, 1000);
    }


function traninterval() {
    trivia.transitiontime--;
    if(trivia.transitiontime === 0) {
        stop();
        nextQ();//bring up the next question
    }
}


//transition from one question to the next after answer
    //once each of the options for checkanswer fires
        //set timer for 5 seconds
        //nextQ???



function stop() {
    clearInterval(intervalID);//clears intervalID
    // clearInterval(intervalID2);
}





});


