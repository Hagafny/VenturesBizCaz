'use strict';
const path = require('path');
const dateService = require('./dateService.js');

function getData(month, day, year, bizcazDBData) {
    let BizCazData = {
        currentDate: dateService.getFormatDate(month, day, year),
        nextDay: dateService.getNextDay(month, day, year),
        previousDay: dateService.getPreviousDay(month, day, year),
        notes: bizcazDBData.notes
    };

    if (bizcazDBData.isBizCaz === null) {
        BizCazData.message = "N/A";
        BizCazData.image = "../../../img/unknown.jpg";
    }
    else if (bizcazDBData.isBizCaz) {
        BizCazData.message = "YES";
        BizCazData.image = "../../../img/suitup.jpg";
    }
    else {
        BizCazData.message = "NO";
        BizCazData.image = "../../../img/pajamas.jpg";
    }

    return BizCazData;
}



module.exports = {
    getData: getData
};