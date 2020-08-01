// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var alarmRingTimeout;
var updateBadgeTextInterval;
var alarmDate;
var setDate;

chrome.notifications.onButtonClicked.addListener(showNotification);

function showNotification() {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '../stay_hydrated.png',
        title: 'Time\'s up!',
        message: 'Now you need to take a break'
     });
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

    console.log(alarmDate.getTime() - setDate.getTime());
    // chrome.browserAction.setBadgeBackgroundColor({color:green});
    // updateBadgeTextInterval = setInterval(function() {
    //     chrome.browserAction.setBadgeText({text: getTimeLeftBadgeString()});
    // }, guiLagAdjustment);
}

// var dbName = "Timer-up"

// chrome.notifications.onClicked.addListener(function() {
//   launch();
// });