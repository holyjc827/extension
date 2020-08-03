// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var alarmRingTimeout;
var updateBadgeTextInterval;
var alarmDate;
var setDate;

function showNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '../stay_hydrated.png',
        title: 'Time\'s up!',
        message: 'Now you need to take a break'
     });
    clearTimeout(alarmRingTimeout);
    alarmDate = null;
};

function setAlarm(miliseconds) {
    clearTimeout(alarmRingTimeout);
    clearInterval(updateBadgeTextInterval);
    var tSecs = parseInt(miliseconds / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;
    var millis = miliseconds % 1000;

    alarmDate = new Date();
    // alarmDate.setTime(alarmDate.getTime() + millis);
    alarmDate.setHours(alarmDate.getHours() + tHrs);
    alarmDate.setMinutes(alarmDate.getMinutes() + mins);
    alarmDate.setSeconds(alarmDate.getSeconds() + secs);
    alarmDate.setMilliseconds(alarmDate.getMilliseconds() + millis);

    setDate = new Date();
    alarmRingTimeout = setTimeout(showNotification, alarmDate.getTime() - setDate.getTime());

    
    // chrome.browserAction.setBadgeBackgroundColor({color:green});
    // updateBadgeTextInterval = setInterval(function() {
    //     chrome.browserAction.setBadgeText({text: getTimeLeftBadgeString()});
    // }, guiLagAdjustment);
};

function getTime(){
  let now = new Date();
  return(alarmDate.getTime() - now.getTime())
};

function cancelAlarm(){
    alarmDate = null;
    clearTimeout(alarmRingTimeout);
}

function getTimeLeftString()
{
    var until = getTime();
    var tSecs = parseInt(until / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;
    if(secs < 10) secs = "0" + secs;
    if(mins < 10) mins = "0" + mins;
    if(tHrs < 10) tHrs = "0" + tHrs;
    return ((tHrs > 0 ? tHrs + ":" : "") + mins + ":" + secs);
};