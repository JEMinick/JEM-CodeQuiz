
var bDebugging = true;

var bQuizCompleted = false;

var iCurrentQuestion = 0;
var iCorrectAnswers = 0;
var sAnswerChoiceList;
var iAllottedTime = 75;
var iSecondsLeft = (iAllottedTime+1);
var iPenaltySeconds = 5;

// Used to let the user know how much time remains:
var timeEl = document.querySelector("#timer-display");

var startBtn = document.querySelector("#startButtonID");

// Used to provide a status during the quiz:
var quizStatusLine = document.querySelector( "#quiz-msg" );

var mainForm = document.querySelector("#main-form");
// console.log( "mainForm:" );
// console.log( mainForm.textContent );

// THE array of all questions, possible choices for each question, 
// and the correct answer:

var aQuestions = [
  {
    sQuestion: "Commonly used data types DO NOT include:",
    aChoices: ["strings", "booleans", "alerts", "numbers"],
    sAnswer: "alerts"
  },
  {
    sQuestion: "The condition in an if / else statement is enclosed within [__?__]",
    aChoices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    sAnswer: "parentheses"
  },
  {
    sQuestion: "Arrays in Javascript can be used to store [__?__].",
    aChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    sAnswer: "all of the above"
  },
  {
    sQuestion: "String values must be enclosed within [__?__] when being assigned to variables.",
    aChoices: ["commas", "curly brackets", "quotes", "parenthesis"],
    sAnswer: "quotes"
  },
  {
    sQuestion: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    aChoices: ["Javascript", "terminal / bash", "for loops", "console log"],
    sAnswer: "console log"
  },
];

// =====================================================================================================
// =====================================================================================================

function getRandomInt(max) {
  // This function always returns a positive integer value between 0 and max-1,
  // therefore adjust the max if necessary:
  var iRandomFloorValue=0;
  var nRandomValue=0;
  if ( max < 0 ) {
    max = ( max * -1 );
  }
  if ( max > 1 ) {
    nRandomValue = Math.random( max );
    iRandomFloorValue = Math.floor( nRandomValue * Math.floor(max) );
  }
  console.log( "Random number generated is [", nRandomValue, "] with a floor(" + max + ") generated of: [", iRandomFloorValue, "]" );
  return( iRandomFloorValue );
}

// =====================================================================================================

function createRandomizedQuestionList()
{
  var iTotalQuestions = aQuestions.length;
  var aNewQuestions = [];
  
  var abQuestions = [];
  for( var i=0; i < iTotalQuestions; i++ ) {
    abQuestions[i] = false;
  }
  
  for( var i=0; i < iTotalQuestions; i++ )
  {
    var iRandomIndex = getRandomInt( iTotalQuestions-i );
    var iQIndex = -1, iUsedQIndex=-1;
    for( var j=0; j < iTotalQuestions; j++ )
    {
      if ( iQIndex < 0 )
      {
        if ( !abQuestions[j] )
        {
          ++iUsedQIndex;
          if ( iUsedQIndex == iRandomIndex )
          {
            // log & copy the question...
            iQIndex = j;
            console.log( "Question#" + i + ": \"" + aQuestions[iQIndex].sQuestion + "\"" );
            abQuestions[j] = true;
            aNewQuestions.push( aQuestions[iQIndex] );
          }
        }
      }
    }
  }
  
  return ( aNewQuestions ); 

} // endOfFunction: createRandomizedQuestionList()

// In order to make the quiz a little more interesting,
// shuffle the list of questions so they're not so
// predictable when re-started:
var aQuestions2 = createRandomizedQuestionList();
if ( bDebugging )
{
  console.log( "The new shuffled question list is as follows:" );
  var iTotalQs = aQuestions2.length;
  for( var i=0; i < iTotalQs; i++ ) {
    var iQNo=i+1;
    console.log( "Question #" + iQNo + ": " + aQuestions2[i].sQuestion );
  }
}

// =====================================================================================================
// =====================================================================================================

function clearQuizForm() {
  mainForm.innerHTML = ""; // primary work form
  // timeEl.textContent = ""; // header element
  // quizStatusLine.textContent = ""; // footer element
}

function displayQuestion( iQuestionIndex )
{
  function createQuestionP(iQuestionIndex)
  {
    var sQuestionParagraph = aQuestions2[iQuestionIndex].sQuestion;
    return( sQuestionParagraph );
  }

  function checkAnswer(event)
  {
    var element = event.target;
    console.log( "checkAnswer(event): " );
    console.log( event );

    if ( element.matches("li") )
    {
        // Correct condition 
        if ( element.textContent === aQuestions2[iQuestionIndex].sAnswer ) {
            iCorrectAnswers++;
            quizStatusLine.textContent = "Your answer of: [" + aQuestions2[iQuestionIndex].sAnswer + "] was correct!";
            // Correct condition 
        } else {
            // Will deduct from iSecondsLeft for wrong answers:
            iSecondsLeft = iSecondsLeft - iPenaltySeconds;
            quizStatusLine.textContent = "Wrong! The correct answer was [" + aQuestions2[iQuestionIndex].sAnswer + "]...";
        }
    }
    
    // Update the current global question number:
    iCurrentQuestion++;

    if ( iCurrentQuestion >= aQuestions2.length ) {
        // All done will append last page with user stats
        // quizCompleted();
        bQuizCompleted = true;
    } else {
        //render(iCurrentQuestion);
        displayQuestion(iCurrentQuestion);
    }
    
    //questionsDiv.appendChild(createDiv);

  } // endOfFunction: checkAnswer(event)

  function createChoiceList(iQuestionIndex)
  {
    var sChoiceList = "";
    var elMainFormUL = document.createElement("ul" );

    function qChoice(sValue)
    {
      // modify sChoiceList for debug logging purposes:
      sChoiceList += "<li>" + sValue + "</li>";
      var elListItem  = document.createElement( "li" );
      elListItem.textContent = sValue;
      elMainFormUL.appendChild( elListItem );
      elListItem.addEventListener( "click", (checkAnswer) );
    }

    mainForm.appendChild( elMainFormUL );
    sChoiceList = "<ul>";
    aQuestions2[iQuestionIndex].aChoices.forEach(qChoice);
    sChoiceList += "</ul>";

    return( sChoiceList );
  }

  //--------------------------------------------------------------------------

  if ( bDebugging )
    console.log( `Question #${iCurrentQuestion}${1}:` );

  //--------------------------------------------------------------------------
  mainForm.innerHTML = ""
  var sQuestion = createQuestionP(iCurrentQuestion);

  if ( bDebugging )
  {
    console.log( "Question-Paragraph:" );
    console.log( "\t\"" + sQuestion + "\"" );
  }

  var oNewParagraph = document.createElement("p" );
  oNewParagraph.textContent = sQuestion;
  mainForm.appendChild( oNewParagraph );

  //--------------------------------------------------------------------------

  if ( bDebugging )
    console.log( "Un-ordered Choice List:" );

  var sChoices = createChoiceList(iCurrentQuestion);

  if ( bDebugging )
    console.log( sChoices );

  //--------------------------------------------------------------------------

} // endOfFunction: displayQuestion()

function quizCompleted()
{
  clearQuizForm();

  if ( bQuizCompleted )
  {
      var createP2 = document.createElement("p");
      createP2.textContent = "Your time to complete the quiz: [" + (iAllottedTime-iSecondsLeft) + "]";
      mainForm.appendChild( createP2 );
  }

  // Label prefix to User Input:
  var sUserPrompt = document.createElement( "label" );
  sUserPrompt.setAttribute( "id", "sUserPrompt" );
  sUserPrompt.textContent = "Enter your initials: ";
  mainForm.appendChild( sUserPrompt );
  
  // User Input:
  var sUserInput = document.createElement( "input" );
  sUserInput.setAttribute( "type", "text" );
  sUserInput.setAttribute( "id", "sInitials" );
  sUserInput.textContent = "";
  mainForm.appendChild( sUserInput );

  // Create the 'Submit' button:
  var createSubmitBtn = document.createElement( "button" );
  createSubmitBtn.setAttribute( "type", "submit" );
  createSubmitBtn.setAttribute( "id", "submitBtn" );
  createSubmitBtn.textContent = "Submit";
  mainForm.appendChild( createSubmitBtn );
  
  // Event listener to capture data for local storage
  // and display the "High Scores" table:
  createSubmitBtn.addEventListener( "click", function ()
  {
      var sInitials = sUserInput.value;
      sInitials = sInitials.trim();
      
      if ( sInitials === null || sInitials.length == 0 )
      {
        console.log( "No value entered!" );
        quizStatusLine.textContent = "Enter your initials for the High Score board!";
      } 
      else
      {
        var recQuizResults = {
          sUserInitials: sInitials,
          iSecondsUsed: iAllottedTime-iSecondsLeft,
          iTotalQuestions: aQuestions2.length,
          iTotalCorrect: iCorrectAnswers
        }
        
        clearQuizForm();
        timeEl.textContent = "High Scores";
        quizStatusLine.textContent = "";
        
        // if ( bDebugging ) {
        //   console.log( "mainForm.innerHTML:" );
        //   console.log( mainForm.innerHTML );
        //   // console.log( "elMainFormUL" );
        //   // console.log( elMainFormUL.innerHTML );
        // }
        
        var oNewParagraph = document.createElement("p" );
        oNewParagraph.setAttribute( "style", "text-align: center" );
        oNewParagraph.textContent = "The following is a list of all saved High Scores:";
        mainForm.appendChild( oNewParagraph );
      
        if ( bDebugging ) {
          console.log( "The quiz results:" );
          console.log( JSON.stringify(recQuizResults) );
        }
        
        var recHighScores = localStorage.getItem( "HighScores" );
        
        if ( recHighScores === null ) {
          recHighScores = [];
        } else {
          recHighScores = JSON.parse(recHighScores);
        }
        
        recHighScores.push( recQuizResults );
        
        var sNewHighScores  = JSON.stringify( recHighScores );
        localStorage.setItem( "HighScores", sNewHighScores );
        
        if ( bDebugging )
          console.log( "New Score List:" );
        
        // ==========================================================================================================================
        function displayHighScores()
        {
          var iTotalScores = 0;
          var recHighScores3 = localStorage.getItem( "HighScores" );
          
          recHighScores3 = JSON.parse( recHighScores3 );
          if ( bDebugging ) {
            if ( recHighScores3 !== null )
            {
              iTotalScores = recHighScores3.length;
              console.log( "The HighScore list now contains [" + recHighScores3.length + "] entries." );
            }
          }
          
          // ------------------------------------------------------------------------------------------------------
          // Create a table which we can display all high score information within:
          // OBJECTIVE:
          // <div id="highScoresTable">
          //   <table style="width: 100%" border="1" cellspacing="5" cellpadding="2">
          //       <tr>
          //         <td style="width: ??%">Info#1</td>
          //         <td style="width: ??%">Info#2</td>
          //         <td style="width: ??%">Info#3</td>
          //         etc...
          //       </tr>
          //   </table>
          // </div>
          // ------------------------------------------------------------------------------------------------------
          
          // Begin with a <div> which styling will apply to:
          // <div id="highScoresTable">
          var oNewTableDiv = document.createElement("div" );
          mainForm.appendChild( oNewTableDiv );
          
          // Secondly, define <table> with the appropriate attributes:
          //    Objective: <table style="width: 100%" border="1" cellspacing="5" cellpadding="2">
          var oNewTableEl = document.createElement("table" );
          oNewTableEl.setAttribute( "class", "highScoresTable" );
          oNewTableDiv.appendChild( oNewTableEl );
          
          // Thirdly, create a column header row:
          // var oNewTableHdrDiv = document.createElement("div" );
          // oNewTableHdrDiv.setAttribute( "class", "highScoreColHdr highScoresTable" );
          // oNewTableEl.appendChild( oNewTableHdrDiv );
          
          // Initiate a <tr> for each high score: 
          var oNewTableHdrRow = document.createElement("tr" );
          oNewTableEl.appendChild( oNewTableHdrRow );
          
          for( var j=0; ( j < 3 ); j++ )
          {
            var oNewTableColHdrCol = document.createElement("th" );
            switch( j ) {
              case 0:
                oNewTableColHdrCol.textContent = "Initials";
                break;
                case 1:
                  oNewTableColHdrCol.textContent = "Time Consumed";
                  break;
                case 2:
                  oNewTableColHdrCol.textContent = "Total Correct";
                  break;
            }
            oNewTableHdrRow.appendChild( oNewTableColHdrCol );
          }
          
          for( var i=0; i < iTotalScores; i++ )
          {
            var iIdx=i+1;
            console.log( "HighScore# " + iIdx + ": " 
                          + "\"" + recHighScores3[i].sUserInitials + "\", " 
                          + "Time: [" + recHighScores3[i].iSecondsUsed + "], "
                          + "Score: [" + recHighScores3[i].iTotalCorrect + "]/[" + recHighScores3[i].iTotalQuestions + "]"
                        );
          
            // Initiate a <tr> for each high score: 
            var oNewTableRow = document.createElement("tr" );
            oNewTableEl.appendChild( oNewTableRow );
          
            // Create a <td> for each high score attribute:
            for( var j=0; ( j < 3 ); j++ )
            {
              var oNewTableColumn = document.createElement("td" );
              oNewTableColumn.setAttribute( "width", "35%" );
              switch( j ) {
                case 0:
                  oNewTableColumn.textContent = recHighScores3[i].sUserInitials;
                  break;
                  case 1:
                    oNewTableColumn.textContent = recHighScores3[i].iSecondsUsed;
                    break;
                  case 2:
                    oNewTableColumn.textContent = 
                      recHighScores3[i].iTotalCorrect 
                      + " / " + recHighScores3[i].iTotalQuestions
                      + " (" 
                          + ((recHighScores3[i].iTotalCorrect/recHighScores3[i].iTotalQuestions)*100)
                          + "%"
                      + ")";
                    break;
              }
              oNewTableRow.appendChild( oNewTableColumn );
              
            } // endFor( each attribute within a record retrieved from storage )
            
          } // endFor( each record in Storage )
          
        } // endOffunction displayHighScores()
        // ==========================================================================================================================
        
        displayHighScores();

        // --------------------------------------------------------------
        // Define click event functions for our "High Scores" display:
        function RestartApp() {
          window.location.href = "./index.html";
        }
        function clearHighScores() {
          console.log( "Clearing ALL scores... " );
          localStorage.clear();
          clearQuizForm();
          displayHighScores();
          createFinalScreenButtons();
        }
        
        // -------------------------------------------------------------
        // Create the 'Restart' and 'Clear' buttons:
        // -------------------------------------------------------------
        function createFinalScreenButtons()
        {
          var oBtn1Div = document.createElement( "div" );
          oBtn1Div.setAttribute( "id", "highScoreScreenButtons" );
          oBtn1Div.setAttribute( "style", "flex: auto " );
          mainForm.appendChild( oBtn1Div );
          
          var restartBtn = document.createElement( "button" );
          restartBtn.setAttribute( "type", "submit" );
          restartBtn.setAttribute( "id", "submitBtn" );
          restartBtn.textContent = "Restart";
          oBtn1Div.appendChild( restartBtn );
          restartBtn.addEventListener( "click", (RestartApp) );
          
          var clearHighScoresBtn = document.createElement( "button" );
          clearHighScoresBtn.setAttribute( "type", "submit" );
          clearHighScoresBtn.setAttribute( "id", "submitBtn" );
          clearHighScoresBtn.textContent = "Clear Scores";
          oBtn1Div.appendChild( clearHighScoresBtn );
          clearHighScoresBtn.addEventListener( "click", (clearHighScores) );
        }
        
        createFinalScreenButtons();
        
        if ( bDebugging ) {
          var sCurrentFormInfo = mainForm.innerHTML;
          console.log( "Final Screen HTML:" );
          console.log( sCurrentFormInfo );
        }
        
    } // endElseIf( sInitials were entered... )
  });

}

function startTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    iSecondsLeft--;
    timeEl.textContent = `Time: ${iSecondsLeft}`;
    
    if ( bQuizCompleted )
    {
      // Stops execution of our quiz timer:
      clearInterval(timerInterval);
      quizCompleted();
      quizStatusLine.textContent = "End of quiz! You got  " + iCorrectAnswers + " out of " + aQuestions2.length + " correct!";
    }
    else if ( iSecondsLeft === 0 )
    {
      // Stops execution of our quiz timer:
      clearInterval( timerInterval );
      timeEl.textContent = "Time's Up!";
      quizStatusLine.textContent = "The timer has expired!";
      quizCompleted();
    }

  }, 1000);
}

// function RunApp() {
startBtn.addEventListener( "click", function() 
  {
    iAllottedTime = 30;
    iSecondsLeft = (iAllottedTime+1);
    mainForm.innerHTML = "";
    displayQuestion(iCurrentQuestion);
    quizStatusLine.textContent = "Click on the correct answer!";
    startTimer();
  }
);

// RunApp();
