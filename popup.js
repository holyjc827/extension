'use strict';

var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();

function display(element){
  document.getElementById(element).style.display = "block";
}

function remove(element){
  document.getElementById(element).style.display = "none";
};

function startPopUp(){
  if(!bgpage.alarmDate){
    display('custom_time');
  }
  else{
    displayTime();
  }
};

function pomodoro() {
  Timer(25);
  displayTime();
};

function custom(){
    let time = document.getElementById('custom_time').value;
    Timer(time);
};

function triggerTimer() {
  let e = document.getElementById("automatic");
  let checked = e.options[e.selectedIndex].value;
  switch (checked){
    case "pomodoro":
    pomodoro();
    break;

    case "custom":
    display('custom_time');
    display('timer_button');
    display('question');
    break;
  };
};

function Timer(num){
  bgpage.setAlarm(num * 60000);
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

function createAlarm() {
  chrome.alarms.create(alarmName, {
  delayInMinutes: 0.1, periodInMinutes: 0.1});
};

function cancelAlarm() {
  bgpage.cancelAlarm();
  clearTimeout(refreshDisplayTimeout);
  document.getElementById('timer').textContent = "";
  display('custom_time');
  display('timer_button');
  display('question');
  remove('cancel_button');
};

document.getElementById('timer_button').addEventListener('click', custom);
document.getElementById('cancel_button').addEventListener('click', cancelAlarm);
startPopUp();
triggerTimer();

