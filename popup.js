'use strict';

var refreshDisplayTimeout;
var alarmName = "surprise!"
var bgpage = chrome.extension.getBackgroundPage();

function display(element){
  document.getElementById(element).style.display = "block";
}

function remove(element){
  document.getElementById(element).style.display = "none";
}

function startPopUp(){
  if(!bgpage.alarmDate)
    {
      display('custom_time');
    }
  else{
    displayTime();
  }
};

function Timer(num){
    bgpage.setAlarm(num * 60000);
    remove('custom_time');
    displayTime();
};

function displayTime(){
  document.getElementById('timer').textContent = bgpage.getTimeLeftString();
  refreshDisplayTimeout = setTimeout(displayTime, 100);
};

function checkAlarm(callback){
    chrome.alarms.getAll(function(alarms){
        var hasAlarm = alarms.some(function(a){
            return a.name = alarmName;
        });

        var newLabel;
        if (hasAlarm) {
         newLabel = 'Cancel alarm';
        } else {
         newLabel = 'Activate alarm';
       }
       document.getElementById('timer_button').innerText = newLabel;
       if (callback) callback(hasAlarm);
     });
};

function createAlarm() {
 chrome.alarms.create(alarmName, {
   delayInMinutes: 0.1, periodInMinutes: 0.1});
};

function cancelAlarm() {
 chrome.alarms.clear(alarmName);
};

function doToggleAlarm() {
    let time = document.getElementById('custom_time').value;
    Timer(time);
    checkAlarm(function(hasAlarm) {
       if (hasAlarm) {
         cancelAlarm();
       } else {
         createAlarm();
       }
       checkAlarm();
     });
};

document.getElementById('timer_button').addEventListener('click', doToggleAlarm);
startPopUp();
checkAlarm();

