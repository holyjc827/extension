$(document).ready(function(){
    let work_time;
    $('#test').click(function(){
        alert("hello world!");
    });


    // Accepts the work time and break time in Custom.html file. These values are passed onto the timer function.
    $('.form-button').click(function(){
        event.preventDefault();
        work_time = $('#work-time').val();
        timer(work_time);
    });
});

function timer(w) {
    let sec = 0;
    let min = parseInt(w, 10);
    function doRecursion() {

        if(sec <= 0) {
            sec = 59;
            min--;
        }
        else {
            sec--;
        }

        $('.count').text(min+':'+sec);
        let recursive = setTimeout(doRecursion, 1000);
        if(min <0){
            clearTimeout(recursive);
            alert("Take a break!")
            $('.count').text("Break Time!");
        };
    };
    doRecursion();
};
