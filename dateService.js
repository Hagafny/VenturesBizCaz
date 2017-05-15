'use strict';

const redis = require('redis');
const client = redis.createClient("redis://h:pcja62bcf30eal6edisiktfvkno@ec2-174-129-199-193.compute-1.amazonaws.com:6869");
const calendar = require('node-calendar');
//const client = redis.createClient(process.env.REDIS_URL);

function isBizCaz(day, month, year, cb) {

    let key = getFormatDate(day, month, year);
    client.get(key, (err, reply) => {
        let isBizCaz;
        if (reply === "1")
            isBizCaz = true;
        else if (reply === "0")
            isBizCaz = false;
        else
            isBizCaz = null;

        cb(isBizCaz);
    })
}

function getCurrentDate() {
    let currentMonth = new Date().getUTCMonth() + 1;
    let currentDay1 = new Date();
    let currentDay2 = new Date(currentDay1);
    let year = getYear();
    currentDay2.setMinutes(currentDay1.getMinutes() + 180);
    return getFormatDate(currentMonth, currentDay2.getDate(), year);
}

function getCurrentAdminDate() {
    let currentMonth = new Date().getUTCMonth() + 1;
    let year = getYear();
    return `${currentMonth}/${year}`;
}

function getYear() {
    return new Date().getFullYear().toString().substr(2, 4);
}

function getFormatDate(month, day, year) {
    return `${month}/${day}/${year}`;
}


function getNextDay(month, day, year) {
    var endingDay = calendar.monthrange(year, month)[1];

    if (day == endingDay) {
        day = 1;

        if (month == 12) {
            month = 1;
            year++;
        }
        else
            month++;

    }
    else
        day++;

    return getFormatDate(month, day, year);

}

function getPreviousDay(month, day, year) {
    if (day == 1) {
        if (month == 1) {
            month = 12;
            year = year - 1;
        }
        else
            month--;

        day = calendar.monthrange(year, month)[1];
    }
    else
        day--;

    return getFormatDate(month, day, year);

}

function getMonthData(month, year, cb) {
    client.hgetall(`${month}/${year}`, (err, keysValues) => {
        if (err) return console.log(err);

        var allDaysOfTheMonth = new calendar.Calendar(3).itermonthdays(year, month);
        var endingDay = calendar.monthrange(year, month)[1];
        var monthData = [];
        for (var day in allDaysOfTheMonth) {
            if (day != 0 && day <= endingDay) {
                //var key = getFormatDate(month, day, year);
                var value = keysValues[day] != undefined ? keysValues[day] : '-1';
                monthData.push(value);
            }
        }
        cb(monthData);
    });
}


module.exports = {
    isBizCaz: isBizCaz,
    getCurrentDate: getCurrentDate,
    getCurrentAdminDate: getCurrentAdminDate,
    getFormatDate: getFormatDate,
    getNextDay: getNextDay,
    getPreviousDay: getPreviousDay,
    getMonthData: getMonthData
};