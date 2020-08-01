'use strict';

var alarmName = "surprise!"
var bgpage = chrome.extension.getBackgroundPage();

function Timer(num){
    bgpage.setAlarm(num * 60000);
    document.body.style.minWidth = '420px'
    document.getElementById('custom_time').style.display = "none";
    // refreshDisplay();
}
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
    // alert("Break time!")
    // chrome.notifications.create(alarmName, {
    //     type: 'basic',
    //     iconUrl: '../stay_hydrated.png',
    //     title: 'Time\'s up!',
    //     message: 'Now you need to take a break'
    //  });
};



document.getElementById('timer_button').addEventListener('click', doToggleAlarm);
checkAlarm();
