'use strict';

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

function isBizCaz(day, month, cb) {

    let key = getFormatDate(day, month);
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
    currentDay2.setMinutes(currentDay1.getMinutes() + 180);

    return getFormatDate(currentMonth, currentDay2.getDate());
}

function getFormatDate(month, day) {
    return `${month}/${day}`;
}

module.exports = {
    isBizCaz: isBizCaz,
    getCurrentDate: getCurrentDate,
    getFormatDate: getFormatDate
};