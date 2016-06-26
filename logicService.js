'use strict';
const path = require('path');
const dateService = require('./dateService.js');
console.log(__dirname);
function getData(month, day, isBizCaz) {
    let BizCazData = {
        currentDate: dateService.getFormatDate(month, day),
        nextDay: dateService.getNextDay(month, day),
        previousDay: dateService.getPreviousDay(month, day)
    };
    if (isBizCaz === null) {
        BizCazData.message = "N/A";   
        BizCazData.image = "../img/unknown.jpg";
    }
    else if (isBizCaz) {
        BizCazData.message = "YES";
        BizCazData.image = "../img/suitup.jpg";
    }
    else {
        BizCazData.message = "NO";
        BizCazData.image = "../img/pajamas.jpg";
    }
    console.log(BizCazData);
    return BizCazData;
}

module.exports = {
    getData: getData
};