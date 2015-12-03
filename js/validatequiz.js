/*
-------------------------------------
COMP 1950 PROJECT

Author: Joanna Flores (#A00733856)
Last Updated: 2015-Dec-02
-------------------------------------
*/

$(function() {
    
    /*
    ++++++++++++++++++++++++++++++++
    For setting the timer
    ++++++++++++++++++++++++++++++++
    */
    var quizTimer = new (function() {
        var $countdown,
            incrementTime = 70,
            currentTime = 18000,
            updateTimer = function() {
                $countdown.html(formatTime(currentTime));
                if (currentTime == 0) {
                    quizTimer.Timer.stop();
                    timerComplete();
                    return;
                }
                currentTime -= incrementTime / 10;
                if (currentTime < 0) currentTime = 0;
            },
            timerComplete = function() {
                alert("The quiz has ended. You can no longer submit the quiz.");
                
                //disables the submit button
                $("#submitquiz span").text("Quiz has ended");
                hideQuizSection();
            },
            init = function() {
                $countdown = $('#countdown');
                quizTimer.Timer = $.timer(updateTimer, incrementTime, false);
            };
        $(init);
    });
    
    /*formats the time*/
    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {str = '0' + str;}
        return str;
    }
    
    function formatTime(time) {
        var min = parseInt(time / 6000),
            sec = parseInt(time / 100) - (min * 60),
            hundredths = pad(time - (sec * 100) - (min * 6000), 2);
        return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
    }
    
    function hideQuizSection() {
        //disables the submit button
        $("#submitquiz").attr('disabled', true);
                
        /*hides the quiz*/
        $(".quizsection").removeClass("showquiz");
        $(".quizsection").addClass("hidequiz");

        /*stops and hides the timer*/
        $("#countdown").removeClass("showquiz");
        $("#countdown").addClass("hidequiz");
        quizTimer.Timer.stop();
    }

    
    /*
    ++++++++++++++++++++++++++++++++
    For validating the quiz
    ++++++++++++++++++++++++++++++++
    */
    
    $("#submitquiz").click(function(event){
        event.preventDefault();
        
        /*gets the student information*/
        var studentname = $("#name").val();
        var studentnumber = $("#studentnumber").val();

        if (studentname.trim() == "") {
            alert("Please specify your name");
        }
        else if (studentnumber.trim() == "") {
            alert("Please specify your student number");
        }
        else if (!studentnumber.match(/A00[0-9]{6}/)) {
            alert("Please provide a valid student number. The student number must start with A00 followed by 6-digits.");
        }
        else {
            var buttonText = $("#submitquiz span").text();
            if (buttonText != "Submit Quiz") {
                /*shows the quiz*/
                $("#submitquiz span").text("Submit Quiz");
                $(".quizsection").toggleClass("showquiz");
                
                /*shows and starts the timer*/
                $("#countdown").toggleClass("showquiz");
                quizTimer.Timer.toggle();
            }
            else {
                /*submits the quiz*/
                alert("You have now submitted quiz!");
                $("#submitquiz").hide();
                
                hideQuizSection();
            }
        }
    });
});