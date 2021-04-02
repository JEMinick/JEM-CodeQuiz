
var bDebugging = true;

var bQuizCompleted = false;

var iCurrentQuestion = 0;
var iCorrectAnswers = 0;
var sAnswerChoiceList;
var iAllottedTime = 0;
var iSecondsLeft = 0;
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

var a5Questions = [
  {
    sQuestion: "Commonly used data types DO NOT include:",
    sQExample: "",
    aChoices: ["strings", "booleans", "alerts", "numbers"],
    sAnswer: "alerts"
  },
  {
    sQuestion: "The condition in an if / else statement is enclosed within [__?__]",
    sQExample: "",
    aChoices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    sAnswer: "parentheses"
  },
  {
    sQuestion: "Arrays in Javascript can be used to store [__?__].",
    sQExample: "",
    aChoices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    sAnswer: "all of the above"
  },
  {
    sQuestion: "String values must be enclosed within [__?__] when being assigned to variables.",
    sQExample: "",
    aChoices: ["commas", "curly brackets", "quotes", "parenthesis"],
    sAnswer: "quotes"
  },
  {
    sQuestion: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    sQExample: "",
    aChoices: ["Javascript", "terminal / bash", "for loops", "console log"],
    sAnswer: "console log"
  }
];

var a25Questions = [
  { 
    sQuestion: "Inside which HTML element do we put the JavaScript?",
    sQExample: "",
    aChoices: ["<scripting>","<script>","<javascript>","<js>"],
    sAnswer: "<script>"
  },
  {
    sQuestion: "What is the correct JavaScript syntax to change the content of the following HTML element?",
    sQExample: "   <p id=\"demo\">This is a demonstration.</p>",
    aChoices: ["#demo.innerHTML = \"Hello World!\"",
              "document.getElementByName( \"p\" ).innerHTML = \"Hello World!\"!",
              "document.getElementById( \"demo\" ).innerHTML = \"Hello World!\"",
              "document.getElement( \"p\" ).innerHTML = \"Hello World!\""],
    sAnswer: "document.getElementById( \"demo\" ).innerHTML = \"Hello World!\""
  },
  {
    sQuestion: "Where is the correct place to insert a JavaScript?",
    sQExample: "",
    aChoices: ["The <body> section","The <head> section","Both the <head> section and the <body> section"],
    sAnswer: "Both the <head> section and the <body> section"
  },
  {
    sQuestion: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
    sQExample: "",
    aChoices: ["<script href=\"xxx.js\">","<script name=\"xxx.js\">","<script src=\"xxx.js\">"],
    sAnswer: "<script src=\"xxx.js\""
  },
  {
    sQuestion: "The external JavaScript file must contain the <script> tag.",
    sQExample: "",
    aChoices: ["False","True"],
    sAnswer: "False"
  },
  {
    sQuestion: "How do you write \"Hello World\" in an alert box?",
    sQExample: "",
    aChoices: ["alertBox(\"Hello World\");",
               "msgBox(\"Hello World\");",
               "alert(\"Hello World\");",
               "msg(\"Hello World\");"],
    sAnswer: "alert(\"Hello World\");"
  },
  {
    sQuestion: "How do you create a function in JavaScript?",
    sQExample: "",
    aChoices: ["function = myFunction()","function.myFunction()","function myFunction()"],
    sAnswer: "function myFunction()"
  },
  {
    sQuestion: "How do you call a function named \"myFunction\"?",
    sQExample: "",
    aChoices: ["myFunction()","call function myFunction()","call myFunction()"],
    sAnswer: "myFunction()"
  },
  {
    sQuestion: "How to write an IF statement in JavaScript?",
    sQExample: "",
    aChoices: ["if (i == 5)","if i == 5","if i = 5 then","if i = 5"],
    sAnswer: "if (i == 5)"
  },
  {
    sQuestion: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
    sQExample: "",
    aChoices: ["if i <> 5","if i =! then","if (i <> 5)","if (i != 5)"],
    sAnswer: "if (i != 5)"
  },
  {
    sQuestion: "How does a WHILE loop start?",
    sQExample: "",
    aChoices: ["while (i <= 10; i++)","while (i <= 10)","while i = 1 to 10"],
    sAnswer: "while (i <= 10)"
  },
  {
    sQuestion: "How does a FOR loop start?",
    sQExample: "",
    aChoices: ["for (i <= 5; i++)","for (i=0; i <= 5; i++)","for (i=0; i <=5)","for i = 1 to 5"],
    sAnswer: "for (i=0; i <= 5; i++)"
  },
  {
    sQuestion: "How can you add a comment in a JavaScript?",
    sQExample: "",
    aChoices: ["//This is a comment","'This is a comment","<!--This is a comment-->"],
    sAnswer: "//This is a comment"
  },
  {
    sQuestion: "How to insert a comment that has more than one line?",
    sQExample: "",
    aChoices: ["/*This comment can span more than one line*/",
               "//This comment can span more than one line//",
               "<!--This comment can span more than one line-->"],
    sAnswer: "/*This comment can span more than one line*/"
  },
  {
    sQuestion: "What is the correct way to write a JavaScript array?",
    sQExample: "",
    aChoices: ["var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
               "var colors = \"red\", \"green\", \"blue\"",
               "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
               "var colors = [\"red\", \"green\", \"blue\"]"],
    sAnswer: "var colors = [\"red\", \"green\", \"blue\"]"
  },
  {
    sQuestion: "How do you round the number 7.25 to the nearest integer?",
    sQExample: "",
    aChoices: ["Math.round(7.25)","Math.rnd(7.25)","round(7.25)","rnd(7.25)"],
    sAnswer: "Math.round(7.25)"
  },
  {
    sQuestion: "How do you find the number with the highest value of x and y?",
    sQExample: "",
    aChoices: ["Math.max(x,y)","Math.ceil(x,y)","ceil(x,y)","top(x,y)"],
    sAnswer: "Math.max(x,y)"
  },
  {
    sQuestion: "What is the correct JavaScript syntax for opening a new window called \"w2\"?",
    sQExample: "",
    aChoices: ["w2 = window.new( \"http://www.github.com\" );",
               "w2 = window.open( \"http://www.github.com\" );"],
    sAnswer: "w2 = window.new( \"http://www.github.com\" );"
  },
  {
    sQuestion: "JavaScript is the same as Java.",
    sQExample: "",
    aChoices: ["False","True"],
    sAnswer: "False"
  },
  {
    sQuestion: "How can you detect the client's browser name?",
    sQExample: "",
    aChoices: ["client.navName","navigator.appName","browser.name"],
    sAnswer: "navigator.appName"
  },
  {
    sQuestion: "Which event occurs when the user clicks on an HTML element?",
    sQExample: "",
    aChoices: ["onchange","onclick","onmouseclick","onmouseover"],
    sAnswer: "onclick"
  },
  {
    sQuestion: "How do you declare a JavaScript variable?",
    sQExample: "",
    aChoices: ["v carName;","var carName;","variable carName;"],
    sAnswer: "var carName;"
  },
  {
    sQuestion: "Which operator is used to assign a value to a variable?",
    sQExample: "",
    aChoices: ["*","-","x","="],
    sAnswer: "="
  },
  {
    sQuestion: "What will the following code return: Boolean(10 > 9)",
    sQExample: "",
    aChoices: ["NaN","false","true"],
    sAnswer: "true"
  },
  {
    sQuestion: "Is JavaScript case-sensitive?",
    sQExample: "",
    aChoices: ["Yes","No"],
    sAnswer: "Yes"
  }
  // {
  //   sQuestion: "",
  //   sQExample: "",
  //   aChoices: [">","","",""],
  //   sAnswer: ""
  // },
  // {
  //   sQuestion: "",
  //   sQExample: "",
  //   aChoices: [">","","",""],
  //   sAnswer: ""
  // },
  // {
  //   sQuestion: "",
  //   sQExample: "",
  //   aChoices: [">","","",""],
  //   sAnswer: ""
  // },
  // {
  //   sQuestion: "",
  //   sQExample: "",
  //   aChoices: [">","","",""],
  //   sAnswer: ""
  // },
  // {
  //   sQuestion: "",
  //   sQExample: "",
  //   aChoices: [">","","",""],
  //   sAnswer: ""
  // },
  // {
  //   sQuestion: "",
  //   sQExample: "",
  //   aChoices: [">","","",""],
  //   sAnswer: ""
  // },
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

function createRandomizedQuestionList(aQuestions)
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
var aQuestions2 = createRandomizedQuestionList(a25Questions);
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
  
  function createQuestionP2(iQuestionIndex)
  {
    var sQuestionParagraph = aQuestions2[iQuestionIndex].sQExample;
    sQuestionParagraph = sQuestionParagraph.trim(sQuestionParagraph);
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
      if ( element.textContent === aQuestions2[iQuestionIndex].sAnswer )
      {
        // Correct condition 
        iCorrectAnswers++;
        // quizStatusLine.textContent = "Your answer of: [" + aQuestions2[iQuestionIndex].sAnswer + "] was correct!";
        quizStatusLine.textContent = "Correct!";
      } else {
        // Wrong answer: Will deduct from iSecondsLeft for wrong answers:
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
    
  } // endOfFunction: createChoiceList()
  
  //--------------------------------------------------------------------------
  
  if ( bDebugging )
  {
    //console.log( `Question #${iCurrentQuestion}${1}:` );
    var iQNo = iCurrentQuestion+1;
    console.log( "Question #" + iQNo + ":" );
  }
  
  //--------------------------------------------------------------------------

  clearQuizForm();
  
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

  var sQExample = createQuestionP2(iCurrentQuestion);
  if ( sQExample.length > 0 )
  {
    if ( bDebugging )
    {
      console.log( "Question-Example:" );
      console.log( "\t\"" + sQExample + "\"" );
    }
    var oNewParagraph = document.createElement("p" );
    oNewParagraph.textContent = sQExample;
    mainForm.appendChild( oNewParagraph );
  }

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

  timeEl.textContent = "You Finished!";

  // Label prefix to User Input:
  var sUserPrompt = document.createElement( "label" );
  sUserPrompt.setAttribute( "id", "sUserPrompt" );
  sUserPrompt.textContent = "Enter your initials or name: ";
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
    // iAllottedTime = 50;  // a5Questions:  (5*10)
    // iAllottedTime = 250; // a25Questions: (25*10)
    iAllottedTime = aQuestions2.length*10;
    iSecondsLeft = (iAllottedTime+1);
    //mainForm.innerHTML = "";
    clearQuizForm();
    displayQuestion(iCurrentQuestion);
    quizStatusLine.textContent = "Click on the correct answer!";
    startTimer();
  }
);

var sCurrentBrowser = navigator.appName;
console.log( "Running the app with: " + sCurrentBrowser );

// RunApp();
