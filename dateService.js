'use strict';

const redis = require('redis');
const calendar = require('node-calendar');
const client = redis.createClient(process.env.REDIS_URL);

function getBizCazData(month, day, year, cb) {
    let hash = `${month}/${year}`;

    client.hget(hash, day, (err, reply) => {
        let isBizCaz, notes;


        if (reply == null) {
            isBizCaz = null;
            notes = null;
        }
        else {
            let bizCazStatus = reply.substr(0, 1);
            notes = reply.substr(1);
            if (bizCazStatus === "1")
                isBizCaz = true;
            else if (bizCazStatus === "0")
                isBizCaz = false;
        }

        cb({
            isBizCaz: isBizCaz,
            notes: notes
        });
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
                var value = keysValues && keysValues[day] != undefined ? keysValues[day] : '-1';
                monthData.push(value);
            }
        }
        cb(monthData);
    });
}

function destructDatetoComponents(date) {
    let year = date.slice(-2);
    let firstIndexOfSlesh = date.indexOf('/');
    let month = date.substr(0, firstIndexOfSlesh);

    let tempString = date.substr(firstIndexOfSlesh + 1);
    let secondIndexOfSlesh = tempString.indexOf('/');
    let day = tempString.substr(0, secondIndexOfSlesh);

    return {
        day: day,
        month: month,
        year: year
    }
}

function upateBizCazValue(date, value, notes, cb) {
    let deconstructedDate = destructDatetoComponents(date);
    let hash = `${deconstructedDate.month}/${deconstructedDate.year}`;

    if (value == -1) {
        deleteDate(hash, deconstructedDate.day, (err, status) => {
            if (err) console.log(err);
            cb(status);
        });
    }

    else if (value == 0 || value == 1) {

        if (notes != "")
            value += notes;

        updateDate(hash, deconstructedDate.day, value, (err, status) => {
            if (err) console.log(err);
            cb(status);
        });
    }
}

function deleteDate(hash, day, cb) {
    client.hdel(hash, day, (err, status) => {
        cb(err, status);
    });
}

function updateDate(hash, day, valueToUpdate, cb) {
    client.hset(hash, day, valueToUpdate, (err, status) => {
        cb(err, status);
    });
}

module.exports = {
    getBizCazData: getBizCazData,
    getCurrentDate: getCurrentDate,
    getCurrentAdminDate: getCurrentAdminDate,
    getFormatDate: getFormatDate,
    getNextDay: getNextDay,
    getPreviousDay: getPreviousDay,
    getMonthData: getMonthData,
    upateBizCazValue: upateBizCazValue
};