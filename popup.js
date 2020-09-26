'use strict';

var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();

function display(element){
  document.getElementById(element).style.display = "block";
};

function remove(element){
  document.getElementById(element).style.display = "none";
};

function continueToShowTime(){
  if(!bgpage.alarmDate){
    display('custom_time');
  }
  else{
    displayTime();
    remove('choices');
    remove('start_button');
  }
};

function getChoice(){
    let choice = "none";
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        if(document.choices.radio[i].checked == true)
        {
            choice = document.choices.radio[i].value;
            return choice;
        }    
    }
    return choice;
};

function tenmin(){
  remove('choices');
  Timer(10);
  displayTime();
};

function halfhour(){
  remove('choices');
  Timer(30);
  displayTime();
};

function onehour(){
  remove('choices');
  Timer(60);
  displayTime();
};

function custom(){
  let time = document.getElementById('custom_time').value;
  Timer(time);
};

function triggerTimer(){
  let checked = getChoice();
  switch (checked){
    case "10min":
    tenmin();
    remove('start_button');
    display('timer_button');
    break;

    case "30min":
    halfhour();
    remove('start_button');
    display('timer_button');
    remove('choices');
    break;

    case "1hr":
    onehour();
    remove('start_button');
    display('timer_button');
    remove('choices');
    break;

    case "custom":
    remove('choices');
    display('custom_time');
    display('timer_button');
    display('question');
    remove('start_button');
    break;

    case "none":
    remove('custom_time');
    remove('timer_button');
    remove('question');
    break;
  };
};

function Timer(num){
  bgpage.setAlarm(num*60000);
  displayTime();
};

function displayTime(){
  document.getElementById('timer').textContent = bgpage.getTimeLeftString();
  refreshDisplayTimeout = setTimeout(displayTime, 100);
  remove('custom_time');
  remove('timer_button');
  remove('question');
  display('cancel_button');
};

function cancelAlarm() {
  bgpage.cancelAlarm();
  clearTimeout(refreshDisplayTimeout);
  document.getElementById('timer').textContent = "";
  remove('cancel_button');
  display('start_button');
  display('choices');
};

document.getElementById('start_button').addEventListener('click', triggerTimer);
document.getElementById('timer_button').addEventListener('click', custom);
document.getElementById('cancel_button').addEventListener('click', cancelAlarm);
continueToShowTime();
triggerTimer();

