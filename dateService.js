'use strict';

var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

function isBizCaz(day, month, cb) {

    var key = getFormatDate(day, month);
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

function getFormatDate(month, day) {
    return `${month}/${day}`;
}

module.exports = {
    isBizCaz: isBizCaz,
};